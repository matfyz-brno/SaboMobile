# BMI Calculator – Automation Assignment

This repository contains the specification and user stories for a demo BMI Calculator web app used in QA automation interviews.

## Objective
Implement automated tests verifying that the application behaves according to the stories in [`user-stories.md`](./user-stories.md).

Target app: [https://practice.expandtesting.com/bmi](https://practice.expandtesting.com/bmi)

Use any test framework you want.

Focus on correctness, code structure, and clarity.

### Deliverables
1. Test code and helper modules.
2. `README.md` in your fork explaining setup and how to run tests.
3. HTML test report and at least one failure screenshot.

---

## Cypress + JavaScript Setup

This branch provides a comprehensive Cypress setup with JavaScript for testing the BMI Calculator application.

### Features
- ✅ **Multi-browser testing**: Chrome, Firefox, Edge support
- ✅ **Advanced ad blocking**: Custom intercepts to prevent ads and tracking
- ✅ **Rich custom commands**: Simplified BMI testing with reusable commands
- ✅ **Visual testing**: Screenshots and videos on failures
- ✅ **Test data management**: JSON fixtures for test data
- ✅ **Interactive debugging**: Cypress Test Runner with time-travel debugging
- ✅ **CI/CD ready**: Configured for headless execution and reporting

### Prerequisites
- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/zuzupd/test-assignment.git
   cd test-assignment
   git checkout cypress+js
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify Cypress installation**
   ```bash
   npm run cy:verify
   ```

4. **Run tests**
   ```bash
   # Run all tests headless
   npm test
   
   # Run tests with browser visible
   npm run test:headed
   
   # Run tests in specific browser
   npm run test:chrome
   npm run test:firefox
   
   # Open Cypress Test Runner (interactive mode)
   npm run cy:open
   ```

### Project Structure

```
├── cypress/
│   ├── e2e/
│   │   └── bmi-calculator.cy.js    # BMI calculator test suite
│   ├── fixtures/
│   │   └── bmi-test-data.json      # Test data for various scenarios
│   ├── screenshots/                # Auto-generated screenshots on failures
│   ├── videos/                     # Auto-generated videos of test runs
│   └── support/
│       ├── commands.js             # Custom Cypress commands
│       └── e2e.js                  # Global configuration and hooks
├── cypress.config.js               # Cypress configuration
├── package.json                    # Dependencies and scripts
└── .gitignore                      # Excludes node_modules and generated files
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests in headless mode |
| `npm run test:headed` | Run tests with browser UI visible |
| `npm run test:chrome` | Run tests in Chrome browser |
| `npm run test:firefox` | Run tests in Firefox browser |
| `npm run cy:open` | Open Cypress Test Runner (interactive) |
| `npm run cy:run` | Run tests in headless mode |
| `npm run cy:verify` | Verify Cypress installation |

### Custom Commands

This setup includes powerful custom commands to simplify testing:

```javascript
// Visit page with automatic setup
cy.visitWithSetup('/bmi')

// Calculate BMI with the form
cy.calculateBMI(170, 70, 'metric')

// Get BMI form elements
cy.getBMIElements().then(elements => {
  elements.heightInput().type('170')
  elements.weightInput().type('70')
  elements.calculateButton().click()
})

// Enhanced visibility checks
cy.get('button').shouldBeVisibleAndInteractable()

// Take timestamped screenshots
cy.takeTimestampedScreenshot('test-result')

// Handle popups and ads automatically
cy.handlePopups()
cy.setupAdBlocking()
```

### Test Features

**Ad Blocking & Stability:**
- Automatically blocks 30+ known ad and tracking domains
- Intercepts and blocks requests containing ad-related keywords
- Handles common popups and modals automatically
- Waits for page stability before proceeding with tests

**BMI Testing Utilities:**
- Flexible form element detection (works with various form structures)
- Support for both metric and imperial units
- Built-in BMI calculation validation
- Test data fixtures for comprehensive scenarios

**Visual Testing:**
- Automatic screenshots on test failures
- Video recording of entire test runs
- Timestamped screenshots for debugging
- Full-page capture capability

### Writing Tests

Tests are written in JavaScript with Cypress's intuitive API:

```javascript
describe('BMI Calculator Tests', () => {
  it('should calculate BMI correctly', () => {
    // Visit page with automatic ad blocking
    cy.visitWithSetup('/bmi')
    
    // Calculate BMI using custom command
    cy.calculateBMI(170, 70, 'metric')
    
    // Verify result
    cy.get('body').should('contain.text', '24')
  })
})
```

### Test Data Management

Use fixtures for data-driven testing:

```javascript
cy.fixture('bmi-test-data').then(data => {
  data.testData.validBMITests.forEach(testCase => {
    cy.calculateBMI(testCase.height, testCase.weight, testCase.unit)
    // Verify expected BMI
  })
})
```

### Configuration Highlights

- **Timeouts**: Optimized for slow networks and heavy pages
- **Retries**: Automatic retry on failures (2 retries in CI mode)
- **Video Compression**: Balanced quality and file size
- **Chrome Security**: Disabled for testing flexibility  
- **Network Handling**: Smart request interception and blocking
- **Error Handling**: Graceful handling of third-party script errors

### Debugging

**Interactive Mode:**
```bash
npm run cy:open
```
- Time-travel debugging
- Live test editing
- Element selector playground
- Network request inspection

**CI Mode Debugging:**
- Automatic screenshots on failures
- Video recordings of test runs
- Detailed command logs
- Network request logs

### Continuous Integration

The configuration is optimized for CI environments:
- Headless execution by default
- Automatic retries on failures
- Video and screenshot artifacts
- JUnit XML reporting (can be added)
- Parallel execution support

### Best Practices Included

- **Page Object Pattern**: Encapsulated in custom commands
- **Test Isolation**: Each test starts with clean state
- **Error Resilience**: Graceful handling of page errors
- **Performance**: Minimal network overhead with ad blocking
- **Maintainability**: Reusable commands and fixtures

### Getting Help

- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Custom Commands Guide](https://docs.cypress.io/api/cypress-api/custom-commands)
