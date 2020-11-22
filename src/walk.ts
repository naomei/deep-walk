import { isEmpty } from "./utils";
import {emitter, isArray, isObject} from "./utils";

type Input = Record<string, any> | any[];

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
    const shouldFinish = isEmpty(value) || isLeaf;

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
