const fs = require("fs");

const data = fs.readFileSync("test.txt", "utf-8");

console.log(cleanup(data));

function cleanup(str) {
  return str.replace(/\s+/g, " ").trim();
}
