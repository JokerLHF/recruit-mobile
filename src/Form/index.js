import React, { Component } from 'react';
import { Modal } from 'antd-mobile';
import FormSignItem from './ModalItem';
import './form.less';



function closest (el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

class SignForm extends Component {

  showModal = (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      visiable: true,
    });
  }

  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }

  sumbit = () => {
    let val = this.onSure();
    console.log(val)
    if (val) { // 如果有数据的话
      alert('发送表单数据');
      localStorage.removeItem('P&A-form');
      // this.props.changeFromState();
    }
  }
  thinkLittle = () => {
    let val = this.thinkMore();
    localStorage.setItem('P&A-form', JSON.stringify(val));
    this.props.changeFromState();
  }

  onSure = () => { }
  thinkMore = () => { }
  render () {
    return (
      <Modal
        visible={this.props.visiable}
        transparent
        maskClosable={false}
        onClose={this.onClose}
        title="加入我们"
        footer={[
          { text: '我再考虑', onPress: () => { this.thinkLittle() } },
          { text: '加入P&A', onPress: () => { this.sumbit() } },
        ]}
        className="form-modal"
      >
        <div className="form-sumbit">
          <FormSignItem
            onSure={(func) => { this.onSure = func }}
            thinkLittle={(func) => { this.thinkMore = func }}
          />
        </div>
      </Modal>
    );
  }
}
// wrapProps={{ onTouchStart: this.onWrapTouchStart }}
export default SignForm;





