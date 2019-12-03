import React, { Component } from 'react';
import QQ from '../static/qq.png';
import QRCode from '../static/qrCode.png';
import './index.less';
class ButtomCom extends Component {
  state = {
    qrShow: false
  }
  circleClick = (e) => {
    this.setState({
      qrShow: !this.state.qrShow
    })
  }
  render () {
    return (
      <div className="bottom-operate-div">
        <div className="btn-sign-up" onClick={this.props.changeFromState}>点我报名</div>
        <div className="circle-operate" onClick={e => { this.circleClick(e) }}>
          <img src={QQ} alt="" className="qq-img" />
          <img src={QRCode} alt="" className={this.state.qrShow ? "qrcode-img" : "none-div"} />
        </div>
      </div>
    )
  }
}
export default ButtomCom;
