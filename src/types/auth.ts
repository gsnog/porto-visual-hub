export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
}

export interface AuthTokens {
    access: string;
    refresh: string;
}

export interface LoginResponse extends AuthTokens {
    // Se backend customizar a resposta do TokenObtainPairView para retornar dados do usuário
    user?: User;
}
