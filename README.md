# Swagger Petstore + Sauce Demo Test Automation

BDD test automation framework using Playwright-TypeScript-Cucumber. Tests both API (Petstore) and UI (Sauce Demo) with comprehensive allure and html reporting.

## Prerequisites
- Node.js 20+
- npm

# Clone the repository
git clone <your-repo-url>
cd sqe-playwright-typescript

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium --with-deps

# Set up environment variables
cp .env.example .env
# Edit .env if needed

# Run all tests
npm test

# Allure Report (interactive)
npm run test:report  # Runs tests + generates + opens Allure report

# HTML Report
npm run report:html

# Run specific test suites
npm run test:api      # API tests only (@api)
npm run test:ui       # UI tests only (@ui)
npm run test:smoke    # Smoke tests (@smoke)

# Run with debug mode
npm run test:debug

# Clean and run
npm run clean && npm test

# Project Structure
src/
├── features/     # Gherkin feature files (API/UI)
├── steps/        # Step definitions + hooks
├── pages/        # Page Objects (UI)
├── api/          # API clients
├── constants/    # Test data & error messages
└── utils/        # Helpers & configuration


 # Design Patterns & Best Practices
 Page Object Model
 Centralized Constants
 API Abstraction
 Environment Configuration
 CI/CD with GitHub Actions


# For CI/CD Status
https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/test.yml/badge.svg
