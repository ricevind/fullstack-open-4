describe('blog app', function() {
    before(() => {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        cy.login();
        cy.visit('http://localhost:3000');
    });

    after(() => {
        cy.logout();
    });

    it('is on blogs page', function() {
        cy.contains('blogs');
    });

    it('user can create blog', () => {
        cy.contains('Add blog').click();

        cy.contains('Title').click().type('New blog test blog');
        cy.contains('Author').click().type('MK');
        cy.contains('url').click().type('http');
        
        cy.contains('Create').click();

        cy.contains('Create').should('not.exist');

        cy.get('[aria-label~=\'title\']').contains('New blog test blog');
    });
});

describe('login page', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        cy.visit('http://localhost:3000');
        cy.addUser({
            name: 'Michal4',
            username: 'Ricevind4',
            password: '1234'
        });    
    });

    it('Login successfull', () => {
        cy.contains('UserName').click().type('Ricevind4');
        cy.contains('Password').click().type('1234');
        cy.contains('Login').click();

        cy.contains('blogs');
    });

    it('Login un successfull', () => {
        cy.contains('UserName').click().type('Ricevind5');
        cy.contains('Password').click().type('1234');
        cy.contains('Login').click();

        cy.contains('invalid');
    });
});

describe('User can like blog', () => {
    before(() => {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        cy.login();
        cy.addBlog({
            'title': 'test6',
            'author': 'MK',
            'url': 'https://www.world.com/blog-1233',
            'likes': 12
        });
        cy.visit('http://localhost:3000');
    });

    it('likes blogs', () => {
        cy.contains('test6').parents('[role=region]').within(() => {
            cy.get('[aria-controls=blogDetails]').click();
            cy.contains('Like').click();

            cy.get('[aria-label~=likes]').should('have.text', 13);
        });
    });
});

describe('User can sort blogs', () => {
    const titlesInOrder = [
        'test-0', 'test-1', 'test-2'
    ];

    before(() => {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        cy.login();
        cy.addBlog({
            'title': 'test-2',
            'author': 'MK',
            'url': 'https://www.world.com/blog-1233',
            'likes': 1
        });
        cy.addBlog({
            'title': 'test-0',
            'author': 'MK',
            'url': 'https://www.world.com/blog-1233',
            'likes': 100
        });
        cy.addBlog({
            'title': 'test-1',
            'author': 'MK',
            'url': 'https://www.world.com/blog-1233',
            'likes': 10
        });
        
        cy.visit('http://localhost:3000');
    });

    it('sees sorted blogs', () => {
        cy.contains('test-1');
        cy.contains('Sort by likes').click();

        cy.get('[aria-label~=title]').should(titles => {
            titles.each((index, title) => {

                expect(title).to.contain.text(titlesInOrder[index]);
            });
        });
    });
});