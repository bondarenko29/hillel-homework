import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { router } from './router';
import ErrorBoundary from './components/ErrorBoundary';
import  store  from './store';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3663e8', 
    },
    secondary: {
      main: '#f50057', 
    },
    analogous: {
      main: '#1ef8fd',
    }
    
  },
});

const MainApp = () => {
  return <RouterProvider router={router} />
};

const App = () => {
  return (
    <Provider store={store}> 
      <ThemeProvider theme={theme}> 
        <CssBaseline />  
            <ErrorBoundary>
              <MainApp />   
            </ErrorBoundary> 
      </ThemeProvider>    
    </Provider>
  )
}

export default App;

