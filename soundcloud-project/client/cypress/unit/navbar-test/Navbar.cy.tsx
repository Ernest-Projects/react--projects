import { Component } from "lucide-react";
import { Navbar } from "../../../src/components/navbar/Navbar";
import { LeftNavbarButtons } from "../../../src/components/navbar/navbar-components/navbar-buttons/LeftNavbarButtons";
import { RightNavbarButtons } from "../../../src/components/navbar/navbar-components/navbar-buttons/RightNavbarButtons";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import SoundCloud from "../../../src/components/SoundCloud";
import {
  storeWithGuest,
  storeWithUser,
} from "../fake-store/TestReduxStates";
import { Provider } from "react-redux";
import { navbarReducer } from "../../../src/redux/storages/navbarSlice";
import { store } from "../../../src/redux/storages/store";

describe("Navbar rendered", () => {
  beforeEach(() => {
    cy.mount(
      <MemoryRouter>
        <Provider store={store}>
          <Navbar />
        </Provider>
      </MemoryRouter>
    );
  });

  it("navbar BUTTON is CLICKABLE", () => {
  cy.contains('[data-cy="navbar-button"]', 'Home').click();
});


  it("RIGHT side does NOT exist when guest", () => {
    cy.get('[data-cy = "right-button-side"]').should("not.exist");
  });

 

  it("NAVBAR has required styles", () => {
    
    cy.get('[data-cy = "navbar"]').should("exist");
     cy.get('[data-cy = "navbar"]')
   .should("have.class", "h-[2.5rem]")
      .should("have.class", "w-[100%]");
  });

  describe("LEFT button side", () => {
    it("Left button sidebar exist", () => {
      cy.get('[data-cy = "left-button-side"]').should("exist");
    });

    it("BUTTON IMAGE exist", () => {
      cy.get('[data-cy = "button-image"]').should("exist").click();
    });
  });
});


describe("Navbar - USER LOGGED", () => {
  beforeEach(() => {
    cy.mount(
      <MemoryRouter>
        <Provider store={storeWithUser}>
          <Navbar />
        </Provider>
      </MemoryRouter>
    );
  });
 

  it("RIGHT side EXIST when user logged", () => {
    cy.get('[data-cy = "right-button-side"]').should("exist");
  });

  it("NAVBAR BUTTONS has required styles ", () => {
    cy.get('[data-cy="navbar-button"]').first().should("have.class", "w-min");
  });

   
  //  it("ACTIVE BUTTON required styles", () => {
  //   cy.get('[data-cy="navbar-button"]')
  //     .first()
  //     .should("have.class", "border-b-white");
  // });
});
