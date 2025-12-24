

import { Provider } from "react-redux";
import SoundCloud from "../../src/components/SoundCloud";
import { MemoryRouter, RouterProvider } from "react-router-dom";

import {router} from "../../src/router/router";

describe("Project ROOT rendered successfuly", () => {
    it ("Main component rendered", ()=> {
        cy.viewport(1920, 1080)
         cy.mount(<MemoryRouter initialEntries = {["/discover"]}><SoundCloud></SoundCloud></MemoryRouter>)
                  // cy.mount(<RouterProvider router = {router}/>)

    });

      beforeEach(() => {
                          // cy.mount(<RouterProvider router = {router}/>)

    cy.mount(<MemoryRouter initialEntries = {["/discover"]}><SoundCloud></SoundCloud></MemoryRouter>).should("exist");
  })

  describe("Pages exist", () => {

    it("HOME PAGE button clicked", () => {
      cy.get('[data-cy = "navbar-button"][data-index = "0"]').click();
    });

     it("FEED PAGE button clicked", () => {
      cy.get('[data-cy = "navbar-button"][data-index = "1"]').click();
    });
    it("LIBRARY PAGE button clicked", () => {
      cy.get('[data-cy = "navbar-button"][data-index = "2"]').click();
    });
 
  })


  describe("POPUP pages exist", () => {

  
    it ("LAST POPUP opened", () => {
          cy.get('[data-cy= "navbar-last-popup-button"]').click();

    });
    it ("COPYRIHGT button CLICKED", () => {
          cy.get('[data-cy= "navbar-popup-button"][data-index= "2"]').click();

    })
   
    // it("COPYRIGHT page exist" )
  })


  it("Navbar component exist", () => {
    cy.get('[data-cy= "navbar"]').should('exist')
  });

  it("Player component exist", () => {
    cy.get('[data-cy= "player"]').should('exist');

  })
})