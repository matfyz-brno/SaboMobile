describe("Story 2 – Calculate Body Fat", () => {
  // --------------------------------------------------
  // TC-22 – Age equals zero
  // --------------------------------------------------
  describe("TC-22 – Age equals zero", () => {
    beforeEach(() => {
      cy.visit("/bmi");
      cy.get("#height").clear().type("170");
      cy.get("#weight").clear().type("70");
      cy.get("#gender").select("Female");
    });

    it("Body Fat is not calculated and validation error is displayed", () => {
      cy.get("#age").clear().type("0");

      cy.contains("button", "Calculate").click();

      // Validation error is displayed
      cy.contains("Please provide all the necessary information!").should(
        "be.visible"
      );

      // Body Fat result is not displayed
      cy.get("#bfat").should("not.be.visible");
    });
  });

  // --------------------------------------------------
  // TC-24 – Extremely low value (Age)
  // --------------------------------------------------
  describe("TC-24 – Extremely low value (Age)", () => {
    beforeEach(() => {
      cy.visit("/bmi");
      cy.get("#height").clear().type("170");
      cy.get("#weight").clear().type("70");
      cy.get("#gender").select("Female");
    });

    it("Body Fat is not calculated and validation error is displayed", () => {
      cy.get("#age").clear().type("1");

      cy.contains("button", "Calculate").click();

      // Validation error is displayed
      cy.contains("Please provide all the necessary information!").should(
        "be.visible"
      );

      // Body Fat result is not displayed
      cy.get("#bfat").should("not.be.visible");
    });
  });

  // --------------------------------------------------
  // TC-26 – Body Fat calculation – Female
  // --------------------------------------------------
  describe("TC-26 – Body Fat calculation – Female", () => {
    beforeEach(() => {
      cy.visit("/bmi");
      cy.get("#age").clear().type("30");
      cy.get("#height").clear().type("170");
      cy.get("#weight").clear().type("70");
      cy.get("#gender").select("Female");
    });

    it("Body Fat is calculated and displayed for Female", () => {
      cy.contains("button", "Calculate").click();

      // Body Fat result is displayed
      cy.get("#bfat")
        .should("be.visible")
        .invoke("text")
        .should("match", /Your Body Fat is \d+\.\d/); // one decimal place
    });
  });

  // --------------------------------------------------
  // TC-27 – Body Fat calculation – Male
  // --------------------------------------------------
  describe("TC-27 – Body Fat calculation – Male", () => {
    beforeEach(() => {
      cy.visit("/bmi");
      cy.get("#age").clear().type("30");
      cy.get("#height").clear().type("170");
      cy.get("#weight").clear().type("70");
      cy.get("#gender").select("Male");
    });

    it("Body Fat is calculated and displayed for Male", () => {
      cy.contains("button", "Calculate").click();

      // Body Fat result is displayed
      cy.get("#bfat")
        .should("be.visible")
        .invoke("text")
        .should("match", /Your Body Fat is \d+\.\d/); // one decimal place
    });
  });
});
