// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

let token;
Cypress.Commands.add('login', () => { 
    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/user',
        body: {
            'name': 'Michal3',
            'username': 'Ricevind3',
            'password': '1234'
        }
    });
    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/login',
        body: {
            username: 'Ricevind3',
            password: '1234',
        }
    })
        .then((resp) => {
            token = resp.body.token;
            window.localStorage.setItem('blog-user-data', JSON.stringify(resp.body));
        });
});

Cypress.Commands.add('logout', () => { 
    window.localStorage.removeItem('blog-user-data');
});

Cypress.Commands.add('addUser', (user) => { 
    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/user',
        body: user,
        
    });
});

Cypress.Commands.add('addBlog', (blog) => { 
    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/blogs',
        body: blog,
        headers: {
            'authorization': `bearer ${token}`
        }
    });
});