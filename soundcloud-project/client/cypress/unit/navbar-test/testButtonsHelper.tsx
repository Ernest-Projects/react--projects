import { MemoryRouter } from "react-router-dom";


export const testNavbarButtons = (Component: React.FC) => {
    cy.mount(
    <MemoryRouter>
        <Component/>
        </MemoryRouter>
        );
    cy.get('[data-cy = "navbar-button"]').should("exist");
}