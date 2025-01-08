function myFunction() {
    const userName = prompt("Введіть ваше ім'я: ");
    let messageUserName = `Вас звати ${userName}`;
    const yearOfbirth = prompt('Введіть ваш рік народження: ');
if (yearOfbirth === null) {
    let messageAge = 'Шкода, що Ви не захотіли ввести свою дату народження 😥';
}
else {
    let today = new Date(); 
    let age = today.getFullYear() - yearOfbirth;
    messageAge = `Вам ${age} роки`;
}
const userCity = prompt('Введіть назву міста де ви проживаєте: ');
let userSport = prompt('Ваш улюблений вид спорту?');

let messageCity;
if (userCity === null){
    messageCity = 'Шкода, що Ви не захотіли ввести своє місто 😥';
}
else {
    switch(userCity) {
        case "Київ":
        case "Вашингтон":
        case "Лондон":
            messageCity = `Ви живете у столиці ${userCity}`;
            break;
        default:
            messageCity = `Ви живете у місті ${userCity}`;
        }
}


const bestPlayer = ['Олександр Усик', 'Вінісіус Жуніор', 'Новак Джокович'];

let messageSport;
if (userSport === null) {
    messageSport = 'Шкода, що Ви не захотіли ввести свій улюблений вид спорту 😥';
}
else {
    userSport = userSport.toLowerCase();
switch(userSport) {
        case "бокс":
            messageSport = `Круто! ${userName}, хочете стати як ${bestPlayer[0]}?`;
            break;
        case "футбол":
            messageSport = `Круто! ${userName}, хочете стати як ${bestPlayer[1]}?`;
            break;
        case "теніс":
            messageSport = `Круто! ${userName}, хочете стати як ${bestPlayer[2]}?`;
            break;
        default:
            messageSport = `Круто! ${userName}, ви молодець!!!`;
    }
}
const messageUser = alert(`
     ${messageUserName}.
     ${messageAge}. 
     ${messageCity}. 
     ${messageSport}
     `);
}



