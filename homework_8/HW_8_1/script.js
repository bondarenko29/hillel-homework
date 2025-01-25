let ladder = {
    step: 0,
    up: function () { // підніматиме вас на одну сходинку
        this.step++;
        return this;
    },
    down: function() { // опускатиме вас на одну сходинку
        if(this.step > 0){
            this.step--;
        }
        return this;
    },
    showStep: function() { // показує поточну сходинку
        console.log(this.step);
        document.getElementById("ladder").innerText = `Ви зараз на ${this.step} сходинці`;
        return this;
    }
  };

ladder.up().up().up().down().down().down().down().up().up().showStep();


//   let ladder = {
//     step: 0,
//     up() { // підніматиме вас на одну сходинку
//         this.step++;
//         return this;
//     },
//     down() { // опускатиме вас на одну сходинку
//         if(this.step > 0){
//             this.step--;
//         }
//        return this;
//     },
//     showStep() { // показує поточну сходинку
//         console.log(this.step);
//         return this;
//     }
//   };
  

//   ladder.up().up().up().up().down().down().down().down().down().up().up().showStep();