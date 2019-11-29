import React, { Component } from 'react';
import './index.less';
import Direction from '../Direction';

const logo = require('../static/logo.png');

class HomePage extends Component {
  render () {
    return (
      <div className="home-page-div">
        <img src={logo} className="logo" alt="" />
        <div className="direction-content">
          <Direction />
        </div>
        <div className="bottom-operate-div">
          <div className="btn-sign-up">点我报名</div>
          <div className="circle-operate"></div>
        </div>
      </div>
    )
  }
}
export default HomePage;