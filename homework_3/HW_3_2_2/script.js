// Отримуємо рядки
const string1 = prompt("Введіть перший рядок:");
const string2 = prompt("Введіть другий рядок:");
const string3 = prompt("Введіть третій рядок:");

// Створення масиву з рядків
const strings = [string1, string2, string3];
document.getElementById("demo").innerHTML = `${strings.join(' ')}`;

function myFunction() {
  strings.sort(function(a, b){return 0.5 - Math.random()});
  document.getElementById("demo").innerHTML = `${strings.join(' ')}`;
}