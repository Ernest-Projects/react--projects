



type ShopButtonProps = {
    onSetVisible: () => void
    mode: boolean
}

export const ShopButton = ({onSetVisible, mode}: ShopButtonProps) => {


    return (<>
    <section className={` absolute bottom-20 w-[20rem]  h-[5rem] place-self-center`}>
        <button onClick = {()=> onSetVisible()} className={`text-3xl font-mono ${mode === true ? "bg-[rgb(180,180,180)] hover:shadow-[inset_0_-10px_40px_1px_rgb(130,130,130)] text-black": "bg-[rgb(20,20,20)] hover:shadow-[inset_0_-10px_40px_1px_rgb(50,50,50)] text-white" } duration-100 w-full h-full active rounded-[1rem] absolute`}><span className="font-mono">
            Open shop 💎
            </span></button>
    </section>


    </>)
}