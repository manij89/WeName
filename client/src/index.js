import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducer from './redux/reducers';
import { BrowserRouter } from 'react-router-dom';

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
);


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        <App className='app'/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();