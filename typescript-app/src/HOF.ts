// create a function which takes another function as input and runs it after 1 second
const delayedFunction = (fn: () => void) => {
  setTimeout(fn, 1000);
};

delayedFunction(function () {
  console.log("Hi there!");
});
