import { isArray , isObject, isEmpty } from "./utils";

it("isObject", () => {
  expect(isObject({})).toBeTruthy();
  expect(isObject("")).toBeFalsy();
});

it("isArray", () => {
  expect(isArray({})).toBeFalsy();
  expect(isArray([])).toBeTruthy();
});

it("isEmpty", () => {
  expect(isEmpty({})).toBeTruthy();
  expect(isEmpty([])).toBeTruthy();
  expect(isEmpty({a: ""})).toBeFalsy();
  expect(isEmpty(["a"])).toBeFalsy();
});