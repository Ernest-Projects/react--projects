import { TrackTitle } from "./TrackTitle";
export const Recently = () => {
    const RecentlyPlayed = Array.from({length: 6}, (_, i) =>({image: `https://picsum.photos/300/200?random=${i}`, type: "track", title: {header: `Track name ${i}`, subtitle:`track author ${i}`}})) 

return (<>
<main>

    <section className="w-full h-fit text-white gap-y-[1.5rem] flex flex-col  gap-x-[1.5rem]">
        <header className="text-lg font-bold">Recently played</header>
        <div className=" grid grid-cols-6 gap-x-[1.5rem]">
        {RecentlyPlayed.map((item, index) => (
             <TrackTitle key = {index} trackData={item}></TrackTitle>
        ))}
        </div>
        {/* <Slider content = {LikedCardsObject}></Slider> */}

    </section>
</main>
</>);
};