import styles from "../styles/ClickerButton.module.scss"
type ClickerButtonProps = {
  onCountClicker: (type: number) => void;
  mode:boolean;
} 


export const ClickerButton = ({onCountClicker, mode}: ClickerButtonProps) => {

  const handleClick =(num: number) => {

    // for quantity of clicks in navbar
    onCountClicker(num);
  }
  return (
    <>
      <section style = {{transformStyle: "preserve-3d"}} onClick={() => handleClick(1)} className={`hover:rotate-y-[-20deg] transform-style-preserve-3d w-[20rem] ${mode ==  true ? "active:shadow-[15px_25px_50px_1px_black] shadow-[20px_30px_70px_1px_black] bg-[rgb(20,20,20)]" : "active:shadow-[15px_25px_50px_1px_gray] shadow-[20px_30px_70px_1px_gray] bg-[rgb(185,185,185)]" } active:animation-ping group z-10 select-none transition active:duration-[0ms] duration-100 ease-in-out ml-0 active:scale-[.9] place-self-center aspect-[1/1]  grid content-center relative self-center rounded-[10rem]`}>
        <button  className={`text-center font-mono absolute place-self-center transition  z-[10] text-3xl ${mode == true ? "text-white" : "text-black"}`}>
          Click!
        </button>
        <div className={`${styles.clickAnimation} group z-[10]  w-full h-[20rem] grid `}>
          <p className={`place-self-center z-[-2] group-active:top-[-10rem] opacity-0 duration-300 delay-20 group-active:opacity-100 absolute z-[-1] top-0`}>+1</p>

        </div>
        <div className={`w-[80%] ${mode == true ? "group-active:bg-[rgb(50,50,50)] bg-[rgb(70,70,70)] group-active:shadow-[inset_15px_25px_90px_2px_black]  shadow-[inset_10px_20px_70px_1px_black]" : "group-active:bg-[rgba(180, 180, 180, 1)] bg-[rgb(210,210,210)] group-active:shadow-[inset_15px_25px_90px_2px_white]  shadow-[inset_10px_20px_70px_1px_white]"}  group-active:duration-[0ms] duration-100  aspect-[1/1] absolute justify-center place-self-center flex self-center rounded-[100rem]  z-[-1] bg-[rgb(70,70,70)]`}></div>
      </section>
    </>
  );
};






