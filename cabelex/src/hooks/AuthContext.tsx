import { createContext, useContext } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import api from '../services/api';
import { singInService } from '../services/login-service';


interface SingInCredentialsInterface {
    email: string,
    password: string;
}

interface AuthContextDataInterface {
    user: UserInterface;
    singIn(credentials: SingInCredentialsInterface): Promise<void>;
    singOut(): void;
}

interface UserInterface {
    id: string;
    name: string;
}

interface AuthStateInterface {
    token: string;
    user: UserInterface;
}

const AuthContext = createContext<AuthContextDataInterface>({} as AuthContextDataInterface);


export const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthStateInterface>(() => {
        const data = sessionStorage.getItem('data');

        if (data) {
            const { token, user } = JSON.parse(data);

            if (token && user) {
                api.defaults.headers.common['authorization'] = `Bearer ${token}`;
                return { token, user };
            }
        }
        return {} as AuthStateInterface;
    });

    const singIn = useCallback(async ({ email, password }) => {
        const { token, user } = await singInService(email, password);
        sessionStorage.setItem('data', JSON.stringify({ token: token, user: user }));

        api.defaults.headers.common['authorization'] = `Bearer ${token}`;
        setData({ token, user });
    }, []);

    const singOut = useCallback(() => {
        sessionStorage.removeItem('data');
        setData({} as AuthStateInterface);
    }, []);
    
    return (
        <AuthContext.Provider value={{ user: data.user, singIn, singOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextDataInterface {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }

    return context;
}
