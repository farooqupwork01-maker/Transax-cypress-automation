# Transax Cypress Automation

A comprehensive end-to-end test automation suite for the Transax application using Cypress.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Test Cases](#test-cases)
- [Configuration](#configuration)
- [Custom Commands](#custom-commands)
- [Best Practices](#best-practices)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Cypress (will be installed as a dependency)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Transax-cypress-automata
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy the example .env file
cp .env.example .env

# Edit .env file with your actual values
# Update BASE_URL, credentials, and other configuration
```

4. Open Cypress Test Runner:
```bash
npm run cy:open
```

## Project Structure

```
Transax-cypress-automata/
├── cypress/
│   ├── e2e/                    # Test specifications
│   │   ├── login.cy.js
│   │   ├── transactions.cy.js
│   │   ├── dashboard.cy.js
│   │   ├── profile.cy.js
│   │   └── settings.cy.js
│   ├── fixtures/               # Test data
│   │   ├── users.json
│   │   └── transactions.json
│   ├── support/                # Support files
│   │   ├── pages/              # Page Object Model classes
│   │   │   ├── LoginPage.js
│   │   │   ├── DashboardPage.js
│   │   │   ├── TransactionsPage.js
│   │   │   ├── ProfilePage.js
│   │   │   ├── SettingsPage.js
│   │   │   └── index.js
│   │   ├── commands.js         # Custom commands
│   │   └── e2e.js              # Support file
│   ├── screenshots/            # Screenshots on failure
│   ├── videos/                 # Test execution videos
│   └── downloads/              # Downloaded files
├── cypress.config.js           # Cypress configuration
├── .env                        # Environment variables (create from .env.example)
├── .env.example                # Example environment variables
├── package.json
└── README.md
```

## Running Tests

### Run all tests in headless mode:
```bash
npm test
```

### Run tests in headed mode:
```bash
npm run test:headed
```

### Run tests in specific browser:
```bash
npm run test:chrome
npm run test:firefox
npm run test:edge
```

### Open Cypress Test Runner (Interactive mode):
```bash
npm run cy:open
```

### Run specific test file:
```bash
npx cypress run --spec "cypress/e2e/login.cy.js"
```

## Test Cases

### 1. Login Tests (`login.cy.js`)
- Display login page elements
- Successful login with valid credentials
- Error handling for invalid credentials
- Form validation (empty fields)
- Session persistence
- Logout functionality

### 2. Transaction Tests (`transactions.cy.js`)
- Display transactions page
- Create new transaction
- Form validation
- Filter transactions by date range
- Search transactions
- View transaction details
- Cancel pending transactions
- Export transactions to CSV

### 3. Dashboard Tests (`dashboard.cy.js`)
- Display dashboard elements
- Account balance display
- Recent transactions list
- Navigation to transactions page
- Transaction statistics
- Refresh dashboard data
- Notifications
- Quick actions
- Chart display and filtering

### 4. Profile Tests (`profile.cy.js`)
- Display user profile information
- Update profile information
- Email validation
- Change password
- Password confirmation validation
- Upload profile picture
- Account settings
- Two-factor authentication

### 5. Settings Tests (`settings.cy.js`)
- Display settings page
- Update notification preferences
- Update security settings
- Update currency preferences
- API keys management
- Generate/delete API keys
- Export account data
- Device management

## Configuration

### Environment Variables (.env)

The project uses environment variables for configuration. Create a `.env` file from `.env.example`:

```bash
# Application Configuration
BASE_URL=https://transax.example.com

# Test User Credentials
VALID_USERNAME=testuser@example.com
VALID_PASSWORD=TestPassword123!
ADMIN_USERNAME=admin@example.com
ADMIN_PASSWORD=AdminPassword123!

# Test Configuration
DEFAULT_TIMEOUT=10000
VIEWPORT_WIDTH=1280
VIEWPORT_HEIGHT=720

# API Configuration
API_BASE_URL=https://api.transax.example.com
```

### Cypress Configuration

The Cypress configuration is located in `cypress.config.js`. Key settings are loaded from environment variables:

- **baseUrl**: Loaded from `BASE_URL` in `.env`
- **viewportWidth/Height**: Loaded from `VIEWPORT_WIDTH` and `VIEWPORT_HEIGHT` in `.env`
- **defaultCommandTimeout**: Loaded from `DEFAULT_TIMEOUT` in `.env`
- **video**: Enable/disable video recording
- **screenshotOnRunFailure**: Automatically capture screenshots on test failure

All configuration values can be overridden via environment variables in the `.env` file.

## Page Object Model (POM)

This project uses the Page Object Model pattern to improve test maintainability and reusability. Each page has its own class in `cypress/support/pages/`:

- **LoginPage** - Login page interactions and assertions
- **DashboardPage** - Dashboard page interactions and assertions
- **TransactionsPage** - Transactions page interactions and assertions
- **ProfilePage** - User profile page interactions and assertions
- **SettingsPage** - Settings page interactions and assertions

### Using Page Objects in Tests

```javascript
import { LoginPage } from '../support/pages'

describe('Login Tests', () => {
  const loginPage = new LoginPage()

  it('should login successfully', () => {
    loginPage.visit()
    loginPage.login('username', 'password')
    loginPage.verifySuccessfulLogin()
  })
})
```

## Custom Commands

The project includes custom Cypress commands in `cypress/support/commands.js`:

- `cy.login(username, password)` - Login with credentials (uses env vars if not provided)
- `cy.logout()` - Logout from the application
- `cy.waitForApiResponse(alias)` - Wait for API response
- `cy.selectDropdownOption(selector, optionText)` - Select dropdown option
- `cy.verifyTransactionStatus(status)` - Verify transaction status

## Best Practices

1. **Page Object Model**: All page interactions are encapsulated in page object classes
2. **Test Data Management**: Use fixtures for test data to keep tests maintainable
3. **Environment Variables**: Store sensitive data and configuration in `.env` file
4. **Custom Commands**: Reusable actions should be in custom commands
5. **Selectors**: Use `data-cy` attributes for stable selectors
6. **API Interception**: Use `cy.intercept()` to mock API calls when needed
7. **Test Isolation**: Each test should be independent and not rely on other tests
8. **Error Handling**: Always verify error messages and validation states

## Notes

- **Environment Variables**: Create a `.env` file from `.env.example` and update with your actual values
- **Base URL**: Update `BASE_URL` in `.env` file with your actual application URL
- **Credentials**: Update `VALID_USERNAME` and `VALID_PASSWORD` in `.env` with your test credentials
- **Test Data**: Update test data in `cypress/fixtures/` with your actual test data
- **Selectors**: Adjust selectors (`data-cy` attributes) in page objects based on your application's implementation
- **API Endpoints**: Some tests use API interception - ensure API endpoints match your application
- **Page Objects**: All page interactions are handled through page object classes for better maintainability

## Contributing

1. Create a feature branch
2. Write tests following the existing patterns
3. Ensure all tests pass
4. Submit a pull request

## License

ISC
