declare type Input = Record<string, any> | any[];
export declare type WalkCtx = {
    isRoot?: boolean;
    isNotRoot?: boolean;
    isLeaf?: boolean;
    isNotLeaf?: boolean;
    value: any;
};
export declare const walk: (input: Input) => {
    each: (fn: (ctx: WalkCtx) => void) => void;
    reduce: <T>(fn: (ctx: WalkCtx, accum: T) => void, inital: T) => T;
};
export {};
