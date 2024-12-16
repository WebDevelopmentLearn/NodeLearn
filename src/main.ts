import {capitalize, reverse} from "./stringUtils";
import Finance from "./finance";
import UserManagement from "./userManagement";
import {generateFibonacci, generatePrimeNumbers} from "./sequenceUtils";

//TODO: Задание 1 START
console.log("//=============================//");
console.log("Задание 1");

console.log("capitalize('hello'): ", capitalize('hello')); // Hello
console.log("reverse('hello'): ", reverse('hello')); // olleh

console.log("//=============================//");
//TODO: Задание 1 END


//TODO: Задание 2 START
console.log("//=============================//");
console.log("Задание 2");

const loanCalculator = new Finance.LoanCalculator(100000, 10, 5);
console.log("loanCalculator.calculateMonthlyPayment(): ", loanCalculator.calculateMonthlyPayment()); // 2124.02

const taxCalculator = new Finance.TaxCalculator(60000);
console.log("taxCalculator.calculateTax(): ", taxCalculator.calculateTax()); // 6500

console.log("//=============================//");
//TODO: Задание 2 END


//TODO: Задание 3 START
console.log("//=============================//");
console.log("Задание 3");

const adminUser = new UserManagement.Admin.AdminUser("John", "john_doe@gmail.com", false);
adminUser.toggleSuperAdminStatus();
console.log("adminUser: ", adminUser);
adminUser.toggleSuperAdminStatus();
console.log("adminUser: ", adminUser);

console.log("//=============================//");
//TODO: Задание 3 END


//TODO: Задание 4 START
console.log("//=============================//");
console.log("Задание 4");

console.log("generateFibonacci(5): ", generateFibonacci(5)); // [1, 1, 2, 3, 5]
console.log("generatePrimeNumbers(5): ", generatePrimeNumbers(5)); // [2, 3, 5, 7, 11]

console.log("//=============================//");
//TODO: Задание 4 END



