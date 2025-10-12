import { TrackTitle } from "../../../../global/TrackTitle";

 const Likes = () => {
    const LikedCardsObject = Array.from({length: 10}, (_, i) =>({image: `https://picsum.photos/300/200?random=${i}`, type: "track", title: {header: `Track name ${i}`, subtitle:`track author ${i}`}})) 
  return (
    <>
       <section className=" w-full gap-y-[1.5rem] flex flex-col relative h-fit "> 
           
             <div className="grid grid-cols-6 h-fit w-full gap-y-[4rem] gap-x-[1.5rem]">
     
             {LikedCardsObject.map((item, index) => (
                 <TrackTitle key = {index} trackData={item}></TrackTitle>
             ))}
     
             </div>
         </section>
    </>
  );
};

export default Likes
