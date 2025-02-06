let usersBook = {
    users: [
        {name: 'Alex', phone: '+38(091)-111-22-33', email: 'alex@gmail.com'},
        {name: 'Max', phone: '+38(091)-123-26-30', email: 'max@gmail.com'},
    ],
    addUsers(name, phone, email)  {
        this.users.push({ name, phone, email });
    },
    findContact(name) {
        const findUser = this.users.filter(user => user.name === name);
        if (findUser.length > 0) {
            console.log(`Користувач ${name} є в телефонній книзі:`);
            findUser.forEach(user => {
                console.log(`${JSON.stringify(user)}`);
            })
        } else {
            console.log(`Користувача ${name} не знайдено в телефонній книзі`);
        }       
    }
};


usersBook.addUsers('Denis', '+38(099)-333-33-22', 'den@gmail.com');
usersBook.addUsers('Peter', '+38(091)-661-38-99','peter@gmail.com');
usersBook.addUsers('Alex', '+38(091)-551-77-55', 'alexandr@gmail.com');

console.log(`В телефонній книзі є ${usersBook.users.length} користувачів: `)
console.log(usersBook.users);
usersBook.findContact('Iryna');
usersBook.findContact('Alex');

