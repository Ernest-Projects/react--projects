import styles from "./Display.module.scss";
import { useEffect, useState } from "react";
// props
type DisplayProps = {
  pressAllow: boolean;
  pressKey: string;
  pressId: number;
  mode: boolean;
};

export const Display = ({
  pressAllow,
  pressKey,
  pressId,
  mode,
}: DisplayProps) => {

  //display for input numbeer
  const [arrayValues, setArrayValues] = useState("");
  //calculation output 
  const [displayValue, setDisplayValue] = useState(0);
  

// hook logic of calculator
useEffect(() => {
    
    if (arrayValues.length < 15) {
        setArrayValues((prev) => prev + (pressAllow == true ?  pressKey : "")); 
    }
    // regular expression for array of input data
    const tokens = arrayValues.match(/\d+|\+|\-|\*|\//g);
    let result = 0;

    if(!tokens) return

    // function for cleaning the displays of input and output
    const clearDisplay = (value = false, output =false) => {
      if(value) { setArrayValues("")}
      if(output) {setDisplayValue(0)}
    }
    
    let arr = [...tokens];

    for (let i = 0; i < arr.length; i++) {
        if(isNaN(Number(arr[i]))) {
          if(arr[i] == ".") { 
             console.log("dot")
             const floatNumber = arr[i - 1];
             console.log(floatNumber)
          }
            console.log(parseFloat(arr[i]));
            if(arr[i] == "*" || arr[i] == "/") {
                const left = Number(arr[i - 1]);
                const right = Number(arr[i + 1]);
                
                result = arr[i] == "*" ? parseFloat((left * right).toFixed(5)) : parseFloat((left / right).toFixed(5));
                arr.splice(i - 1, 3, result.toString());
              i -= 1;
              }
              if(arr[i] == "+" || arr[i] == "-") {
                const left = Number(arr[i - 1]);
                const right = Number(arr[i + 1]);
                
                result = arr[i] == "+" ? left + right : left - right;
                arr.splice(i - 1, 3, result.toString());
              i -= 1;
                
              }
        } else {
          result = parseFloat(arr[i]);
          if (arr.length == 1) {
            console.log("one!")
          }
        }
        setDisplayValue(Number(result));
    }
    // clear displays when 'clear' button clicked
    if (pressKey == "AC") {clearDisplay(true, true)}

    if(pressKey == "=") {
        setArrayValues(() => result.toString())
        console.log(result)
      clearDisplay(false,true)
    }

}, [pressId]);   

  return (
    <>
      <section className={styles.display}>
        <p 
          className={styles.output}
          style={{ color: mode == true ? "black" : "white" }}
        >
          {arrayValues}
        </p>
      </section>
    </>
  );
};
