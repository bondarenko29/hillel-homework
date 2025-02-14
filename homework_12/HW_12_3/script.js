const main = document.getElementById('main');
const list = document.createElement('ul');
list.setAttribute('id', 'list');
main.appendChild(list);
const div = document.createElement('div');
div.classList.add('div');
main.appendChild(div);
const input = document.createElement('input');
input.classList.add('input');
input.setAttribute('placeholder', 'Додати нове завдання')
div.appendChild(input);
const btnInput = document.createElement('button');
btnInput.classList.add('btn');
btnInput.textContent = 'Додати';
div.appendChild(btnInput);

btnInput.addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
        
    }
});


btnInput.addEventListener('click', () => {
    if(!(input.value)) {
        alert('Додайте завдання');
    } else {
        const fragment = new DocumentFragment();
        const li = document.createElement("li");
        li.classList.add('item');
        li.textContent = input.value;
        const btnRemove = document.createElement('button');
        btnRemove.classList.add('btn', 'btnRemove');
        btnRemove.textContent = 'Видалити';
        li.appendChild(btnRemove); 
        fragment.appendChild(li);
        list.appendChild(fragment);
        input.value = '';
    }
});

list.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      event.target.parentNode.remove();
    }
  });
