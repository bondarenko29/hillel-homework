// Перший спосіб
const arrFirstNumbers = [2, 3, 5, 14, 21, 32, 56, 87, 98, 189678, 234.87, 0, -5678];
let evenNumbers = [];
for (const item of arrFirstNumbers) {
    if(item % 2 === 0){
        evenNumbers.push(item);
    }
}
console.log(evenNumbers);
document.getElementById('array1').textContent = `Новий масив: [${evenNumbers}]`;

// Другий спосіб
const arrSecondNumbers = [1, 2, 3, 4, 88, 35, 56, 88, 102, 104];
const newEvenNumbers = arrSecondNumbers.filter(number => number % 2 === 0);
console.log(newEvenNumbers);

document.getElementById('array2').textContent = `Новий масив: [${newEvenNumbers}]`;