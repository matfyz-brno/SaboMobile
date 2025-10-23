// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Hide fetch/XHR requests from command log to reduce noise
const app = window.top;
if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style');
  style.innerHTML = '.command-name-request, .command-name-xhr { display: none }';
  style.setAttribute('data-hide-command-log-request', '');
  app.document.head.appendChild(style);
}

// Global configuration
Cypress.on('uncaught:exception', (err, runnable) => {
  // Returning false here prevents Cypress from failing the test on uncaught exceptions
  // This is useful for third-party scripts that might throw errors
  if (err.message.includes('Script error') || 
      err.message.includes('Non-Error promise rejection') ||
      err.message.includes('ResizeObserver loop limit exceeded')) {
    return false
  }
  // Let other errors fail the test
  return true
})

// Add global before hook for consistent setup
beforeEach(() => {
  // Set up ad blocking for every test
  cy.setupAdBlocking()
  
  // Set up viewport
  cy.viewport(1280, 720)
  
  // Clear cookies and local storage
  cy.clearCookies()
  cy.clearLocalStorage()
})