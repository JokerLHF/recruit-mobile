import React, { Component } from 'react';
import Direction from '../Direction';
import ButtomCom from '../Buttom';
import SignForm from '../Form/index';
import './index.less';



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
        {/* <img src={logo} className="logo" alt="" /> */}
        <div className="logo">P&A</div>
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