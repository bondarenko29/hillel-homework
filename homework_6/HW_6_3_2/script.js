const array = [];
let item;
document.getElementById("array").innerText = `Дано масив: 
[${array}]`
const getArray = function() {
    let input;
    do {
      input = prompt('Введіть елемент масиву. Для завершення "Скасувати" :');
      if (input !== null) {
        array.push(input);
      }
    } while (input !== null);
    item = prompt('Введіть елемент масиву для видалення:');
    return array;
  }
getArray();
document.getElementById("array").innerText = `Дано масив: 
[${array}]

Ваш елемент для видалення: 
[${item}]`;
console.log(array);
function removeElement(array, item) {
    const index = array.indexOf(item);
    console.log(array.indexOf(item))
    if (index >= 0) {
      array.splice(index, 1);
    }
    return array;
  }
removeElement(array,item);
console.log(array);
document.getElementById("remove").innerText = `Масив після видалення:
[${array}]`; 
