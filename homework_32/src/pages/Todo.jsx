import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTodoRequest,
  toggleTodoRequest,
  deleteTodoRequest,
} from '../store/todo/todosSlice';

import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
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

function Todo() {
  const [newTodoText, setNewTodoText] = useState('');
  const todos = useSelector((state) => state.todos.items);
  const isLoading = useSelector((state) => state.todos.loading);
  const currentTodoIdLoading = useSelector((state) => state.todos.currentTodoIdLoading);
  const addLoading = useSelector((state) => state.todos.addLoading);
  const error = useSelector((state) => state.todos.error);
  const dispatch = useDispatch();

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      dispatch(addTodoRequest(newTodoText.trim()));
      setNewTodoText('');
    }
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodoRequest(id));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodoRequest(id));
  };

  return (
   <Box sx={{pb: 10}}>
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
            sx={{ whiteSpace: 'nowrap', bgcolor: "primary.light", color: 'primary.contrastText' }}
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
                    onChange={() => handleToggleTodo(todo.id)}
                    disabled={!!currentTodoIdLoading}
                    
                  />
                  }          
              />
              
              <ListItemText
                id={`todo-item-label-${todo.id}`}
                primary={todo.text}
                sx={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? 'text.secondary' : 'text.primary',
                }}
              />
              <Box sx={{ ml: 'auto'}}>
                {currentTodoIdLoading === todo.id ? (
                  <CircularProgress size={20} />
                ) : (
                  <IconButton 
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteTodo(todo.id)}
                    disabled={!!currentTodoIdLoading}
                    color="error"
                    
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>
      
    </Container>
    <Footer />
   </Box>
  );
}

export default Todo;

 
  
   










