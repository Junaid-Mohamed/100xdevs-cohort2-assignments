const fs = require("fs");

let data = "This is a test data to write it in test1.js file.";

fs.writeFile("test1.js", data, "utf-8", (err) => {
  if (err) throw err;
  console.log("successfully wrote to test1.js");
});

let sum = 0;
for (let i = 0; i < 10; i++) {
  sum += i;
  setTimeout(() => {
    console.log(sum);
  }, 1000);
}
