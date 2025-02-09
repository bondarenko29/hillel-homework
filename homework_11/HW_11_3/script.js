const imgArray = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg'];
const changeImage = document.getElementById('changeImage');
const myButton = document.getElementById("myButton");
myButton.addEventListener('click', () => {
    const randIndex = Math.floor(Math.random() * (imgArray.length));
    const randPhoto = 'photo/' + imgArray[randIndex];
    changeImage.src = randPhoto;
})
