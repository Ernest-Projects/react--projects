


import { Provider } from "react-redux";
import { Player } from "../../../src/components/player/Player";



describe("Player RENDERED", () => {
    beforeEach(() => {
        cy.mount(<Player/>)
    });
    it ("PROGRESSBAR exist",() => {
        cy.get('[data-cy = "player-progressbar"]').should("exist");
    });
    it("STOP/PLAY button, VOLUME popup exist", () =>{
        cy.get('[data-cy = "player-volume"]').should("exist");
        cy.get('[data-cy = "player-play"]').should("exist");

    });

    it("CURRENT TRACK title exist", () =>{
        cy.get('[data-cy = "player-title"]').should("exist");

    })
})