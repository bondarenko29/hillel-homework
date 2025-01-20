const array = [22, 34, 6, 11, 9, 76, 8];
  document.getElementById("array").innerText = `Дано масив:  
[${array}]`
function removeElement(array, item) {
    const index = array.indexOf(item);
    if (index >= 0) {
      array.splice(index, 1);
    }
    return array;
  }
removeElement(array,76);
console.log(array);
document.getElementById("remove").innerText = `Масив після видалення:
[${array}]`; 