const user = {
    firstName: 'Олександр',
    age: 28,
    location: 'Україна',
    getInfo: function (param) { 
        const { firstName, age, location } = user;
        console.log(`Вас звати ${firstName}. Вам ${age} років. Ваше місце проживання - ${location}.`);
        document.getElementById('info').textContent = `Вас звати ${firstName}. Вам ${age} років. Ваше місце проживання - ${location}.`;
     }
  };

  user.getInfo();

