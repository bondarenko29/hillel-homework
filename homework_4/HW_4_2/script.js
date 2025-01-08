function myFunction(){
    let myNumber = prompt('Введіть тризначне число: ');
    document.getElementById("number").innerText = myNumber;
    if (isNaN(myNumber) || myNumber.length != 3) { 
        myNumber = confirm("Введене число некоректне. Натисніть кнопку ");
        myNumber = document.getElementById("number").innerText = "";
        myNumber = document.getElementById("demo").innerText = ""; 
        return;
        
     }
    else {
        
        let myArray = [...myNumber.toString()].map(Number);
        const unique = [...new Set(myArray)];
        const diff = myArray.length - unique.length;

        if (diff != 0 && diff < myArray.length - 1) {
            myNumber = `Число ${myNumber} має ${diff + 1} однакові цифри`;
        }
        else if (diff === myArray.length - 1) {
            myNumber = `Число ${myNumber} має всі ${diff + 1} однакові цифри`;
        }
        else {
            myNumber = `Всі цифри  в числі ${myNumber} є різні!`;
        }
       
       document.getElementById("demo").innerText = myNumber;        
    } 
    
    
}  