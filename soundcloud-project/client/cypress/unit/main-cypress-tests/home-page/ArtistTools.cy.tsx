/// <reference types="cypress" />
import { ArtistTools } from "../../../../src/pages/home/right sections/ArtistTools";

describe(" window", () => {
  it("Artirs tools open and closed successfuly ", () => {
    // cy.mount(<div>Hello</div>)
    cy.mount(<ArtistTools />);
    cy.get('[data-cy = "artist-tools-button"]').click();
    // cy.mount(<div>Helo</div>);
  });

  it("Artits tools exists", () => {
    cy.mount(<ArtistTools/>);
        cy.get('[data-cy="artist-tools"]').should('not.exist')

  });
 
});
 