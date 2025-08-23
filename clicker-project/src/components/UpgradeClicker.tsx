type UpgreClickerProps = {
    name: string;
    mode: boolean;
    description: string;
    image: string;
    width: number;

    // for levels
    level: number;
    increaseLevel: () => void;
    
    // for prices
    price: number;
    increasePrice: () => void;
    
    money: number
} 

export const UpgradeClicker = ({mode,name, description, image, level, increaseLevel, width, money, increasePrice, price }: UpgreClickerProps) => {

    const handleUpgrader = () => {
        increaseLevel(); increasePrice()
    }
    return(<>
        <section className={`w-full relative flex duration-200 h-full ${mode === true ? "bg-[rgb(220,220,220)]" : "bg-[rgb(45,45,45)]"}  hover:scale-[1.05] transition rounded-[1rem]`}>
            <div className={`h-[80%] left-[1.5rem] place-self-center  aspect-[1/1] absolute overflow-hidden rounded-[10rem]  `}>
            <img style = {{objectFit: "cover", }} className={`h-full w-full`} src={image} alt="ой перебач шось пішло мало не так!" />

            </div>
            <div className=" absolute gap-[1rem] h-full flex justify-center flex-col left-[10rem] w-[70%]">
            <header className = {`font-mono duration-200 text-left text-2xl ${width < 1500 ? "  text-[1.2rem]": "text-1xl"}`}>{name}</header>
            <p dangerouslySetInnerHTML={{__html: description}} className={`text-[rgb(100,100,100)] ${width < 1500 ? "text-[.6rem]": "text-[.9rem]"}  duration-200 font-mono`}></p>

            </div>
            <p className={`font-mono font-bold text-2xl absolute top-[1.5rem] right-[12.5rem]`}>LVL {level}</p>
            <button onClick={()=> money >= price ? handleUpgrader(): console.log("not enought money!")} className = {`${money < price ? "active:bg-red-500": ""} h-[70%] transition duration-200 absolute ${mode === true ? "bg-[rgb(255,255,255)] hover:shadow-[inset_0_-10px_40px_1px_rgb(180,180,180)]" : "bg-[rgb(80,80,80)] hover:shadow-[inset_0_-10px_40px_1px_rgb(20,20,20)]" } w-fit px-4 place-self-center text-2xl font-mono right-[3%] rounded-[.5rem]`}> Upgrade <br /><span className="text-lg">{price}$</span></button>
        </section>
    </>)
}