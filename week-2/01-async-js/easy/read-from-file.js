const fs = require("fs");

fs.readFile("test.txt", "utf-8", (err, data) => {
  if (err) console.error(err);
  else console.log(data);
});

let sum = 0;
for (let i = 0; i < 100000000; i++) {
  sum += i;
}
console.log("Sum ", sum);
