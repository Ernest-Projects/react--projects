



const e1 = "ernest5621@gmail.com";
const e2 = "ernest5621gmail.com";
const e3 = "gmail@o.com";


const test =  "abcd"
const last = /bcd$/

console.log(last.test(test))
 
// const regex = new RegExp("/[a-z]/")
const exp = /[A-Za-z0-9._-]+@(?!-)[A-Za-z0-9]+\.[a-zA-Z]{2,}$/i;



// test
console.log(exp.test(e1))
console.log(exp.test(e2))
console.log(exp.test(e3))
