


import styles from './Second-card.module.scss'
import type {ISecondCard} from '../../../../types' 
import styled from 'styled-components'



const SecondCard = ({ name,content,componentStyle,index}: ISecondCard) => {

    const Numeration = styled.p`
    
    background: black;
    width: 20px;
    aspect-ratio: 1/1;
    position: absolute;
    top: 1.5rem; right: 1.5rem;
    display: grid; place-items: center;
    color: white; font-size: .8rem
        opacity: 1;
    &:hover {
    opacity:1}
    `;

    const formetterNumber = (index + 2).toString().padStart(2, "0");


    return (
        <>
        <main  className= {`${styles.cardContainer} ${componentStyle ? styles[componentStyle] : ''}`}>
        <header style  ={{zIndex: "1000"}}>{name}</header>

            
             <Numeration >{formetterNumber}</Numeration>
            {content}
        </main>
        </>
    )
}

export default SecondCard;