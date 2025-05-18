import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTodoRequest,
  toggleTodoRequest,
  deleteTodoRequest,
  fetchTodosRequest,
  updateTodoRequest,
  clearCompletedTodosRequest,
} from '../store/todo/todosSlice';

import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  Checkbox,
  FormControlLabel,
  Box,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';
import Footer from '../components/Footer';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/ClearAll';

function Todo() {
  const [newTodoText, setNewTodoText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const todos = useSelector((state) => state.todos.items);
  const isLoading = useSelector((state) => state.todos.loading);
  const currentTodoIdLoading = useSelector((state) => state.todos.currentTodoIdLoading);
  const addLoading = useSelector((state) => state.todos.addLoading);
  const error = useSelector((state) => state.todos.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodosRequest());
  }, [dispatch]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      dispatch(addTodoRequest(newTodoText.trim()));
      setNewTodoText('');
    }
  };

  const handleToggleTodo = (id, completed) => {
    dispatch(toggleTodoRequest({ id, completed: !completed }));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodoRequest(id));
  };

  const handleEditTodo = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleSaveEdit = (id) => {
    if (editText.trim()) {
      dispatch(updateTodoRequest({ id, text: editText.trim() }));
      setEditingId(null);
      setEditText('');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleClearCompletedTodos = () => {
    dispatch(clearCompletedTodosRequest());
  };

  return (
    <Box sx={{ pb: 10 }}>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Typography
            variant="h4"
            component="h1"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            TODO LIST
          </Typography>

          <Box
            component="form"
            onSubmit={handleAddTodo}
            sx={{ display: 'flex', gap: 1, mb: 3 }}
          >
            <TextField
              fullWidth
              variant="outlined"
              label="New task..."
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              disabled={addLoading}
            />
            <Button
              type="submit"
              variant="contained"
              color="inherit"
              disabled={addLoading || !newTodoText.trim()}
              startIcon={
                addLoading && newTodoText.trim() ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <AddIcon />
                )
              }
              sx={{ whiteSpace: 'nowrap', bgcolor: 'primary.light', color: 'primary.contrastText' }}
            >
              {addLoading && newTodoText.trim() ? 'Addition...' : 'Add'}
            </Button>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Error: {typeof error === 'string' ? error : JSON.stringify(error)}
            </Alert>
          )}

          {isLoading && todos.length === 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
              <CircularProgress />
            </Box>
          )}

          {!isLoading && todos.length === 0 && !error && (
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              sx={{ my: 3 }}
            >
              No tasks yet 💤
            </Typography>
          )}

          <List>
            {todos.map((todo) => (
              <ListItem
                key={todo.id} 
                divider
                sx={{
                  bgcolor: todo.completed ? 'analogous.main' : 'background.paper',
                  transition: 'background-color 0.3s',
                  '&:hover': {
                    bgcolor: todo.completed ? 'primary.light' : 'primary.dark',
                    opacity: 0.9,
                  },
                  opacity: currentTodoIdLoading === todo.id ? 0.6 : 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      edge="start"
                      checked={todo.completed}
                      onChange={() => dispatch(toggleTodoRequest({ id: todo.id }))}
                      disabled={!!currentTodoIdLoading}
                    />

                  }
                  label={
                    editingId === todo.id ? (
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={handleCancelEdit}
                        onKeyUp={(e) => {
                          if (e.key === 'Enter') {
                            handleSaveEdit(todo.id);
                          }
                        }}
                      />
                    ) : (
                      <Typography
                        sx={{
                          textDecoration: todo.completed ? 'line-through' : 'none',
                          color: todo.completed ? 'text.secondary' : 'text.primary',
                        }}
                      >
                        {todo.text}
                      </Typography>
                    )
                  }
                  sx={{ flexGrow: 1, ml: 1 }}
                />
                <Box sx={{ ml: 'auto' }}>
                  {currentTodoIdLoading === todo.id ? (
                    <CircularProgress size={20} />
                  ) : (
                    <>
                      {editingId !== todo.id && (
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleEditTodo(todo)}
                          disabled={!!currentTodoIdLoading}
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteTodo(todo.id)}
                        disabled={!!currentTodoIdLoading}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </Box>
              </ListItem>
            ))}
          </List>

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button
              variant="outlined"
              color="error"
              startIcon={<ClearIcon />}
              onClick={handleClearCompletedTodos}
              disabled={isLoading || todos.filter(todo => todo.completed).length === 0}
            >
              Clear Completed
            </Button>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
}

export default Todo;
