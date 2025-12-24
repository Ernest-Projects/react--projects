/// <reference types="cypress" />

import { Registration } from "../../../src/services/authorization/Registration";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import {
  storeWithOpenedRegistrationWithId1,
  storeWithOpenedRegistrationWithId2,
  storeWithOpenedRegistrationWithId3,
  storeWithOpenedRegistrationWithId4,
} from "../fake-store/TestReduxStates";
import { Navbar } from  "../../../src/components/navbar/Navbar";

describe("Registration window INITIALIZATION (component)", () => {
  beforeEach(() => {
    cy.mount(
      <MemoryRouter>
        <Provider store={storeWithOpenedRegistrationWithId1}>
          <Registration />
        </Provider>
      </MemoryRouter>
    );
  });

  it("renders registration container", () => {
    cy.get('[ data-cy = "registration-window-container"]').should("exist");
  });

  it("renders registration overlay", () => {
    cy.get('[ data-cy = "registration-window-overlay"]').should("exist");
  });

  it("shows main registration window by default", () => {
    cy.get('[data-cy="main-registration-window"]').should("exist");
  });

  it("contains SignInComponent", () => {
    cy.get('[data-cy="sign-in-component"]').should("exist");
  });
});

describe("FILL INPUT fields", () => {
  it("SET email", () => {
    cy.get('input[type="text"]').first().type("test@mail.com");
    cy.pause();
  });

  beforeEach(() => {
    cy.mount(
      <MemoryRouter>
        <Provider store={storeWithOpenedRegistrationWithId2}>
          <Registration />
        </Provider>
      </MemoryRouter>
    );
  });
});

describe("FILL INPUT fields", () => {
  beforeEach(() => {
    cy.mount(
      <MemoryRouter>
        <Provider store={storeWithOpenedRegistrationWithId3}>
          <Registration />
        </Provider>
      </MemoryRouter>
    );
  });

  it("SET password", () => {
    cy.get('[data-cy = "registration-input"]').first().type("pomelloWith123");
    cy.pause();
  });
});

describe("FILL INPUT fields", () => {
  beforeEach(() => {
    cy.mount(
      <MemoryRouter>
        <Provider store={storeWithOpenedRegistrationWithId4}>
          <Registration />
        </Provider>
      </MemoryRouter>
    );
  });

  it("SET DISPLAY NAME", () => {
    cy.get('[data-cy = "registration-input"]').eq(0).type("erni_chudli5621");
    cy.pause();
  });

  it("SET VALID AND INVALID AGE", () => {
    cy.get('[data-cy = "registration-input"]').eq(1).type("12");
    
    cy.pause();
      cy.get('[data-cy = "registration-continue-button"]')
        .contains("Continue")
        .click();

        cy.pause();
         cy.get('[data-cy = "registration-input"]').eq(1).type("{selectall}{backspace}");


       cy.get('[data-cy = "registration-input"]').eq(1).type("18");
      cy.pause();

       cy.get('[data-cy = "registration-continue-button"]')
        .contains("Continue")
        .click();
  });


  describe("CLOSE WINDOW", () => {
    it("closes registration window WHEN X is CLICKED", () => {
      cy.get('[data-cy="close-registration-button"]')
        .should("not.be.disabled")
        .click();
    });
  });
});
