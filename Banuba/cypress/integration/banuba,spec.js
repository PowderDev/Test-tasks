/// <reference types="cypress" />

describe("Checking that everything is fine ", () => {
  before(() => {
    cy.visit("http://localhost:3000");
    // Webcam needs time to load
    cy.get("main").click().wait(1000);
  });

  it("Video from my webcam should appear after a click on main element", () => {
    cy.get("main").children("div").children("video").should("exist");
  });

  it("All 6 video effects should appear after a click on main element", () => {
    cy.get("#effects").children().should("have.length", 6);
  });

  it("Text on mute button should change after a click", () => {
    // Agora needs time to initialize
    cy.wait(1000);
    cy.get("#sound").click().should("have.text", "Unmute me");
    cy.get("#sound").click().should("have.text", "Mute me");
  });
});
