function multiply(x) {
    return function (y) {
        return x * y;
    }
}
multiply(7)(3);
document.getElementById("multiply").innerText = `Добуток чисел: 
7 * 3 = ${multiply(7)(3)}`; 

