function validISBN(n) {
  var digit = Math.abs(n).toString().length;
  var num = 0;
  while (digit > 0) {
    var rem = n % 10;
    num += rem * digit--;
    n = Math.floor(n / 10);
  }

  // if(num % 11 == 0) return true;
  // return false;
  console.log(num);

  return num % 11 === 0;
}

console.log(validISBN("1593275842"));
