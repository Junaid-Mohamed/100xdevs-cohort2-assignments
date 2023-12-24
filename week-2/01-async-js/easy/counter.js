let counter = 0;

function incrementCounter() {
  counter++;
  console.log(counter);
}

// console.log("Using setInterval");
// setInterval(incrementCounter, 1000);
// console.log(counter);
// console.log("using setTimeout");
// setTimeout(incrementCounter, 1000);

function incrementCounterUsingSetTimeout(initalCounter, interval, limit) {
  function incrementCounter() {
    console.log(initalCounter);
    if (initalCounter < limit) {
      initalCounter++;
      setTimeout(incrementCounter, interval);
    }
  }

  incrementCounter();
}

incrementCounterUsingSetTimeout(1, 1000, 6);
