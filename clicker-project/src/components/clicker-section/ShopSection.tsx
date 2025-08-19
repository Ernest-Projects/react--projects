

type ShopSectionProps = {
    isVisible: boolean;
    mode: boolean
}

export const ShopSection = ({isVisible, mode}: ShopSectionProps) => {
    return (<>

    <section style = {{left: isVisible == true ? "0%": "-50%"}} className={`z-10 ${mode == true ? "bg-[rgba(245, 245, 245, 1)] text-black" : "bg-[rgb(20,20,20)] text-white"}  left-0 duration-200 rounded-br-xl rounded-tr-xl w-[50%] transition-[left] h-[96%] absolute my-[1%]`}>
        <header className="text-5xl font-mono text-center my-[4rem]">Upgrage clicker</header>
    </section>
    
    </>)
}