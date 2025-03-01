class BankAccount {
    constructor(balance) {
        this.balance = balance;
    }

    getBalance() {
        console.log(`${this.balance}`);
    }

    deposit(depositCash) {
        if (depositCash <= 0) {
            try {
                throw new Error('Your contribution must be greater than ZERO!');
              } catch (e) {
                console.error(`${e.name}: ${e.message}`);
              }
        }
        this.balance += depositCash;
    }
    withdraw(withdrawCash) {
        if (withdrawCash <= 0) {
            try {
                throw new Error('The withdrawal amount needs greater than ZERO!');
              } catch (e) {
                console.error(`${e.name}: ${e.message}`);
              }
            }
        if (withdrawCash > this.balance) {
            try {
                throw new Error("You don't have enough cash!!!");
              } catch (e) {
                console.error(`${e.name}: ${e.message}`);
            }
            return
        } 
        this.balance -= withdrawCash;
    }
}

const account1 = new BankAccount(1000);

console.log(account1.getBalance()); // 1000

account1.deposit(100);

console.log(account1.getBalance()); // 1100

account1.deposit(0);

console.log(account1.getBalance()); // Error 1100

account1.withdraw(200);

console.log(account1.getBalance()); // 900

account1.withdraw(0);

console.log(account1.getBalance()); // 900

account1.withdraw(1000);

console.log(account1.getBalance()); // Error 900