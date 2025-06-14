
import styles from './Main-card.module.scss'
import styled from 'styled-components'


    const FirstContainer = styled.div`
        width: 100%;  height:60%;
        display: grid; grid-template-columns: 35% 65%; 
    `;
    const YellowRectangle = styled.div`
    background: #FFCE00; 
    width: 70%; height: 70%;
    position:relative;
    
    padding: 0;
    >p {
    place-self: bottom;
        position:absolute;
        bottom: 0;
        margin: 0;
        padding: 0;
        font-size: 3rem;
        font-weight: 800
    }
    `
    const Header = styled.header`
    font-size: 1.5rem; font-weight: 600;
    white-space: nowrap; overflow:hidden; text-overflow: ellipsis;

    `
    const Subtext = styled.p`
    margin: 0 .5rem 0 1.5rem;
    white-space: nowrap; overflow:hidden; text-overflow: ellipsis;
    `


    const LineUnderHeader = styled.p `
        width: 100%; height: 1px;
        background: black;
    `

    const UnderSubText = styled.p`
        color: gray; 
        font-weight: 200; font-size: .6rem;
        margin-top: 1rem;
    `
    const CardNumber = styled.p`
    
        position: absolute; display:grid; place-items: center;
         bottom: 1.5rem; right: 1.5rem;
        width: 50px; aspect-ratio: 1/1;
        background: black; color: white;
        font-size: 1.5rem;
    `

    const TextContainer = styled.div`
    display: flex; flex-direction: column; 
    text-align: right; 
    `

    const SecondContainer = styled.div`
    position:absolute; top: 2rem; left: 2rem;
    width: 30px;  aspect-ratio: 1/ 1;
    border-top: 1px solid black; border-left: 1px solid black;
    background: #FFCE00
    `


const MainCard = () => {


    return (<>

        <section className={styles.container}>
            <CardNumber>01</CardNumber>

            <FirstContainer>
                <YellowRectangle> <p>Portfolio</p> </YellowRectangle>

                <TextContainer>
                    <Header>Ernest Popovych</Header>
                    <LineUnderHeader></LineUnderHeader>
                    <Subtext>Front-end develop</Subtext>
                    <UnderSubText>pisci enda  natus incidunt<br />rendis obca ecati quasi. Et.</UnderSubText>
                </TextContainer>
            </FirstContainer>

            <div className={styles.imageContainer}>
                <img src="/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.avif" alt="" />
            </div>


            <SecondContainer></SecondContainer>

        </section>

    </>

    )
}

export default MainCard