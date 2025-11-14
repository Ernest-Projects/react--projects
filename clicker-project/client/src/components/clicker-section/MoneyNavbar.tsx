import { useEffect, useState } from "react";

type MoneyNavbarProps = {
  clickerCount: number;
  moneyBalance: number;
  mode: boolean;
  coefficient: number;
  doubleClickBanner: boolean;
};

export const MoneyNavbar = ({
  moneyBalance,
  mode,
  coefficient, doubleClickBanner
}: MoneyNavbarProps) => {
    const [animate, setAnimate] = useState(false)

    useEffect(()=> {
        setAnimate(true);
        const time = setTimeout(()=> setAnimate(false), 70)
        return () => clearTimeout(time)
    }, [moneyBalance])
  return (
    <>
      <section
        className={`${
          mode === true ? "text-black" : "text-white"
        } absolute top-10 text-center w-fit h-fit place-self-center`}
      >
        <header className={`${animate === true ? "animate-ping" : ""} duration-200 ease-out delay-0 m-[2rem] text-4xl font-mono`}>
          money: {moneyBalance}${" "}
          <span className={`duration-10 ${doubleClickBanner === true ? "text-orange-500 animate-ping": "text-gray"}`}>({coefficient}x)</span>
        </header>
        
        {/* not now */}
        {/* <p className="text-3xl font-mono duration-200 text-center">
          Quantity of clicks: {clickerCount}
        </p> */}
      </section>
    </>
  );
};
