
 function myFunction(){
    let num = prompt("Введіть п'ятизначне число: "); 
    if (isNaN(num) || num.length !== 5) { 
         num = confirm("Введене число некоректне. Натисніть кнопку ");
         return;
     }
    else {
        num = num.split('').join(' '); 
        document.getElementById("demo").innerHTML = num;        
    }                           
}  