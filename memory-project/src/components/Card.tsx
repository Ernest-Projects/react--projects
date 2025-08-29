
type CardProps = {
    name: number
}
export const Card = ({name}: CardProps) => {
    return <>
        <div className={`border bg-red-500 active:scale(1.5) duration-100 transition aspect-[1.5/2] w-[50%]`}> {name}</div>
    </>
}