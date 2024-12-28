// Generics enable you to create components that work with any data type while still providing compile-time type safety.
function getFirstElement<T>(arr: T[]) {
  return arr[0];
}

// const firstEl = getFirstElement([1, 2, "3"]);
const firstEl = getFirstElement(["Sanchit", "Saksham"]).toLowerCase();
console.log({ firstEl });
