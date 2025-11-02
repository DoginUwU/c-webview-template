declare global {
    interface Window {
        ping: (arg: string) => Promise<{ message: string }>;
    }
}

export {};
