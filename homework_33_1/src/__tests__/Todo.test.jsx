
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList'; 
import { test } from 'vitest'

describe('TodoList Component', () => {
    beforeEach(() => {
        localStorage.clear();
    })
  
  test('renders the title "ToDo List"', () => {
    render(<TodoList />);
    const titleElement = screen.getByText(/ToDo List/i);
    expect(titleElement).toBeInTheDocument();
  });

  
  test('renders the input field for new tasks', () => {
    render(<TodoList />);
    const inputElement = screen.getByPlaceholderText(/New task.../i);
    expect(inputElement).toBeInTheDocument();
  });

  
  test('allows entering both numbers and letters in the input field', () => {
    render(<TodoList />);
    const inputElement = screen.getByPlaceholderText(/New task.../i);
    fireEvent.change(inputElement, { target: { value: 'My new task 123' } });
    expect(inputElement.value).toBe('My new task 123');
  });

  test('shows an error message if less than 5 characters are entered', async () => {
    render(<TodoList />);
    const inputElement = screen.getByPlaceholderText(/New task.../i);
    const addButton = screen.getByText(/Add/i);
    fireEvent.change(inputElement, { target: { value: 'abcd' } });
    fireEvent.click(addButton);
    const errorMessage = await screen.findByText(/Task must be at least 5 characters/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('shows an error message if "Add" is clicked with no text', async () => {
  render(<TodoList />);
  const addButton = screen.getByText(/Add/i);
  fireEvent.click(addButton);

  const errorMessage = await screen.findByText(/Task must be at least 5 characters/i);
  expect(errorMessage).toBeInTheDocument();
});

 test('adds a new todo to the list when at least 5 characters are entered and "Add" is clicked', async () => {
        render(<TodoList />);
        const inputElement = screen.getByPlaceholderText(/New task.../i);
        const addButton = screen.getByText(/Add/i);

        fireEvent.change(inputElement, { target: { value: '1 TASK' } });
        fireEvent.click(addButton);

        const listItem = await screen.findByText('1 TASK');
        expect(listItem).toBeInTheDocument();
    });

  test('renders "No tasks yet" when the todo list is empty', async () => {
    render(<TodoList />);
        
    const noTasksMessage = await screen.findByText('No tasks yet');
    expect(noTasksMessage).toBeInTheDocument();
  });

  test('adds a new item to the list with the entered text when "Add" is clicked', async () => {
    render(<TodoList />);
    const inputElement = screen.getByPlaceholderText(/New task.../i);
    const addButton = screen.getByText(/Add/i);
    const taskText = 'New task to add';

    fireEvent.change(inputElement, { target: { value: taskText } });
    fireEvent.click(addButton);
    const listItem = await screen.findByText(taskText);
    expect(listItem).toBeInTheDocument();
  });

  test('should clear error onBlur if field is not empty', async () => {
    render(<TodoList />);
    const inputElement = screen.getByPlaceholderText(/New task.../i);
    fireEvent.change(inputElement, {target: { value: ''}})
    fireEvent.blur(inputElement);
    const errorMessage = screen.queryByText('Task must be at least 5 characters')
    expect(errorMessage).toBeNull();
    
  });  


  test('should delete a todo item when the "Delete" button is clicked', async () => {
    render(<TodoList />);

    const taskText = 'Task 1';
    const inputElement = screen.getByPlaceholderText(/New task.../i);
    const addButton = screen.getByText(/Add/i);
    fireEvent.change(inputElement, { target: { value: taskText } });
    fireEvent.click(addButton);
    const listItem1 = await screen.findByText(taskText);
    const deleteButtonTask1 = listItem1.closest('li').querySelector('[data-testid^="delete-todo-"]');

    expect(deleteButtonTask1).toBeInTheDocument();

    fireEvent.click(deleteButtonTask1);

    try {
        await screen.findByText(taskText, { timeout: 100 });
        expect(true).toBe(false);
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toContain(`Unable to find an element with the text: ${taskText}`);
        }
    });
});

