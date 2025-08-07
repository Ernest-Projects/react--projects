import styles from "./DarkLight.module.scss";
type DarkLightProps = {
  mode: boolean;
  onSwich: () => void;
  name: string;
};
const DarkLight = ({ mode, onSwich, name }: DarkLightProps) => {
  return (
    <>
      <section className={`${styles.darkLight}`}>
        <button
          onClick={() => onSwich()}
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
