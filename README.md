 UI & APIAutomation – To Run Tests Locally
Clone the UI & API test automation repository from GitHub.

Open the project in Visual Studio Code.

Make sure Node.js and npm are installed.

Open a terminal and go to the root directory of the project.

Run the command npm install to set up all required node modules.

You can optionally configure the base URL of the application in the Cypress configuration file (usually cypress.config.js).

Launch Cypress using the command npx cypress open.

In the Cypress Test Runner window, navigate to the UI test folder, typically under cypress/e2e/ui/.

Click on the test file you want to execute. Cypress will open a browser and perform the test steps.

Alternatively, you can run the test cases from the terminal in headless mode using npx cypress run.
