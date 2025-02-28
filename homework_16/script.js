class Student {
    constructor(firstName, lastName, yearOfBirth, grades = []) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.yearOfBirth = yearOfBirth;
        this.grades = grades;
        this.visiting = new Array(25).fill(null);
    }
    getAge() {
        const currentYear = new Date().getFullYear();
        return currentYear - this.yearOfBirth;
    }

    addGrade(grade) { 
        if (this.grades.length >= 25) {
            console.log(`Ви вже завершили курс! Ваш середній бал ${this.getAverageGrade()}`);
            return;
        }
        this.grades.push(grade);
    }
    getAverageGrade() {
        if (this.grades.length === 0) {
            return 0;
        }
        const averageSum = this.grades.reduce((acc, grade) => acc + grade, 0);
        return averageSum / this.grades.length || 0;
    }
    
    getAverageVisiting() {
        const averageVisiting = this.visiting.filter(value => value === true).length;
        return averageVisiting > 0 ? averageVisiting / this.visiting.length : 0;
    }
    present() {
        for (let i = 0; i < this. visiting.length; i++) {
            if (this.visiting[i] === null) {
                this.visiting[i] = true;
                return;
            }
        }
    }
   
    absent() {
        for (let i = 0; i < this. visiting.length; i++) {
            if (this.visiting[i] === null) {
                this.visiting[i] = false;
                return;
            }
        }
    }

    summary() {
        if (this.getAverageGrade() > 90 && this.getAverageVisiting() > 0.9) {
            return 'Молодець!';
        }
        else if (this.getAverageGrade() > 90 || this.getAverageVisiting() > 0.9) {
            return 'Добре, але можна краще';
        } else {
            return 'Редиска!';
        }
    }
}

const student1 = new Student("Bogdan", "Kuzik", 2010);
student1.addGrade(95);
student1.addGrade(90);
student1.addGrade(95);
student1.addGrade(90);
student1.addGrade(82);
student1.addGrade(90);
student1.addGrade(95);
student1.addGrade(80);
student1.addGrade(95);
student1.addGrade(90);
student1.addGrade(95);
student1.addGrade(100);
student1.addGrade(95);
student1.addGrade(100);
student1.addGrade(95);
student1.present();
student1.present();
student1.addGrade(100);
student1.addGrade(95);
student1.addGrade(100);
student1.addGrade(95);
student1.addGrade(90);
student1.absent();
student1.addGrade(95);
student1.addGrade(100);
student1.addGrade(100);
student1.addGrade(100);
student1.addGrade(100);
console.log(student1.grades);
console.log(student1.visiting);
console.log(student1.getAge()); 
console.log(student1.getAverageGrade()); 
console.log(student1.getAverageVisiting());
console.log(student1.summary()); 

const student2 = new Student("Marija", "Petrova", 1995);
// student2.addGrade(80);
// student2.addGrade(90);
console.log(student2.getAge()); 
console.log(student2.getAverageGrade()); 
console.log(student2.getAverageVisiting());
console.log(student2.summary());

const student3 = new Student("Alex", "Bond", 2017, [70, 85, 90]);

student3.addGrade(80);
student3.present();
student3.absent();
student3.absent();
console.log(student3.visiting);
console.log(student3.getAge()); 
console.log(student3.getAverageGrade()); 
console.log(student3.getAverageVisiting());
console.log(student3.summary());