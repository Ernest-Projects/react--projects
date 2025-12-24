import { Library } from "../../../src/pages/library/library-main/Library";
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

describe("LIBRARY rendered", () => {
  beforeEach(() => {
    cy.mount(
      <MemoryRouter>
          <Library />
      </MemoryRouter>
    );
  });

  it("OVERVIEW section", () => {
    cy.get('[data-cy = "library-page-button"][data-index = "0"]').click();
    cy.wait(500)
  })



  it("LIKES section", () => {
    cy.get('[data-cy = "library-page-button"][data-index = "1"]').click();
    cy.wait(500)

  });


  it("PLAYLISTS section", () => {
    cy.get('[data-cy = "library-page-button"][data-index = "2"]').click();
    cy.wait(500);

  });


  it("ALBUMS section", () => {
    cy.get('[data-cy = "library-page-button"][data-index = "3"]').click();
    cy.wait(500);

  });


  it("STATIONS section", () => {
    cy.get('[data-cy = "library-page-button"][data-index = "4"]').click();
    cy.wait(500);

  });


  it("FOLLOWING section", () => {
    cy.get('[data-cy = "library-page-button"][data-index = "5"]').click();
    cy.wait(500);

  });

  it("HISTORY section", () => {
    cy.get('[data-cy = "library-page-button"][data-index = "6"]').click();
    cy.wait(500);

  })

  });