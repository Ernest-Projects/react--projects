type MoneyNavbarProps = {
    clickerCount: number;
    moneyBalance: number
}

export const MoneyNavbar = ({clickerCount, moneyBalance}: MoneyNavbarProps) => {
    return (<>
    <section className="absolute top-10 text-center w-fit h-fit place-self-center">
        <header className="text-white text-4xl border-solid font-mono border-red-500">money: {moneyBalance}$ <span style = {{color:"gray"}}>(1.0x)</span></header>
        <p className="text-3xl font-mono text-center">Quantity of clicks: {clickerCount}</p>
    </section>
    </>)
}