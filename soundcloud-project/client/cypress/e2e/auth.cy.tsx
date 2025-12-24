describe("REGISTRATION", () => {
  it("user completes registration flow", () => {

        cy.intercept("POST", "/api/users/add/local").as("register");

    cy.visit("/discover");

    // l
    cy.get('[data-cy="navbar-sign-in-button"]')
      .should("be.visible")
      .click();

    // 
    cy.get('[data-cy="registration-email"]')
      .should("be.visible")
      .type("cypress3@mail.com");

    cy.get('[data-cy="registration-continue-button"]')
      .should("be.enabled")
      .click();

    //
    cy.get('[data-cy="registration-password"]')
      .should("be.visible").
      type("123");
      cy.wait(500);


    cy.get('[data-cy="registration-continue-button"]').click();

// 
    cy.get('[data-cy="registration-password"]')
      .clear()
      .type("pomelloWith123");
      cy.wait(500);

    cy.get('[data-cy="registration-continue-button"]').click();

    //
    cy.get('[data-cy="registration-display-name"]').eq(0).type("erni_cypress_3");
    cy.get('[data-cy="registration-age"]').eq(0).type("18");
    cy.get('[data-cy="registration-gender"]').eq(0).type("male");

    cy.get('[data-cy="registration-continue-button"]').click();
      cy.wait(500);
     

// 

cy.wait("@register").its("response.statusCode").should("eq", 200);

  });
});

