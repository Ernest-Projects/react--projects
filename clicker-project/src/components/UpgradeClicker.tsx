type UpgreClickerProps = {
    name: string;
    description: string;
    image: string;
    level: number;
    increaseLevel: () => void
} 

export const UpgradeClicker = ({name, description, image, level, increaseLevel }: UpgreClickerProps) => {

 
    return(<>
        <section className={`w-full relative flex h-full bg-[rgb(45,45,45)] hover:scale-[1.05] transition duration-100 rounded-[1rem]`}>
            <div className={`h-[80%] left-[1.5rem] place-self-center  aspect-[1/1] absolute overflow-hidden rounded-[10rem]  `}>
            <img style = {{objectFit: "cover", }} className={`h-full w-full`} src={image} alt="ой перебач шось пішло мало не так!" />


            </div>
            <div className=" absolute gap-[1rem] h-full flex justify-center flex-col left-[20%] w-[70%]">
            <header className = {`font-mono  text-left text-3xl`}>{name}</header>
            <p dangerouslySetInnerHTML={{__html: description}} className="text-[rgb(100,100,100)] text-md font-mono "></p>

            </div>
            <p className={`font-mono font-bold text-2xl absolute top-[1.5rem] right-[12.5rem]`}>LVL {level}</p>
            <button onClick={()=> increaseLevel()} className = {` h-[70%] transition hover:shadow-[inset_0_-10px_40px_1px_rgb(20,20,20)] duration-200 absolute  bg-[rgb(80,80,80)] w-fit px-4 place-self-center text-2xl font-mono right-[3%] rounded-[.5rem]`}> Upgrade</button>
        </section>
    </>)
}