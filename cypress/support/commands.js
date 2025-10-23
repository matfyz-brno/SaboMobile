// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/**
 * Custom command to set up ad blocking and tracking prevention
 */
Cypress.Commands.add('setupAdBlocking', () => {
  // Intercept and block known ad and tracking domains
  const blockedDomains = [
    '**/googlesyndication.com/**',
    '**/googletagmanager.com/**',
    '**/google-analytics.com/**',
    '**/googleadservices.com/**',
    '**/doubleclick.net/**',
    '**/adsystem.com/**',
    '**/ads.yahoo.com/**',
    '**/facebook.com/tr**',
    '**/connect.facebook.net/**',
    '**/outbrain.com/**',
    '**/taboola.com/**',
    '**/amazon-adsystem.com/**',
    '**/media.net/**',
    '**/criteo.com/**',
    '**/adsafeprotected.com/**',
    '**/scorecardresearch.com/**',
    '**/comscore.com/**',
    '**/quantserve.com/**',
    '**/rlcdn.com/**',
    '**/rubiconproject.com/**',
    '**/pubmatic.com/**',
    '**/openx.com/**',
    '**/contextweb.com/**',
    '**/advertising.com/**',
    '**/adsnx.com/**',
    '**/exponential.com/**',
    '**/smartadserver.com/**',
    '**/yieldmo.com/**',
    '**/sharethrough.com/**',
    '**/sonobi.com/**',
    '**/spotxchange.com/**',
    '**/springserve.com/**',
    '**/telaria.com/**',
    '**/undertone.com/**'
  ]

  // Block all the domains
  blockedDomains.forEach(domain => {
    cy.intercept(domain, { forceNetworkError: true })
  })

  // Block requests that contain common ad-related keywords
  cy.intercept('**/*', (req) => {
    const url = req.url.toLowerCase()
    const adKeywords = ['ads', 'tracking', 'analytics', 'doubleclick', 'googlesyndication']
    
    if (adKeywords.some(keyword => url.includes(keyword))) {
      req.destroy()
    }
  })
})

/**
 * Custom command to wait for page stability
 */
Cypress.Commands.add('waitForStablePage', (options = {}) => {
  const { timeout = 10000, interval = 1000 } = options
  
  // Wait for network to be idle
  cy.intercept('**/*').as('allRequests')
  
  // Wait for DOM to be ready
  cy.get('body').should('be.visible')
  
  // Additional wait for stability
  cy.wait(interval)
})

/**
 * Custom command to handle common popups and modals
 */
Cypress.Commands.add('handlePopups', () => {
  // Common popup selectors to close
  const popupSelectors = [
    '[data-testid="close-button"]',
    '[data-testid="modal-close"]',
    '.modal-close',
    '.popup-close', 
    '.close-btn',
    '[aria-label="Close"]',
    '[aria-label="close"]',
    'button[title="Close"]',
    '.cookie-banner button',
    '#cookie-accept',
    '.gdpr-accept',
    '.newsletter-popup .close'
  ]

  // Try to close any visible popups
  popupSelectors.forEach(selector => {
    cy.get('body').then($body => {
      if ($body.find(selector).length > 0) {
        cy.get(selector).then($el => {
          if ($el.is(':visible')) {
            cy.get(selector).click({ force: true })
            cy.wait(500) // Brief wait after closing
          }
        })
      }
    })
  })
})

/**
 * Custom command for complete page setup with ad blocking and popup handling
 */
Cypress.Commands.add('visitWithSetup', (url, options = {}) => {
  const { handlePopups = true, waitForStability = true } = options
  
  // Visit the page
  cy.visit(url)
  
  // Wait for page to stabilize if requested
  if (waitForStability) {
    cy.waitForStablePage()
  }
  
  // Handle popups if requested
  if (handlePopups) {
    cy.handlePopups()
  }
  
  // Final stability wait
  cy.wait(1000)
})

/**
 * Custom command to find BMI form elements with flexible selectors
 */
Cypress.Commands.add('getBMIElements', () => {
  return {
    heightInput: () => cy.get('input[name*="height" i], input[id*="height" i], input[placeholder*="height" i]').first(),
    weightInput: () => cy.get('input[name*="weight" i], input[id*="weight" i], input[placeholder*="weight" i]').first(),
    calculateButton: () => cy.get('button, input[type="submit"]').contains(/calculate|compute|submit/i).first(),
    result: () => cy.get('[class*="result" i], [id*="result" i], [data-testid*="result" i]').first()
  }
})

/**
 * Custom command to calculate BMI with the form
 */
Cypress.Commands.add('calculateBMI', (height, weight, unit = 'metric') => {
  cy.getBMIElements().then(elements => {
    // Clear and fill height
    elements.heightInput().clear().type(height.toString())
    
    // Clear and fill weight  
    elements.weightInput().clear().type(weight.toString())
    
    // Select unit if available
    cy.get('body').then($body => {
      if ($body.find('select, input[type="radio"]').length > 0) {
        // Handle unit selection if present
        if (unit === 'imperial') {
          cy.get('input[type="radio"][value*="imperial" i], input[type="radio"][value*="us" i]')
            .first().check({ force: true })
        } else {
          cy.get('input[type="radio"][value*="metric" i], input[type="radio"][value*="si" i]')
            .first().check({ force: true })
        }
      }
    })
    
    // Click calculate button
    elements.calculateButton().click()
    
    // Wait for result
    cy.waitForStablePage({ timeout: 5000 })
  })
})

/**
 * Custom command for enhanced element visibility check
 */
Cypress.Commands.add('shouldBeVisibleAndInteractable', { prevSubject: true }, (subject) => {
  cy.wrap(subject)
    .should('be.visible')
    .should('not.be.disabled')
    .should('not.have.css', 'pointer-events', 'none')
})

/**
 * Custom command to take a full page screenshot with timestamp
 */
Cypress.Commands.add('takeTimestampedScreenshot', (name) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  cy.screenshot(`${name}-${timestamp}`, { 
    capture: 'fullPage',
    overwrite: true 
  })
})