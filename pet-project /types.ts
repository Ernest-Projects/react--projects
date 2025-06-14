

import type { ReactNode } from "react"


type ComponentStyle =  "fifthCard" | "secondCard" | "thirdCard" | "fourthCard";

export interface ISecondCard {
    name: ReactNode,
    content: ReactNode,
    componentStyle: ComponentStyle,
    index: number,
}