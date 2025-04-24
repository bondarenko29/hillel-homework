import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { router } from './router';
import ErrorBoundary from './components/ErrorBoundary';
import {  ThemeProvider} from "./context/ThemeContext";
import { store, persistor }  from './store';
import { PersistGate } from 'redux-persist/integration/react';


const MainApp = () => {
  return <RouterProvider router={router} />
};

const App = () => {
  return (
    <Provider store={store}>  
        <PersistGate persistor={persistor}>
          <ThemeProvider>
            <ErrorBoundary>
              <MainApp />   
            </ErrorBoundary>
          </ThemeProvider> 
        </PersistGate>
    </Provider>
  )
}

export default App;
