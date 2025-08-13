import 'styled-components'
import { useState } from 'react';
import styles from '../styles/ClickerButton.module.scss'
type ClickerButtonProps = {
  onCountClicker: (type: number) => void;
} 

export const ClickerButton = ({onCountClicker}: ClickerButtonProps) => {

  const handleClick =(num: number) => {

    // for quantity of clicks in navbar
    onCountClicker(num);
  }
  return (
    <>
      <section onClick={() => handleClick(1)} className={`w-[20rem] group z-10 select-none transition-transform active:duration-[0ms] duration-100 ease-in ml-0 active:scale-[.9] place-self-center active:shadow-[15px_25px_50px_1px_black] shadow-[20px_30px_70px_1px_black] bg-[rgb(20,20,20)] aspect-[1/1]  grid content-center relative self-center rounded-[10rem]`}>
        <button  className="text-center font-mono absolute place-self-center text-3xl">
          Click!
        </button>
        <div className="w-[80%] group-active:bg-[rgb(50,50,50)] group-active:duration-[0ms] duration-100 group-active:shadow-[inset_15px_25px_90px_2px_black]  shadow-[inset_10px_20px_70px_1px_black] aspect-[1/1] absolute justify-center place-self-center flex self-center rounded-[100rem]  z-[-1] bg-[rgb(70,70,70)]"></div>
      </section>
    </>
  );
};






