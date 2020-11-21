// [TODO] remove this deps
import * as R from "rambda";

type Input = Record<string, any> | any[];

export const isArray = (input: any): input is any[] => Array.isArray(input);

export const isObject = (input: any): input is Record<string, any> =>
  (typeof input === "object" || typeof input === "function") && input !== null;

const emitter = <P = any>() => {
  let list: ((params: P) => void)[] = [];

  return {
    on: (fn: (params: P) => void) => {
      list.push(fn);
    },
    off: () => {
      list = [];
    },
    emit: (params: P) => {
      list.forEach((d) => d(params));
    },
  };
};

export type WalkCtx = {
  isRoot?: boolean;
  isNotRoot?: boolean;
  isLeaf?: boolean;
  isNotLeaf?: boolean;
  value: any;
};

export const walk = (input: Input) => {
  let isRoot = true;
  const evEmitter = emitter<WalkCtx>();

  const traverse = (value: any): void => {
    const isLeaf = !isArray(value) && !isObject(value);
    
    // [TODO] remove Rambda deps
    const shouldFinish = R.isEmpty(value) || isLeaf;

    evEmitter.emit({
      isRoot,
      isNotRoot: !isRoot,
      isLeaf,
      isNotLeaf: !isLeaf,
      value,
    });

    if (shouldFinish) {
      return;
    }

    isRoot = false;

    if (isArray(value)) {
      value.map((d) => traverse(d));
      return;
    }

    Object.keys(value).forEach((v) => {
      traverse(value[v]);
    });
  };

  return {
    each: (fn: (ctx: WalkCtx) => void) => {
      evEmitter.on(fn);
      traverse(input);
      evEmitter.off();
    },
    reduce: <T>(fn: (ctx: WalkCtx, accum: T) => void, inital: T) => {
      /* eslint prefer-const: 0 */
      let current = inital;

      evEmitter.on((ctx) => {
        fn(ctx, current);
      });
      traverse(input);
      evEmitter.off();

      return current;
    },
  };
};