import { walk } from "./walk";

it("each", () => {
  walk({ a: { b: "" }, c: ["A", "B"] }).each((ctx) => {
    console.log(ctx);
  });
});

it("reduce", () => {
  const res = walk({ a: { b: "" }, c: ["A", "B"] }).reduce<string[]>(
    (ctx, acc) => {
      // console.log(ctx);
      // console.log(acc);
      acc.push("a");
    },
    []
  );

  // console.log(res);
});
