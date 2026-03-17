let prompt = require("prompt-sync")();

let n = +prompt("Enter a Number : ");
function reverse(n) {
  var num = 0;
  while (n > 0) {
    var rem = n % 10;
    num = num * 10 + rem;
    n = Math.floor(n / 10);
  }

  return num;
}

console.log(reverse(n));
