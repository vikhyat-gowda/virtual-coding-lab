export type UseSignInStates = [
    signIn: (credentials: SignInWithPasswordCredentials) => Promise<void>,
    loading: boolean,
    error: any
];
