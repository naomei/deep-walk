export declare const isArray: (input: any) => input is any[];
export declare const isObject: (input: any) => input is Record<string, any>;
export declare const isEmpty: (input: any) => boolean;
export declare const emitter: <P = any>() => {
    on: (fn: (params: P) => void) => void;
    off: () => void;
    emit: (params: P) => void;
};
