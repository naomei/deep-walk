export const isArray = (input: any): input is any[] => Array.isArray(input);

export const isObject = (input: any): input is Record<string, any> =>
  (typeof input === "object" || typeof input === "function") && input !== null;

export const isEmpty = (input: any) => {
  if(isArray(input)) {
    return !input.length;
  }else {
    return !Object.keys(input).length;
  }
};

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
