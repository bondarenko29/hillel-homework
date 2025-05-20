describe('Todo Application E2E Tests', () => {
  const API_URL = 'https://dummyjson.com/todos';

  beforeEach(() => {
    cy.visit('/todo'); 
  });

  it('should render title and fetch initial todos', () => {
    cy.intercept('GET', `${API_URL}?limit=30`, {
      statusCode: 200,
      body: {
        todos: [
          { id: 1, todo: 'Sample Todo from API', completed: false, userId: 1 },
        ],
      },
    }).as('getTodos');

    cy.reload();
    cy.wait('@getTodos'); 
    cy.getByCy('todo-title').should('contain', 'TODO LIST');
    cy.getByCy('todo-text-1').should('contain', 'Sample Todo from API');
  });

  it('should add a new todo item', () => {
    
    cy.intercept('GET', `${API_URL}?limit=30`, {
      statusCode: 200,
      body: {
        todos: [
          { id: 1, todo: 'Sample Todo from API', completed: false, userId: 1 },
        ],
      },
    }).as('getTodosForAdd');
    cy.reload();
    cy.wait('@getTodosForAdd');
  
    cy.intercept('POST', `${API_URL}/add`, {
      statusCode: 200,
      body: {
        id: 201, 
        todo: 'Buy milk', 
        completed: false,
        userId: 1,
      },
    }).as('addTodo');
    cy.getByCy('todo-input').type('Buy milk');

    cy.getByCy('add-button').click();

    cy.wait('@addTodo'); 

    cy.contains('Buy milk').should('be.visible'); 
    cy.contains('Buy milk')
      .closest('[data-cy^="todo-item-"]') 
      .find('[data-cy^="toggle-checkbox-"]') 
      .should('not.be.checked');
  });

  it('should delete a todo item', () => {
    cy.intercept('GET', `${API_URL}?limit=30`, {
      statusCode: 200,
      body: {
        todos: [
          { id: 1, todo: 'Todo to delete', completed: false, userId: 1 },
        ],
      },
    }).as('getTodos');
    cy.reload();
    cy.wait('@getTodos');

    cy.intercept('DELETE', `${API_URL}/1`, {
      statusCode: 200,
      body: { id: 1, isDeleted: true },
    }).as('deleteTodo');

    cy.getByCy('delete-button-1').click();
    cy.wait('@deleteTodo'); 

    cy.getByCy('todo-item-1').should('not.exist');
    cy.contains('No tasks yet 💤').should('be.visible'); 
  });

  it('should clear the input field after adding a todo', () => {
    cy.intercept('GET', `${API_URL}?limit=30`, {
      statusCode: 200,
      body: {
        todos: [], 
      },
    }).as('getEmptyTodos');
    cy.reload();
    cy.wait('@getEmptyTodos');

    cy.intercept('POST', `${API_URL}/add`, {
      statusCode: 200,
      body: { id: 202, todo: 'Task to clear', completed: false, userId: 1 },
    }).as('addTodo');

    cy.getByCy('todo-input').type('Task to clear');
    cy.getByCy('add-button').click();
    cy.wait('@addTodo');

    cy.getByCy('todo-input').should('have.value', '');
    cy.contains('Task to clear').should('be.visible'); 
  });

  it('should clear only completed todos using "Clear Completed" button', () => {
    cy.intercept('GET', `${API_URL}?limit=30`, {
      statusCode: 200,
      body: {
        todos: [
          { id: 1, todo: 'Task A (completed)', completed: true, userId: 1 },
          { id: 2, todo: 'Task B (active)', completed: false, userId: 1 },
          { id: 3, todo: 'Task C (completed)', completed: true, userId: 1 },
        ],
      },
    }).as('getTodosForClear');
    cy.reload();
    cy.wait('@getTodosForClear');
    cy.intercept('DELETE', `${API_URL}/1`, { statusCode: 200, body: { id: 1, isDeleted: true } }).as('deleteTodo1');
    cy.intercept('DELETE', `${API_URL}/3`, { statusCode: 200, body: { id: 3, isDeleted: true } }).as('deleteTodo3');
    cy.getByCy('todo-text-1').should('be.visible');
    cy.getByCy('todo-text-2').should('be.visible');
    cy.getByCy('todo-text-3').should('be.visible');

    cy.getByCy('clear-button').click();

    cy.wait('@deleteTodo1');
    cy.wait('@deleteTodo3');
    cy.getByCy('todo-item-1').should('not.exist');
    cy.getByCy('todo-item-3').should('not.exist');
    cy.getByCy('todo-item-2').should('be.visible');
    cy.getByCy('todo-text-2').should('contain', 'Task B (active)');
  });


  it('should load 30 todo items', () => {
    const mockTodos = Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      todo: `Todo item ${i + 1}`,
      completed: false,
      userId: 1,
    }));
    cy.intercept('GET', `${API_URL}?limit=30`, {
      statusCode: 200,
      body: {
        todos: mockTodos, 
      },
    }).as('get30Todos');
    cy.reload();
    cy.wait('@get30Todos');
    cy.get('[data-cy^="todo-item-"]').should('have.length', 30);
    cy.getByCy('todo-text-1').should('contain', 'Todo item 1');
    cy.getByCy('todo-text-30').should('contain', 'Todo item 30');
  });

  it('should load initial todos from the real API', () => {
    cy.intercept('GET', `${API_URL}?limit=30`).as('realApiTodos');
    cy.reload();
    cy.wait('@realApiTodos');

    cy.get('[data-cy^="todo-item-"]').should('have.length.of.at.least', 1);
  });

});

  

