function myFunction() {
    const primeNumber = prompt('Введіть ціле число: ');
    let divider = 2;
    let result;
    if (primeNumber === null || primeNumber.trim() === '' || isNaN(primeNumber)) {
        document.getElementById("prime").innerText = `Це не число!
        Натисніть ще раз кнопку!
        `; 
    }   
    else if (!Number.isInteger(parseFloat(primeNumber))) {
        document.getElementById("prime").innerText = `Ваше число ${primeNumber} є десятковим дробом! 
        Введіть ціле число.
        Натисніть ще раз кнопку!
        `;
    }
    else if (primeNumber <= 1) {
        document.getElementById("prime").innerText = `Ваше число ${primeNumber}. 
        Введіть число > 1. 
        Натисніть ще раз кнопку!
        `;
    }
    else {    
        do {           
            result = primeNumber % divider;
            divider++;                  
            if (result === 0 && primeNumber != 2) {                
                document.getElementById("prime").innerText = `Ваше число ${primeNumber} не є простим!`;
                break;                
            }            
            document.getElementById("prime").innerText = `Ваше число ${primeNumber} - просте!`;
        } 
        while (divider <= Math.sqrt(primeNumber));             
    }
} 