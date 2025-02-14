const main = document.getElementById('main');
const container = document.createElement('div');
container.setAttribute('id', 'btn-container');

for (let i = 0; i < 3; i++) {
    const button = document.createElement('button');
    button.classList.add('btn');
    button.textContent = `Button ${i + 1}`;
    container.appendChild(button);
}
main.appendChild(container);

container.addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
        alert(`Клікнуто на кнопці: ${event.target.textContent}`);
    }
});