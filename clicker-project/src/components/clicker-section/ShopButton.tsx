



type ShopButtonProps = {
    onSetVisible: () => void
    mode: boolean;
    width: number;
}

export const ShopButton = ({onSetVisible, mode, width}: ShopButtonProps) => {


    return (<>
    <section className={` absolute bottom-20 w-[20rem]  h-[5rem] place-self-center`}>
        <button onClick = {()=> onSetVisible()} className={`${width < 1280 ? "active:bg-red-500" : "" } text-3xl font-mono ${mode === true ? "bg-[rgb(240,240,240)] hover:shadow-[inset_0_-10px_40px_1px_rgb(180,180,180)] text-black": "bg-[rgb(20,20,20)] hover:shadow-[inset_0_-10px_40px_1px_rgb(50,50,50)] text-white" } duration-100 w-full h-full active rounded-[1rem] absolute`}><span className="font-mono">
            Open shop 💎
            </span></button>
    </section>


    </>)
}