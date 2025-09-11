import styles from "./DarkLight.module.scss";
type DarkLightProps = {
  mode: boolean;
  onSwichTheme: () => void;             
  name: string;
  bodyWidth: number;
  side: boolean;
  widthNumber: number;
};
const DarkLight = ({ mode, onSwichTheme, name ,bodyWidth, widthNumber, side}: DarkLightProps) => {
  return (
    <>
      <section style = {{opacity: bodyWidth > widthNumber ? "1" : "0" }} className={`${styles.darkLight} ${side ? styles.rightSide : styles.leftSide}`}>
        <button
          onClick={() => onSwichTheme()}
          className={`${mode == true ? styles.lightButton : styles.darkButton}`}
        > 
          {" "}
          <p className={mode == true ? styles.lightClass : styles.darkClass}>
            {name}
          </p>
        </button>
      </section>
    </>
  );
};

export default DarkLight;
