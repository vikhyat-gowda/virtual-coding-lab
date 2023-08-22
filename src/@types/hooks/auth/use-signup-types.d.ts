export type UseSignUpStates = [
    signUp: (credentials: UserSignUpCreds) => void,
    loading: boolean,
    error: any
];

export type UserSignUpCreds = {
    email: string;
    password: string;
    role: Roles;
    name: string;
};
