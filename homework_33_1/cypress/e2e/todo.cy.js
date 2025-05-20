describe('TodoList', () => {
  beforeEach(() => {
    cy.visit('/'); 
    cy.clearLocalStorage(); 
  });

  it('renders the title "ToDo List"', () => {
    cy.get('h1').should('contain', 'ToDo List');
  });

  it('renders the input field for new tasks', () => {
    cy.get('input[placeholder="New task..."]').should('be.visible');
  });

  it('allows typing in the input field', () => {
    const text = 'My new task 123';
    cy.get('input[placeholder="New task..."]').type(text).should('have.value', text);
  });

  it('shows an error message if "Add" is clicked with insufficient text', () => {
    cy.get('button').contains('Add').click();
    cy.get('p').should('contain', 'Task must be at least 5 characters');
  });

  it('shows an error message if less than 5 characters are entered', () => {
    cy.get('input[placeholder="New task..."]').type('abcd');
    cy.get('button').contains('Add').click();
    cy.get('p').should('contain', 'Task must be at least 5 characters');
  });

  it('adds a new todo to the list when at least 5 characters are entered and "Add" is clicked', () => {
    const taskText = 'Buy groceries';
    cy.get('input[placeholder="New task..."]').type(taskText);
    cy.get('button').contains('Add').click();
    cy.get('li').should('contain', taskText);
  });

  it('renders "No tasks yet" when the todo list is empty', () => {
    cy.get('li').should('not.exist'); 
    cy.get('p').should('contain', 'No tasks yet');
  });

  it('adds a new item to the list with the entered text when "Add" is clicked', () => {
    const taskText = 'Another new task';
    cy.get('input[placeholder="New task..."]').type(taskText);
    cy.get('button').contains('Add').click();
    cy.get('li').should('contain', taskText);
  });

  it('allows entering both numbers and letters in the input field', () => {
    const text = 'My Task 123';
    cy.get('input[placeholder="New task..."]').type(text).should('have.value', text);
  });


  it('should delete a todo item when the "Delete" button is clicked', () => {
    const taskText = 'Task 1';

    cy.get('input[placeholder="New task..."]').type(taskText);
    cy.get('button').contains('Add').click();

    cy.contains(taskText).parent().parent().find('button[type="delete"]').click();
    cy.contains(taskText).should('not.exist');
  });
  
});