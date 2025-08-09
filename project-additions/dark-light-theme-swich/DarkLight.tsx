import styles from "./DarkLight.module.scss";
type DarkLightProps = {
  mode: boolean;
  onSwichTheme: () => void;
  name: string;
  bodyWidth: number;
};
const DarkLight = ({ mode, onSwichTheme, name ,bodyWidth}: DarkLightProps) => {
  return (
    <>
      <section style = {{opacity: bodyWidth > 700 ? "1" : "0" }} className={`${styles.darkLight}`}>
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
