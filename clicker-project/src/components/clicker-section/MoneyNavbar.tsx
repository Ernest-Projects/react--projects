type MoneyNavbarProps = {
    clickerCount: number;
    moneyBalance: number;
    mode: boolean;
    coefficient: number;
}

export const MoneyNavbar = ({clickerCount, moneyBalance, mode, coefficient}: MoneyNavbarProps) => {

    return (<>
<section className={`${mode === true ? "text-black": "text-white"} absolute top-10 text-center w-fit h-fit place-self-center`}>
        <header className=" duration-200 text-4xl font-mono">money: {moneyBalance}$ <span style = {{color:"gray"}}>({coefficient}x)</span></header>
        <p className="text-3xl font-mono duration-200 text-center">Quantity of clicks: {clickerCount}</p>
    </section>
    </>)
}