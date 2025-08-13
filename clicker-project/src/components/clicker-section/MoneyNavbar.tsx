


import React from "react";

type MoneyNavbarProps = {
    clickerCount: number;
}

export const MoneyNavbar = ({clickerCount}: MoneyNavbarProps) => {
    return (<>
    <section className="absolute top-10 text-center w-fit h-fit place-self-center">
        <header className="text-white text-4xl border-solid font-mono border-red-500">543643</header>
        <p className="text-3xl font-mono text-center">Quantity of clicks: {clickerCount}</p>
    </section>
    </>)
}