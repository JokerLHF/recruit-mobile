import React, { Component } from 'react';
import Direction from '../Direction';
import ButtomCom from '../Buttom';
import SignForm from '../Form/index';
import './index.less';
import logo from '../static/logo.png';


class HomePage extends Component {
  state = {
    showForm: false,
  }
  changeFromState = () => {
    this.setState({
      showForm: !this.state.showForm
    })
  }
  render () {
    return (
      <div className="home-page-div">
        <img src={logo} className="logo" alt="" />
        <div className="direction-content">
          <Direction />
        </div>
        <ButtomCom changeFromState={this.changeFromState} />
        <SignForm visiable={this.state.showForm} changeFromState={this.changeFromState} />
      </div>
    )
  }
}
export default HomePage;