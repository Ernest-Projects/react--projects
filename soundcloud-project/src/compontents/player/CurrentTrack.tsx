import { usePlayerAppSelector } from "../../redux/hooks/playerHook";
export const CurrentTrack = () => {
  const trackData = usePlayerAppSelector(state => state.player.currentTrack);
  return (
    <>
      <main className="w-full h-full   gap-[1rem] flex overflow-hidden">
        <div className="h-[70%] place-self-center aspect-[1/1] relative">
    <img src={`../../../public/tracksTitles/${trackData.image}`} className="w-full h-full" alt="" />
        </div>
    <div className=" relative w-full h-[80%] place-self-center flex flex-col justify-between leading-[1rem] text-[10px] font-bold">
    <p className="text-[rgb(153,153,153)] overflow-hidden  whitespace-nowrap text-ellipsis w-full hover:text-[rgb(90,90,90)] ">
        <span>
             {trackData.title.subtitle}
            </span>
             </p>
    <header className=" whitespace-nowrap overfow-hidden ">{trackData.title.name}</header>
    </div>
      </main>
    </>
  );
};
