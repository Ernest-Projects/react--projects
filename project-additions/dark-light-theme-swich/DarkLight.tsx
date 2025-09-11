import styles from "./DarkLight.module.scss";
type DarkLightProps = {
  
  onSwichTheme: () => void;             
  name: string;
  bodyWidth: number;
  side: boolean;
  widthNumber: number;
};
const DarkLight = ({ onSwichTheme, name ,bodyWidth, widthNumber, side}: DarkLightProps) => {
  return (
    <>
      <section style = {{opacity: bodyWidth > widthNumber ? "1" : "0" }} className={`${styles.darkLight} ${side ? styles.rightSide : styles.leftSide}`}>
        <button
          onClick={() => onSwichTheme()}
          className={`${name == "light" ? styles.lightButton : styles.darkButton}`}
        > 
          {" "}
          <p className={name == "light" ? styles.lightClass : styles.darkClass}>
            {name}
          </p>
        </button>
      </section>
    </>
  );
};

export default DarkLight;
