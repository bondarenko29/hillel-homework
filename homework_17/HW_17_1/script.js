class Calculator {
    add(a, b) {
        return a + b;
    }
    subtract(a, b) {
        return a - b;
    }
    multiply(a, b) {
        return a * b;
    }
    divide(a, b) {
        return (b !== 0) ?  a / b : 'Помилка: діленняна нуль!';
    }
    mod(a, b) {
        return a % b;
    }
    factorial(a) {
        if (a === 0 || a === 1) {
            return 1;
        } else {
            return a * this.factorial(a - 1);
        }
    }
    abc(a) {
        return a >= 0 ? a : -a;
    }
    sqrt(a) {
        return Math.sqrt(a);
    }

     power(a, b) {
        if (b === 0) return 1;
        if (b < 0) return 1 / power(a, -b);
      
        let result = 1;
        for (let i = 0; i < b; i++) {
          result *= a;
        }
        return result;
      }    
}

const calc = new Calculator();

console.log(calc.add(-28, -56)); // -84

console.log(calc.subtract(57, 99)); // -42

console.log(calc.multiply(39, 3)); // 117

console.log(calc.divide(-68, 4)); // -17

console.log(calc.mod(11, 5)); // 1

console.log(calc.factorial(5)); // 120

console.log(calc.factorial(0)); // 1

console.log(calc.abc(67)); // 67
console.log(calc.abc(-7)); // 7
console.log(calc.abc(0)); // 0

console.log(calc.sqrt(16)); // 4

console.log(calc.power(5, 4)); // 625
console.log(calc.power(3, 4)); // 81



