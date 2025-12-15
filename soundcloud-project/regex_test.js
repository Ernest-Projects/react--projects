



const e1 = "ernest5621@gmail.com";
const e2 = "ernest5621gmail.com";
const e3 = "gmail@o.com";
const e4 = "ernest5621@gm0ail.com";


const test =  "abcd"
const last = /bcd$/

console.log(last.test(test))
 
// const regex = new RegExp("/[a-z]/")
const exp = /[A-Za-z0-9._-]+@(?!-)[A-Za-z0-9]+\.[a-zA-Z]{2,}$/i;


export const isUserEmailValid = (email) => {
  // regex (i know how its work)
  return /[A-Za-z0-9._-]+@(?!-)[A-Za-z0-9]+\.[a-zA-Z]{2,}$/.test(email);
};

// checking the password
export const isUserPasswordValid = (password) => {
  // regex (i know how its work)
  return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9-_!@#$%^&*()+].{8,}$/.test(password);
};


// test
console.log("email valid: ",  isUserEmailValid("ernest5621@gmail.com"));  // true
console.log("password valid: ",  isUserPasswordValid("5621ZERO_unital"));  // true


// THE TEST WAS SUCCESSFUL!


// console.log(exp.test(e1))
// console.log(exp.test(e2))
// console.log(exp.test(e3))
// console.log(exp.test(e4))
