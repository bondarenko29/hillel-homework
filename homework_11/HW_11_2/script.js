const myButton = document.getElementById("myButton");
const text = document.getElementById("changeColor");

let clicks = 0;

function clickButton() {
    clicks += 1;
    if(clicks % 2 === 0) {
        text.style.color = "#087cdb";
        text.style.fontSize = "28px";
    } else {
        text.style.color = "#db2f08";
        text.style.fontSize = "22px";
    }  
}

myButton.addEventListener('click', clickButton);
 






