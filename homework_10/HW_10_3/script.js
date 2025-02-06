let usersBook = {
    users: [
        {name: 'Alex', phone: '+38(091)-111-22-33', email: 'alex@gmail.com'},
        {name: 'Max', phone: '+38(091)-123-26-30', email: 'max@gmail.com'},
    ],
    addUsers: (name, phone, email) => {
        const newUser = { name, phone, email };
        usersBook.users.push(newUser);
    },
    findContact: (name) => {
        const findUser = usersBook.users.filter(user => user.name === name);
        if (findUser.length > 0) {
            for (let i = 0; i < findUser.length; i++) {
                console.log(`Користувач ${name} є в телефонній книзі ${JSON.stringify(findUser[i])}`);
            }
        } else {
            console.log(`Користувача ${name} не знайдено в телефонній книзі`);
            return null;
        }       
    }
};

const {users, addUsers, findContact} = usersBook;
addUsers('Denis', '+38(099)-333-33-22', 'den@gmail.com');
addUsers('Peter', '+38(091)-661-38-99','peter@gmail.com');
addUsers('Alex', '+38(091)-551-77-55', 'alexandr@gmail.com');

console.log(users);
findContact('Iryna')
findContact('Alex');

