const myArray = [1, null, 2, 3, 4, undefined, 5, {name: 'Ivan Ivanov', age: '23'}, "frog", 8, 10, 3.5, -7.8];
const numbers = myArray.filter(item => typeof item === "number");
const getAverages = (array) => array.reduce((sum, current) => 
    sum + current, 0) / numbers.length;
console.log(`Середнє значення масива [${numbers}] = ${(getAverages(numbers)).toFixed(2)}`);
document.getElementById("average").innerText = `Середнє значення масива 
[${myArray}]
Масив чисел
[${numbers}] = ${(getAverages(numbers)).toFixed(2)}`; 


//Другий спосіб
// let average;
// function getAverage(array) {
//     let sum = 0;
//     for (let i = 0; i < array.length; i++) {
//       sum += array[i];
//     }  
//     return average = (sum / array.length).toFixed(2);
//   }
// getAverage(numbers);
// console.log(`Середнє значення масива [${numbers}] = ${average}`);
// document.getElementById("average").innerText = `Середнє значення масива 
// [${numbers}] = ${average}`; 
  