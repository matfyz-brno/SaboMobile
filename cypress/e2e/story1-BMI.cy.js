describe("Story 1 - BMI Calculator", () => {
  beforeEach(() => {
    cy.visit("/bmi#");
  });

  // --------------------------------------------------
  // TC-01
  // --------------------------------------------------
  describe("TC-01 – Default values are pre-filled", () => {
    it("calculates BMI using default values after clicking Calculate", () => {
      // verify default values
      cy.get("#age").should("have.value", "35");
      cy.get("#height").should("have.value", "190");
      cy.get("#weight").should("have.value", "70");
      cy.get("#gender").should("have.value", "Female");

      // Action
      cy.contains("button", "Calculate").click();

      // Expected result
      cy.contains("19.4 kg/m2").should("be.visible");
    });
  });

  // --------------------------------------------------
  // TC-02
  // --------------------------------------------------
  describe("TC-02 – Calculate BMI (all categories & boundary values)", () => {
    const testCases = [
      // Underweight
      { id: "TC-02a", height: 170, weight: 50.0, expected: "17.3" },
      { id: "TC-02b", height: 170, weight: 53.3, expected: "18.4" },

      // Normal weight
      { id: "TC-02c", height: 170, weight: 53.5, expected: "18.5" },
      { id: "TC-02d", height: 170, weight: 72.0, expected: "24.9" },

      // Overweight
      { id: "TC-02e", height: 170, weight: 72.3, expected: "25.0" },
      { id: "TC-02f", height: 170, weight: 78.0, expected: "27.0" },
      { id: "TC-02g", height: 170, weight: 86.4, expected: "29.9" },

      // Obesity
      { id: "TC-02h", height: 170, weight: 86.7, expected: "30.0" },
      { id: "TC-02i", height: 170, weight: 90.0, expected: "31.1" },
    ];

    testCases.forEach(({ id, height, weight, expected }) => {
      it(`${id}`, () => {
        //Validate specific input values
        cy.get("#height").clear().type(height.toString());
        cy.get("#weight").clear().type(weight.toString());

        // Action
        cy.contains("button", "Calculate").click();

        // Expected result
        cy.contains(expected).should("be.visible");
      });
    });
  });

  //--------------------------------------------------
  // TC-03
  //--------------------------------------------------
  describe("TC-03 – Correct Mathematical Rounding (BMI)", () => {
    const testCases = [
      //"Rounding down (<5)"
      {
        id: "TC-03a",
        height: 170,
        weight: 53.3,
        expected: "18.4 kg/m2",
      },

      //"Rounding at boundary (≥5)"
      {
        id: "TC-03b",
        height: 170,
        weight: 53.5,
        expected: "18.5 kg/m2",
      },

      //"Rounding up across category boundary"
      {
        id: "TC-03c",
        height: 170,
        weight: 72.3,
        expected: "25.0 kg/m2",
      },

      //"Control value (baseline)"
      {
        id: "TC-03d",
        height: 170,
        weight: 72.0,
        expected: "24.9 kg/m2",
      },
    ];

    testCases.forEach(({ id, height, weight, expected }) => {
      it(`${id}`, () => {
        // Verify rouding behavior
        cy.get("#height").clear().type(height);
        cy.get("#weight").clear().type(weight);

        // Action
        cy.contains("button", "Calculate").click();

        // Expected result
        cy.get("#BMI").should("be.visible").and("contain", expected);
      });
    });
  });

  //--------------------------------------------------
  // TC-06
  //--------------------------------------------------
  describe("TC-06 – Height equals zero", () => {
    beforeEach(() => {
      cy.get("#age").clear().type("30");
      cy.get("#weight").clear().type("70");
    });

    it("BMI is not calculated and validation error is displayed", () => {
      // Test data
      cy.get("#height").clear().type("0");

      // Action
      cy.contains("button", "Calculate").click();

      // Expected result:
      // Validation error is displayed
      cy.contains("Please provide all the necessary information!").should(
        "be.visible"
      );

      // BMI result should NOT be displayed
      cy.get("#BMI").should("not.be.visible");
    });
  });

  //--------------------------------------------------
  // TC-07
  //--------------------------------------------------

  describe("TC-07 – Weight equals zero", () => {
    beforeEach(() => {
      cy.get("#age").clear().type("30");
      cy.get("#height").clear().type("190");
    });

    it("BMI is not calculated and a validation error is displayed", () => {
      // Test data
      cy.get("#weight").clear().type("0");

      // Action
      cy.contains("button", "Calculate").click();

      // Expected result:
      cy.contains("Please provide all the necessary information!").should(
        "be.visible"
      );

      // BMI result is not displayed to the user
      cy.get("#BMI").should("not.be.visible");
    });
  });

  //--------------------------------------------------
  // TC-10
  //--------------------------------------------------

  describe("TC-10 – Extremely low value (Height)", () => {
    beforeEach(() => {
      cy.get("#age").clear().type("30");
      cy.get("#weight").clear().type("70");
    });

    it("BMI is not calculated and a validation error is displayed", () => {
      // Test data
      cy.get("#height").clear().type("4");

      // Action
      cy.contains("button", "Calculate").click();

      // Expected result:
      cy.contains("Please provide all the necessary information!").should(
        "be.visible"
      );

      // BMI result is not displayed to the user
      cy.get("#BMI").should("not.be.visible");
    });
  });

  //--------------------------------------------------
  // TC-11
  //--------------------------------------------------
  describe("TC-11 – Extremely low value (Weight)", () => {
    beforeEach(() => {
      cy.get("#age").clear().type("30");
      cy.get("#height").clear().type("190");
    });

    it("BMI is not calculated and a validation error is displayed", () => {
      // Test data
      cy.get("#weight").clear().type("5");

      // Action
      cy.contains("button", "Calculate").click();

      // Expected result:
      cy.contains("Please provide all the necessary information!").should(
        "be.visible"
      );

      // BMI result is not displayed to the user
      cy.get("#BMI").should("not.be.visible");
    });
  });
});
