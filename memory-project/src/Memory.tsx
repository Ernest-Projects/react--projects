import { useAppSelector, useAppDispatch } from "./hooks"
import { increment } from "./store/store"
import styles from "./Memory.module.scss"
import { Field } from "./components/Field";

function Memory() {

  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  
  // background (STUPID)
  // const elements = []
  // for (let i = 0; i < 200; i++)  {
  //   elements.push(<div key = {i} className={`${styles.diamond} aspect-[1/1]  
  //            relative flex align-center justify-center bg-red-500  w-[3rem] text-center`}> <p className="absolute aspect-[1/1] rounded-[10rem] z-[100] left-[0] bg-white"></p> <p className={`absolute flex justify-center align-center rounded-[10rem] bg-black w-[1rem] place-self-center  z-[100] aspect-[1/1]`}></p></div>)
  // }

  return (
    <>
    <main className={`w-[100vw] flex  relative gap-[1%] bg-[rgb(35,35,35)] m-0 p-[1%]  h-[100vh]`}>
      <section className={`relative w-[30%] bg-[rgb(20,20,20)] p-4 rounded-[1rem] border h-[50%]`}>
        {/* <div className={`border absolute  top-[2rem] w-[20%] place-self-center`}> */}
          {/* <button onClick = {() => dispatch(increment())}>Click me</button>
          <p className="text-white">Count: {count}</p> */}
        {/* </div> */}
      </section>
      <section className={`w-[70%] h-[90%] relative border `}>
        <Field></Field>
      </section>
      <div className={`text-4xl text-white font-mono font-bold absolute bottom-[1rem] left-[1rem]`}>Memory game by Ernest</div>
    </main>
    {/* background (SHIT) */}
      {/* <div className={`grid grid-cols-20 place-self-center grid-rows-20 gap-[2rem] origin-center scale-[1] aspect-[1/1] justify-center align-center w-[100%] left-[0%] h-fit absolute top-[0%]`}>{elements}</div> */}
    </>
  ) 
}

export default Memory
