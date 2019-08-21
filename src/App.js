import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Provider} from 'react-redux';
import store from './reducers/store';
import  AgencyApp from './AgencyApp';
function App() {
  return (
    <Provider store={store}>
      <AgencyApp/>
    </Provider>
  );
}

export default App;
