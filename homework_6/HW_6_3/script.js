const array = [22, 34, 6, 11, 9, 76, 8];
  
function removeElement(array, item) {
    const index = array.indexOf(item);
    if (index >= 0) {
      array.splice(index, 1);
    }
    return array;
  }
removeElement(array,76);
console.log(array);
