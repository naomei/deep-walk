import { walk, WalkCtx } from "./";

it("each", () => {
  const mockCallback = jest.fn((ctx: WalkCtx) => ctx);

  walk({ a: { b: "" }, c: ["A", "B"] }).each(mockCallback);

  expect(mockCallback.mock.results[0].value.value).toEqual({"a": {"b": ""}, "c": ["A", "B"]});
  expect(mockCallback.mock.results[0].value.isRoot).toBeTruthy();
  expect(mockCallback.mock.results[0].value.isNotRoot).toBeFalsy();

  expect(mockCallback.mock.results[1].value.value).toEqual({ b: "" });
  expect(mockCallback.mock.results[1].value.isNotLeaf).toBeTruthy();

  expect(mockCallback.mock.results[2].value.value).toEqual("");
  expect(mockCallback.mock.results[2].value.isLeaf).toBeTruthy();

  expect(mockCallback.mock.results[3].value.value).toEqual(["A", "B"]);
  expect(mockCallback.mock.results[3].value.isNotLeaf).toBeTruthy();

  expect(mockCallback.mock.results[4].value.value).toEqual("A");
  expect(mockCallback.mock.results[4].value.isLeaf).toBeTruthy();

  expect(mockCallback.mock.results[5].value.value).toEqual("B");
  expect(mockCallback.mock.results[5].value.isLeaf).toBeTruthy();
});

it("reduce", () => {
  const res1 = walk({ a: { b: "" }, c: ["A", "B"] }).reduce<string[]>(
    (ctx, acc) => {
      if(ctx.isLeaf){
        acc.push(ctx.value);
      }
    },
    []
  );
  const res2 = walk({ a: { b: "", c: 1 }, c: 0 }).reduce<number[]>(
    (ctx, acc) => {
      if(ctx.isLeaf && typeof ctx.value === "number"){
        acc.push(ctx.value);
      }
    },
    []
  );

  expect(res1).toEqual(["", "A", "B"]);
  expect(res2).toEqual([1, 0]);
});
