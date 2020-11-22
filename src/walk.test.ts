import { walk, isObject } from "./walk";

it("isObject", () => {
  expect(isObject({})).toBeTruthy();
  expect(isObject("")).toBeFalsy();
});

it("each", () => {
  walk({ a: { b: "" }, c: ["A", "B"] }).each((ctx) => {
    // console.log(ctx);
  });
});

it("reduce", () => {
  const res = walk({ a: { b: "" }, c: ["A", "B"] }).reduce<string[]>(
    (ctx, acc) => {
      // console.log(ctx);
      console.log(acc);
      acc.push("a");
    },
    []
  );

  console.log(res);
});
