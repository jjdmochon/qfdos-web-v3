import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSesion, iniciarSesionServidor, renovarSiHaceFalta, borrarSesion } from '../services/sesion';

export type UserRole = 'profesor' | 'estudiante';

export interface UserProfile {
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  /** false cuando se entra con una cuenta personal de Google en vez de la de la UGR */
  institucional?: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isProfesor: boolean;
  isEstudiante: boolean;
  /** true sólo si la cuenta pertenece a un dominio de la Universidad de Granada */
  isInstitucional: boolean;
  loginWithGoogle: (credentialResponse: { credential?: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

/**
 * Cuentas institucionales de la UGR. Quien entra con una de ellas queda
 * identificado por su correo oficial.
 */
const UGR_DOMAINS = ['@correo.ugr.es', '@ugr.es', '@go.ugr.es'];

/**
 * Cuentas personales de Google admitidas. Se aceptan porque no todo el
 * alumnado tiene operativa la cuenta institucional al empezar el curso, pero
 * quedan marcadas como externas: el profesor ve de un vistazo quién entregó
 * con una dirección no verificable por la universidad.
 */
const PERSONAL_DOMAINS = ['@gmail.com', '@googlemail.com'];

const STORAGE_KEY = 'qfdos_v3_user';

export function esCuentaInstitucional(email: string): boolean {
  return UGR_DOMAINS.some(d => email.toLowerCase().endsWith(d));
}

function decodeJwt(token: string): Record<string, string> | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    // Sin sesión del servidor vigente, el perfil guardado no vale: es texto
    // en localStorage que cualquiera puede editar. Se vuelve a pedir login.
    const sesion = getSesion();
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!sesion || !saved) return null;
    try {
      const perfil = JSON.parse(saved) as UserProfile;
      // Correo y rol, siempre los de la sesión firmada
      return { ...perfil, email: sesion.email, role: sesion.rol, institucional: sesion.institucional };
    } catch {
      return null;
    }
  });

  useEffect(() => {
    renovarSiHaceFalta().then(() => {
      if (!getSesion()) setUser(null);
    });
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const loginWithGoogle = async (
    credentialResponse: { credential?: string }
  ): Promise<{ success: boolean; error?: string }> => {
    if (!credentialResponse.credential) {
      return { success: false, error: 'No se recibió credencial de Google.' };
    }

    // Sólo para el nombre y la foto; la identidad la verifica el servidor
    const payload = decodeJwt(credentialResponse.credential);
    if (!payload) {
      return { success: false, error: 'No se pudo leer la credencial de Google.' };
    }

    const correoToken = (payload.email || '').toLowerCase();
    if (!esCuentaInstitucional(correoToken) && !PERSONAL_DOMAINS.some(d => correoToken.endsWith(d))) {
      return {
        success: false,
        error:
          `Esta cuenta no está admitida. Entra con tu correo @correo.ugr.es o @go.ugr.es, ` +
          `o con una cuenta de @gmail.com. Cuenta recibida: ${correoToken}`
      };
    }

    const r = await iniciarSesionServidor(credentialResponse.credential);
    if (!r.ok) return { success: false, error: r.error };

    // Correo, rol y carácter institucional, tal y como los acredita el servidor
    setUser({
      name: payload.name || '',
      email: r.sesion.email,
      role: r.sesion.rol,
      avatarUrl: payload.picture || '',
      institucional: r.sesion.institucional
    });
    return { success: true };
  };

  const logout = () => {
    borrarSesion();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isProfesor: user?.role === 'profesor',
      isEstudiante: user?.role === 'estudiante',
      isInstitucional: !!user && user.institucional !== false,
      loginWithGoogle,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
