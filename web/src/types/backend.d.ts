declare global {
    interface Window {
        ping: (arg: string) => Promise<string>;
    }
}

export {};
