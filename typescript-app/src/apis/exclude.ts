// In a function that accepts several types of input but you want to exclude specific types from being passed into it
type MouseEvents = "click" | "mousemove" | "scroll";

type ExcludeEvents = Exclude<MouseEvents, "scroll">; //  "click" | "mousemove"

const handleEvent = (event: ExcludeEvents) => {
  console.log(`Handling event: ${event}`);
};

handleEvent("click");
// handleEvent("scroll")
handleEvent("mousemove");
