const container = document.getElementById('btn-container');

const button1 = document.createElement('button');
button1.classList.add('btn');
button1.textContent = "Введіть url";
container.appendChild(button1);

const button2 = document.createElement('button');
button2.classList.add('btn');
button2.textContent = "Перейти";
container.appendChild(button2);

(() => {
    let inputUrl = '';
    button1.addEventListener('click', () => {
        const input = prompt('Введіть свій url: ');
    // let validUrl = isValidHttpUrl(input);
        if(!isValidHttpUrl(input)) {
            confirm('Це не URL!!! Введіть ще раз URL');
        } else {
            inputUrl = input;
        }
    });

    button2.addEventListener('click', () => {
        if(!inputUrl) {
            confirm('Ви не зберегли URL. Введіть свою URL');
        } else {
            location.href = inputUrl;
        } 
    });

    function isValidHttpUrl(string) {
        try {
        const newUrl = new URL(string);
        return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
        } catch (err) {
        return false;
        }
    }
})();

