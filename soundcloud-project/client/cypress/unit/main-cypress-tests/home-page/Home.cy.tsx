/// <reference types="cypress" />
import { Home } from "../../../../src/pages/home/Home";

import { storeWithUser } from "../../fake-store/TestReduxStates";
import { storeWithGuest } from "../../fake-store/TestReduxStates";

describe(" window", () => {
  it("Home page has been successfuly rendered", () => {
    // cy.mount(<div>Hello</div>)
    cy.mount(<Home />);
    // cy.mount(<div>Helo</div>);
  });

  it("Test button 'logout' pressed", () => {
    cy.mount(<Home></Home>);
    cy.get('[data-cy = "logout-test-button" ]').click();
  });
    it('does NOT show ArtistTools when user is not logged in', () => {
    cy.mount(<Home />)

    cy.get('[data-cy="artist-tools"]').should('not.exist')
  })
});
