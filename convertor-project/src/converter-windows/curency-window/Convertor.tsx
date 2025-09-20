import React, { useState, useEffect } from "react";
import styles from "./Window.module.scss";
import InputContainer from "./InputContainer";
import type { ConvertorData } from "../../data/types";

type ConvertorProps = {
  data: ConvertorData;
  isActive: boolean;
  themeMode: boolean;
};
type UnitKey = (keyof ConvertorData["abbreviation"])[];

export const Convertor: React.FC<ConvertorProps> = ({
  data,
  isActive,
  themeMode,
}) => {
  // !!
  const abbreviation = data.abbreviation;
  const notate = data.notate;
  const convertation = data.convertation;
  const name = data.button_name;
  // !!

  // initializing default options
  let [selectedValueOne, setSelectedValueOne] = useState(abbreviation.one);
  let [selectedValueTwo, setSelectedValueTwo] = useState(abbreviation.two);

  // initializing default notes
  const [noteInput, setNoteInput] = useState(notate.one_two);
  const [noteOutput, setNoteOutput] = useState(notate.two_one);

  // input and output
  let [inputValue, setInputValue] = useState("");
  let [outputValue, setOutputValue] = useState("");

  // mapping
  const units = Object.keys(abbreviation) as (keyof typeof data.abbreviation)[];

  //hook for swapping
  const [isSwapping, setIsSwapping] = useState(false);
  // function for swaping values places
  const swapValues = () => {
    setIsSwapping((prev) => !prev);
    console.log(isSwapping);
  };

  useEffect(() => {
    swapValues();
  }, [selectedValueOne, selectedValueTwo]);

  const convertationFunction = () => {
    // into num
    const input = parseFloat(inputValue);

    // for 'err' message in output
    const isNumber: boolean = /^[+-]?\d+(\.\d+)?$/.test(inputValue);

    if (
      selectedValueOne === abbreviation.one &&
      selectedValueTwo === abbreviation.two
    ) {
      // under notation in input
      setNoteInput(notate.one_two);

      // under notation in output
      setNoteOutput(notate.two_one);

      //convertation
      setOutputValue((input * convertation.one.two).toFixed(3));
    } else if (
      selectedValueOne === abbreviation.one &&
      selectedValueTwo === abbreviation.three
    ) {
      setNoteInput(notate.one_three);
      setNoteOutput(notate.three_one);
      setOutputValue((input * convertation.one.three).toFixed(3));
    } else if (
      selectedValueOne === abbreviation.three &&
      selectedValueTwo === abbreviation.one
    ) {
      setNoteInput(notate.three_one);
      setNoteOutput(notate.one_three);
      setOutputValue((input * convertation.three.one).toFixed(3));
    } else if (
      selectedValueOne === abbreviation.three &&
      selectedValueTwo === abbreviation.two
    ) {
      setNoteInput(notate.three_two);
      setNoteOutput(notate.two_three);
      setOutputValue((input * convertation.three.two).toFixed(3));
    } else if (
      selectedValueOne === abbreviation.two &&
      selectedValueTwo === abbreviation.one
    ) {
      setNoteInput(notate.two_one);
      setNoteOutput(notate.one_two);
      setOutputValue((input * convertation.two.one).toFixed(3));
    } else if (
      selectedValueOne === abbreviation.two &&
      selectedValueTwo === abbreviation.three
    ) {
      setNoteInput(notate.two_three);
      setNoteOutput(notate.three_two);
      setOutputValue((input * convertation.two.three).toFixed(3));
    }

    // if the input and output options are the same
    else {
      setNoteInput("---");
      setNoteOutput("---");
      setOutputValue(inputValue);
    }

    // also, if input value is not a number (letter, for example)
    if (!isNumber && inputValue.length != 0) {
      setOutputValue("err");
    }

    if (inputValue.length == 0) {
      setOutputValue("---");
    }
  };
  // dynamic reloading output field
  useEffect(() => {
    convertationFunction();
  }, [selectedValueOne, selectedValueTwo, inputValue]);

  return (
    <>
      <main
        className={`${styles.window} ${
          isActive === true ? styles.active : ""
        } ${themeMode == true ? styles.lightWindow : styles.darkWindow}`}
      >
        <section className={`${styles.leftSide}`}>
          {renderButtons(
            units,
            selectedValueOne,
            setSelectedValueOne,
            abbreviation,
            name,
            themeMode
          )}

          <InputContainer
            inputValue={inputValue}
            setinputValue={setInputValue}
            themeMode={themeMode}
          />
          <div
            style={{ color: themeMode == true ? "black" : "white" }}
            className={`${styles.note}  ${
              isActive === true ? styles.activeNote : ""
            }`}
          >
            {noteInput}
          </div>
        </section>
        <section
          className={`${styles.rightSide} ${
            isActive === true ? styles.activeSide : ""
          }`}
        >
          {renderButtons(
            units,
            selectedValueTwo,
            setSelectedValueTwo,
            abbreviation,
            name,
            themeMode
          )}

          <div
            style={{
              color:
                outputValue === "err"
                  ? "red"
                  : themeMode === true
                  ? "black"
                  : "white",
            }}
            className={styles.output}
          >
            {outputValue}
          </div>
          <div
            style={{ color: themeMode == true ? "black" : "white" }}
            className={styles.note}
          >
            {noteOutput}
          </div>
          <div
            onClick={() => swapValues()}
            style={{
              background:
                themeMode === true ? "rgb(210,210,210)" : "rgb(20,20,20)",
            }}
            className={styles.changeButton}
          >
            <span
              style={{
                color: themeMode === true ? "black" : "white",
                position: "absolute",
                cursor: "pointer",
                placeSelf: "center",
                transform: "scale(1.3)",
              }}
              className="material-symbols-outlined"
            >
              sync
            </span>
          </div>
        </section>
      </main>
    </>
  );
};

// function for mapping buttons in converters
function renderButtons(
  units: UnitKey,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  abbreviation: ConvertorData["abbreviation"],
  name: ConvertorData["button_name"],
  themeMode: boolean
) {
  return (
    <section className={styles.buttonArea}>
      {units.map((unitkey) => (
        <button key={unitkey} onClick={() => setValue(abbreviation[unitkey])}>
          {name[unitkey]}
        </button>
      ))}
      <div
        className={styles.selectedValue}
        style={{ color: themeMode == true ? "black" : "white" }}
      >
        {value}
      </div>
    </section>
  );
}

export default Convertor;
