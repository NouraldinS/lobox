import React from 'react';
import { ThemeProvider } from 'react-jss';
import Dropdown from './components/Dropdown';

const defaultTheme = {
  mainColor: '#FFF',
};

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <div style={{ width: 400, padding: 24 }}>
        <Dropdown />
      </div>
    </ThemeProvider>
  );
}

export default App;
