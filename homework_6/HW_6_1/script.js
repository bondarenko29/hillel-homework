function myFunction(){
    const mySentence = prompt('Введіть речення: ');
    const myChar = prompt('Введіть символи для видалення: ');
    let message;
    let newSentence = '';
    if (mySentence === null || mySentence.trim() === '') {
      message = confirm("Ви не ввели речення!");
      document.getElementById("converter").innerText = "";
    } 
    if (myChar === null || myChar.trim() === '') {
      message = confirm("Ви не ввели символи! Натисніть ще раз на кнопку!");
      document.getElementById("converter").innerText = "";   
    }   
    if(mySentence, myChar) {
        const removeChar = function() {      
        for (let i = 0; i < mySentence.length; i++){
            if(!myChar.includes(mySentence[i])) {
                newSentence += mySentence[i];
            }
        }
        return newSentence;
      }
      removeChar(mySentence, myChar);
      document.getElementById("sentence").innerText = `Введене речення: 
      ${mySentence}.
      Введені символи:
      ${myChar}.
       Речення після видалення символів: 
       ${newSentence}!
       `;
    }
  }