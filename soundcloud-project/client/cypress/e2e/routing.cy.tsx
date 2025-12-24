describe("Routing", () => {
  it("home page", () => {
    cy.visit("/discover");
    cy.contains("Recently played").should("exist");
          cy.wait(500);

  });
  it("navigates to Feed page", () => {
    cy.visit("/feed");
    cy.contains(
      "Hear the latest posts from the people you’re following:"
    ).should("exist");
          cy.wait(500);

  });
  it("navigates to Feed page", () => {
    cy.visit("/feed");
    cy.contains(
      "Hear the latest posts from the people you’re following:"
    ).should("exist");
          cy.wait(500);

  });
  it("go to Copyright page", () => {
   cy.visit("/copyright");
   cy.get('[data-cy = "copyright"]').should("exist");
         cy.wait(500);

 });

  it("go to 'Library' page", () => {
    cy.visit("/you/library");
    cy.contains("Overview").should("exist");
          cy.wait(500);

  });
  describe("LIBRARY PAGE", () => {
    it("opens Library overview page", () => {
      cy.visit("/you/library");
      cy.get('[data-cy = "overview"]').should("exist");
      cy.wait(500);
    });
    it("opens Library likes page", () => {
      cy.visit("/you/likes");
      cy.get('[data-cy = "likes"]').should("exist");
      cy.wait(500);
    });
     it("opens Library playlists page", () => {
      cy.visit("/you/sets");
      cy.get('[data-cy = "playlists"]').should("exist");
      cy.wait(500);

    });
      it("opens Library albums page", () => {
      cy.visit("/you/albums");
      cy.get('[data-cy = "albums"]').should("exist");
      cy.wait(500);

    });
      it("opens Library stations page", () => {
      cy.visit("/you/stations");
      cy.get('[data-cy = "stations"]').should("exist");
      cy.wait(500);

    });
      it("opens Library following page", () => {
      cy.visit("/you/following");
      cy.get('[data-cy = "following"]').should("exist");
      cy.wait(500);

    });
     it("opens Library history page", () => {
      cy.visit("/you/history");
      cy.get('[data-cy = "history"]').should("exist");
      cy.wait(500);

    });
  });
    it("opens sign out page", () => {
      cy.visit("/logout");
      cy.get('[data-cy = "sign-out-window"]').should("exist");
      cy.wait(500);

    });
});
