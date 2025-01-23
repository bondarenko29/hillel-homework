function comparison(){
    const attempts = 10;
    let count = 0;
    let countEnd = attempts;
    while (count < attempts) {
        const inputNumber = prompt(`Введіть число більше 100. Залишилось ${countEnd--} спроб: `);
        if (inputNumber === null) {
            confirm("Ви скасували введення");
            console.log("Ви скасували введення!");
           return;
        }
        if (!isNaN(inputNumber) && inputNumber > 100) {
            confirm(`Ваше число ${inputNumber} > 100. OK`);
            console.log(inputNumber);
            break;
        } 
        if (countEnd === 0) {
            confirm(`
            Ви вичерпали всі 10 спроб.
            Останнє введене число ${inputNumber} < 100`);
            console.log("Ви вичерпали всі 10 спроб");
        } else {
            inputNumber;
        }
        count++; 
    }
}
comparison();
