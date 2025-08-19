
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
      <section onClick={() => handleClick(1)} className={`w-[20rem] ${mode ==  true ? "active:shadow-[15px_25px_50px_1px_black] shadow-[20px_30px_70px_1px_black] bg-[rgb(20,20,20)]" : "active:shadow-[15px_25px_50px_1px_gray] shadow-[20px_30px_70px_1px_gray] bg-[rgb(185,185,185)]" } group z-10 select-none transition active:duration-[0ms] duration-100 ease-in-out ml-0 active:scale-[.9] place-self-center aspect-[1/1]  grid content-center relative self-center rounded-[10rem]`}>
        <button  className={`text-center font-mono absolute place-self-center transition text-3xl ${mode == true ? "text-white" : "text-black"}`}>
          Click!
        </button>
        <div className={`w-[80%] ${mode == true ? "group-active:bg-[rgb(50,50,50)] bg-[rgb(70,70,70)] group-active:shadow-[inset_15px_25px_90px_2px_black]  shadow-[inset_10px_20px_70px_1px_black]" : "group-active:bg-[rgba(180, 180, 180, 1)] bg-[rgb(210,210,210)] group-active:shadow-[inset_15px_25px_90px_2px_white]  shadow-[inset_10px_20px_70px_1px_white]"}  group-active:duration-[0ms] duration-100  aspect-[1/1] absolute justify-center place-self-center flex self-center rounded-[100rem]  z-[-1] bg-[rgb(70,70,70)]`}></div>
      </section>
    </>
  );
};






