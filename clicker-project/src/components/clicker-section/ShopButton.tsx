



type ShopButtonProps = {
    onSetVisible: () => void
}

export const ShopButton = ({onSetVisible}: ShopButtonProps) => {


    return (<>
    <section className="absolute bottom-20 w-[20rem]  h-[5rem] place-self-center">
        <button onClick = {()=> onSetVisible()} className="text-3xl font-mono  bg-[rgb(20,20,20)] hover:shadow-[inset_0_-10px_40px_1px_rgb(20,20,20)] duration-200 hover:bg-[rgb(50,50,50)] w-full h-full active rounded-[1rem] absolute"><span className="font-mono">
            Open shop 💎
            </span></button>
    </section>


    </>)
}