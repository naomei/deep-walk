traverse objects by every node on a recursive.

# Apis

## each

execute fn for each node in the object.

```ts
import { walk } from "deep-walk";

walk({ a: { b: "" }, c: ["A", "B"] }).each((ctx) => {...});
```

## reduce

each node in the object, perform a left-fold with the return value of function.

```ts
import { walk } from "deep-walk";

const result = walk({ a: { b: "" }, c: ["A", "B"] }).reduce<string[]>(
  (ctx, acc) => {
    if(ctx.isLeaf){
      acc.push(ctx.value);
    }
  },
  []
);

console.log(result); // ["", "A", "B"]
```

## ctx(context)

The value that comes in the callback argument.

```ts
{
  isRoot?: boolean;
  isNotRoot?: boolean;
  isLeaf?: boolean;
  isNotLeaf?: boolean;
  value: any; // current value
};
```

