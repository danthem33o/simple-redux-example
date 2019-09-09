import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/Example/store';
import Entities from './components/Entities';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <Entities />

        </header>
      </div>
    </Provider>
  );
}

export default App;
