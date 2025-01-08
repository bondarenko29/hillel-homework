function myFunction(){
    let myDigit = prompt('Введіть розряд числа: ');
    let myNumber = prompt(`Введіть ${myDigit} - розрядне число: `);
    document.getElementById("number").innerText = myNumber;
    if (isNaN(myNumber) || myNumber.length != myDigit) { 
        myNumber = confirm("Введене число некоректне. Натисніть кнопку ");
        myNumber = document.getElementById("number").innerText = "";
        myNumber = document.getElementById("demo").innerText = ""; 
        return;
     }
    else {
        let myArray = [...myNumber.toString()].map(Number);
        let result = 0;
        let countNumbers = {};
        for (const item of myArray) {   
            countNumbers[item] = countNumbers[item] ? countNumbers[item] + 1 : 1 ;
        }
        for (let prop in countNumbers) {
            if (countNumbers[prop] > 1){
                result += countNumbers[prop];
            }
        }
       
        if (result > 0 && result < myArray.length) {
            myNumber = `Число ${myNumber} має ${result} однакові цифри`;
        }
        else if (result === myArray.length) {
           myNumber = `Число ${myNumber} має всі ${result} однакові цифри`;
        }
        else {
            myNumber = `Всі цифри  в числі ${myNumber} є різні!`;
        }        
       document.getElementById("demo").innerText = myNumber;        
    }       
} 