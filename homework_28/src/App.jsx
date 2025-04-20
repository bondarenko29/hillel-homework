import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import ErrorBoundary from './components/ErrorBoundary';
import {  ThemeProvider} from "./context/ThemeContext";


const MainApp = () => {
  return <RouterProvider router={router} />
};

const App = () => {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <MainApp />   
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App;
