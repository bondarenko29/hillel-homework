const user = {
    firstName: 'Олександр',
    age: 28,
    location: 'Україна',
    getInfo: function () { 
        console.log(`Вас звати ${this.firstName}. Вам ${this.age} років. Ваше місце проживання - ${this.location}.`);
        document.getElementById('info').textContent = `Вас звати ${this.firstName}. Вам ${this.age} років. Ваше місце проживання - ${this.location}.`;
     }
  };

  user.getInfo();

