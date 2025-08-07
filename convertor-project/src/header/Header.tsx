




import styles from './Header.module.scss'

type HeaderProps = {
    commonClass: string;
    onSelect: (key: string) => void;
};
const buttons = ["⚖️ weight", "💰 currency", "📏 length"];

const Header = ({commonClass, onSelect}: HeaderProps) => {
    return ( <>
        <main className={styles.header}>
            {buttons.map((button, key) => {
                return (<button key = {key} onClick={() =>onSelect(button.split(" ")[1])} className={commonClass}>{button}</button>)
                })}
        </main>
    </>
    )
}

export default Header