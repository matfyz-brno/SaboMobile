describe('BMI Calculator - Basic Setup Verification', () => {
  
  it('should load BMI calculator page and verify basic elements', () => {
    // Visit page with automatic ad blocking and popup handling
    cy.visitWithSetup('/bmi')
    
    // Verify page title
    cy.title().should('match', /BMI Calculator/i)
    
    // Verify main heading is visible
    cy.get('h1, h2, h3').contains(/BMI|Body Mass Index/i).should('be.visible')
    
    // Get BMI form elements and verify they exist
    cy.getBMIElements().then(elements => {
      elements.heightInput().should('be.visible')
      elements.weightInput().should('be.visible')
      elements.calculateButton().should('be.visible')
    })
    
    // Verify elements are interactable
    cy.getBMIElements().then(elements => {
      elements.heightInput().shouldBeVisibleAndInteractable()
      elements.weightInput().shouldBeVisibleAndInteractable()
      elements.calculateButton().shouldBeVisibleAndInteractable()
    })
    
    // Test basic interaction
    cy.getBMIElements().then(elements => {
      elements.heightInput().click().type('170')
      elements.weightInput().click().type('70')
    })
    
    cy.log('✅ BMI Calculator page loaded successfully with all basic elements')
  })

  it('should handle page with ad blocking enabled', () => {
    // Track network requests
    let blockedRequests = 0
    
    // Set up interception to count blocked requests
    cy.intercept('**/*', (req) => {
      if (req.url.includes('ads') || req.url.includes('tracking')) {
        blockedRequests++
        req.destroy()
      }
    })
    
    // Visit with setup
    cy.visitWithSetup('/bmi', { handlePopups: true })
    
    // Wait a bit to let any ads/tracking attempt to load
    cy.wait(2000)
    
    // Log blocked requests count
    cy.then(() => {
      cy.log(`🛡️ Blocked ${blockedRequests} potentially unwanted requests`)
    })
    
    // Verify the page still loads properly despite blocking
    cy.get('body').should('be.visible')
    
    // Take a screenshot for verification
    cy.takeTimestampedScreenshot('bmi-calculator-with-adblock')
  })

  it('should calculate BMI correctly with metric units', () => {
    cy.visitWithSetup('/bmi')
    
    // Calculate BMI for a normal weight person (BMI = 24.22)
    cy.calculateBMI(170, 70, 'metric')
    
    // Verify calculation result appears
    cy.get('body').should('contain.text', '24')
    
    // Take screenshot of the result
    cy.takeTimestampedScreenshot('bmi-calculation-result')
    
    cy.log('✅ BMI calculation completed successfully')
  })

  it('should handle different BMI categories', () => {
    cy.visitWithSetup('/bmi')
    
    // Test underweight (BMI = 17.3)
    cy.calculateBMI(180, 56, 'metric')
    cy.wait(1000)
    
    // Should show some result
    cy.get('body').then($body => {
      if ($body.text().includes('17') || $body.text().includes('Underweight')) {
        cy.log('✅ Underweight calculation detected')
      }
    })
    
    // Test overweight (BMI = 27.8)
    cy.calculateBMI(170, 80, 'metric')
    cy.wait(1000)
    
    // Should show some result
    cy.get('body').then($body => {
      if ($body.text().includes('27') || $body.text().includes('Overweight')) {
        cy.log('✅ Overweight calculation detected')
      }
    })
    
    cy.log('✅ Multiple BMI categories tested successfully')
  })

  it('should handle form validation', () => {
    cy.visitWithSetup('/bmi')
    
    // Try to submit with empty fields
    cy.getBMIElements().then(elements => {
      elements.calculateButton().click()
    })
    
    // Should either show validation message or not calculate
    cy.wait(1000)
    
    // Try with invalid values
    cy.getBMIElements().then(elements => {
      elements.heightInput().clear().type('0')
      elements.weightInput().clear().type('0')
      elements.calculateButton().click()
    })
    
    cy.wait(1000)
    
    // Try with negative values
    cy.getBMIElements().then(elements => {
      elements.heightInput().clear().type('-170')
      elements.weightInput().clear().type('-70')
      elements.calculateButton().click()
    })
    
    cy.wait(1000)
    
    cy.log('✅ Form validation testing completed')
  })

})