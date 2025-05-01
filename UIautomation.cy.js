describe('Easecommerce',function()
{
    it('login test',function()
    {
    cy.visit("https://easecommerce.in/app/login");
    cy.get('[data-test="login-username-input"]').type('demouser@easecommerce.in');
    cy.get('[data-test="login-password-input"]').type('cE7iQPP^');
    cy.get('[data-test="login-submit-button"]').click();
    cy.url().should('include','https://easecommerce.in/app/admin/master/org');
    })

    it('Switching to employee',function()
    {
    cy.visit("https://easecommerce.in/app/login");
    cy.get('[data-test="login-username-input"]').type('demouser@easecommerce.in');
    cy.get('[data-test="login-password-input"]').type('cE7iQPP^');
    cy.get('[data-test="login-submit-button"]').click();
    cy.get('.css-68c3ov > .MuiButtonBase-root').click();
    cy.get('[tabindex="0"] > .MuiTypography-root').click();
    cy.url().should('include','https://easecommerce.in/app/employee/task-management/tasks');
    cy.get('.css-1ygzhh1 > .MuiListItemText-root > .MuiTypography-root').should('exist');
    })

    it('Task creation',function()
    {
    cy.visit("https://easecommerce.in/app/login");
    cy.get('[data-test="login-username-input"]').type('demouser@easecommerce.in');
    cy.get('[data-test="login-password-input"]').type('cE7iQPP^');
    cy.get('[data-test="login-submit-button"]').click();
    cy.get('.css-68c3ov > .MuiButtonBase-root').click(); //Three dot buuton
    cy.get('[tabindex="0"] > .MuiTypography-root').click(); // Switch to employee
    cy.get('.css-84c6ri').click(); // Add task button
    cy.get('[id=":r13:"]').click(); // Super category
    cy.contains('Customer Support Services').click();
    cy.get('[id=":r15:"]').click(); // Sub category
    cy.contains('Routine Customer Handling').click();
    cy.get('[id=":r17:"]').click(); // Portals
    cy.contains('Flipkart').click();
    cy.get('#ProductFilter').click(); // Products
    cy.contains('Claura Women Printed V-Neck Maxi Kaftan Nightdress').click();
    cy.get('#task-name-input').type("QA Automation"); // Task Name
    cy.get('[id=":r1c:"]').click(); // Assigned to
    cy.contains('Abhishek').click();
    cy.get('[id=":r1e:"]').click(); // Reviewers
    cy.contains('Priyanka Astoliya').click();
    cy.get('[id=":r1g:"]').click(); // Priority
    cy.contains('li', 'Low').should('be.visible').click();
    cy.get('#\\:r1i\\:').clear().type('01-05-2025').type('{enter}'); // Due date
    cy.get('.ql-editor').type('QA Automation Using Cypress'); // Description
    cy.get('.MuiGrid-container > :nth-child(1) > .MuiButtonBase-root').click(); // Submit button
    cy.get('.MuiDialogActions-root > .MuiButton-contained').click(); // Yes create it! button
    cy.get('#notistack-snackbar').should('be.visible').and('contain.text', 'Task created successfully');
    })

    
    it('Form Validation,when all the required fields are not filled',function()
    {
    cy.visit("https://easecommerce.in/app/login");
    cy.get('[data-test="login-username-input"]').type('demouser@easecommerce.in');
    cy.get('[data-test="login-password-input"]').type('cE7iQPP^');
    cy.get('[data-test="login-submit-button"]').click();
    cy.get('.css-68c3ov > .MuiButtonBase-root').click(); 
    cy.get('[tabindex="0"] > .MuiTypography-root').click(); 
    cy.get('.css-84c6ri').click(); 
    cy.get('.MuiGrid-container > :nth-child(1) > .MuiButtonBase-root').click();
    cy.contains('Field is required').should('exist'); //form validation
    })

    it('Negative test case',function()
    {
    cy.visit("https://easecommerce.in/app/login");
    cy.get('[data-test="login-username-input"]').type('demouser@easecommerce.in');
    cy.get('[data-test="login-password-input"]').type('cE7iQPP^');
    cy.get('[data-test="login-submit-button"]').click();
    cy.get('.css-68c3ov > .MuiButtonBase-root').click(); //Three dot buuton
    cy.get('[tabindex="0"] > .MuiTypography-root').click(); // Switch to employee
    cy.get('.css-84c6ri').click(); // Add task button
    cy.get('[id=":r13:"]').click(); // Super category
    cy.contains('Customer Support Services').click();
    cy.get('[id=":r15:"]').click(); // Sub category
    cy.contains('Routine Customer Handling').click();
    cy.get('[id=":r17:"]').click(); // Portals
    cy.contains('Flipkart').click();
    cy.get('#ProductFilter').click(); // Products
    cy.contains('Claura Women Printed V-Neck Maxi Kaftan Nightdress').click();
    //cy.get('#task-name-input').type("QA Automation"); // Missing Task Name
    cy.get('[id=":r1c:"]').click(); // Assigned to
    cy.contains('Abhishek').click();
    cy.get('[id=":r1e:"]').click(); // Reviewers
    cy.contains('Priyanka Astoliya').click();
    cy.get('[id=":r1g:"]').click(); // Priority
    cy.contains('li', 'Low').should('be.visible').click();
    cy.get('#\\:r1i\\:').clear().type('01-05-2025').type('{enter}'); // Due date
    //cy.get('.ql-editor').type('QA Automation Using Cypress'); // Missing Description
    cy.get('button[type="submit"]').should('be.disabled');
    
    })
})
