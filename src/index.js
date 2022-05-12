import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { createStore } from 'redux';
import reducer from './reducer/rootReducer';
import { Provider } from 'react-redux';

const store = createStore(reducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
      <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);


