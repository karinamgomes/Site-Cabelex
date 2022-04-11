import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppProvider from './hooks';
import GlobalStyles from './styles/GlobalStyles';
import MainRoutes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <AppProvider>
        <MainRoutes />
        <GlobalStyles />
      </AppProvider>
    </Router>
  );
}

export default App;
