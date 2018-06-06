import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './popup.css';
import App from './App';
import Popup from "react-popup";
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Popup />, document.getElementById('popup'));
registerServiceWorker();
