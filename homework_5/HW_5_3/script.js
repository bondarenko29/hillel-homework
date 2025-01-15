function myFunction() {
    let intNumber = prompt('Введіть ціле число: ');

    let message;
    let fragment = new DocumentFragment();
    if (intNumber === null || intNumber.trim() === '' || isNaN(intNumber) || intNumber == 0) {
        message = confirm("Ви не ввели число!");
        intNumber = document.getElementById("converter").innerText = ""; 
    } 
    
    else if (!Number.isInteger(parseFloat(intNumber))) {
        message = confirm("Ви не ввели ціле число!");
        intNumber = document.getElementById("converter").innerText = "";
    }
    else {
        let i = 1;
        let el;
       
        do {
            el = document.createElement("li"); 
            let pow = `Якщо ${i}, то ${i}^2 = ${Math.pow(i, 2)}`
            el.append(pow); 
            fragment.append(el);
            console.log(i);
            i++;
        }
        while (Math.pow(i, 2) <= intNumber)                          
       }
       return fragment;     
}


