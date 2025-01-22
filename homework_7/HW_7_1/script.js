function elementSum(){
    let sum = 0;
    return function element(number){
        sum += number;
        return sum;
    }
}
const sum = elementSum();

console.log(sum(7)); // 7
console.log(sum(8)); // 15
console.log(sum(12)); // 27
console.log(sum(4)); // 31