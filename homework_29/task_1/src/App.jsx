import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { router } from './router';
import ErrorBoundary from './components/ErrorBoundary';
import {  ThemeProvider} from "./context/ThemeContext";
import store  from './store/store';


const MainApp = () => {
  return <RouterProvider router={router} />
};

const App = () => {
  return (
    <Provider store={store}>  
        <ThemeProvider>
          <ErrorBoundary>
            <MainApp />   
          </ErrorBoundary>
        </ThemeProvider> 
    </Provider>
  )
}

export default App;
