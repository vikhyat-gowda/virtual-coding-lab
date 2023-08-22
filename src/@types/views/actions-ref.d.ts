export interface ActionRef {
    getInputText: () => string;
    checkInfo: (token: string) => void;
}
