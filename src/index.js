import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import 'antd-mobile/dist/antd-mobile.css';
import HomePage from './HomePage';
import './setFontSize';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<HomePage />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
