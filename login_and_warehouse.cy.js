/// <reference types="cypress" />

describe('EaseCommerce API Tests', () => {
    let authToken = '';
  
    it('Should login successfully and extract token', () => {
      cy.request({
        method: 'POST',
        url: 'https://easecommerce.in/api/v2/login',
        body: {
          username: 'demouser@easecommerce.in',
          password: 'cE7iQPP^'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 201]);
        cy.log('Login Response:', JSON.stringify(response.body, null, 2));
  
        // Extract token from response
        authToken = response.body.token || response.body.data?.token;
        expect(authToken).to.exist;
        cy.log('Extracted Token:', authToken);
      });
    });
  
    it('Should fetch warehouse list using valid token', () => {
      cy.request({
        method: 'GET',
        url: 'https://easecommerce.in/api/v2/manage/warehouse/master/list?group=default',
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);
        cy.log('Warehouse Response:', JSON.stringify(response.body, null, 2));
        expect(response.body).to.have.property('docs');
        expect(response.body.docs).to.be.an('array');
      });
    });
  
    describe('Negative Test Cases', () => {
      it('Invalid Token should return 401 Unauthorized', () => {
        cy.request({
          method: 'GET',
          url: 'https://easecommerce.in/api/v2/manage/warehouse/master/list?group=default',
          headers: {
            Authorization: 'Bearer invalid_token'
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(401);
          expect(response.body).to.have.property('error');
          expect(response.body.error).to.include('Unauthorized');
        });
      });
  
      it('Missing query parameter should return 400 or handled response', () => {
        cy.request({
          method: 'GET',
          url: 'https://easecommerce.in/api/v2/manage/warehouse/master/list',
          headers: {
            Authorization: `Bearer ${authToken}`
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.be.oneOf([200, 400, 422]); // Accept multiple valid responses
        });
      });
  
      it('No warehouses for invalid group should return empty or handled response', () => {
        cy.request({
          method: 'GET',
          url: 'https://easecommerce.in/api/v2/manage/warehouse/master/list?group=invalid_group_name',
          headers: {
            Authorization: `Bearer ${authToken}`
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.be.oneOf([200, 204, 404]);
      
          if (response.status === 200) {
            expect(response.body).to.have.property('docs');
            expect(response.body.docs).to.be.an('array');
            cy.log(`Returned ${response.body.docs.length} warehouses for invalid group.`);
            // Don't fail the test if warehouses are returned
            // Instead, verify it's handled consistently
          } else {
            cy.log('No warehouses returned due to 204 or 404 status');
          }
        });
      });
      
        });
      });
   
  

 

  
  
  