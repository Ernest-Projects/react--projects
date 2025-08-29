import { Cards } from "../cards"
import { Card } from "./Card"


// field for cards
export const Field = () => {


    return ( <>
     <section className= {`grid grid-cols-3 grid-rows-3 p-12 border w-[100%] h-[100%] absolute`}>
    {Object.values(Cards).map((el, index) => {
        return <Card key = {index} name = {el.id}></Card>
    })}
     </section>
    </>)
}