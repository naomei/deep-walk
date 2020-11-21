export const emitter = <P = any>() => {
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
