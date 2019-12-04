import React, { Component } from 'react';
import { Modal, Toast } from 'antd-mobile';
import FormSignItem from './ModalItem';
import axios from 'axios';
import './form.less';

axios.defaults.withCredentials = true;

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
    if (val) { // 如果有数据的话
      this.sendAjax(val);
    }
  }

  sendAjax = (val) => {
    axios({
      method: "POST",
      url: 'http://106.15.120.23:80/user/application/add',
      data: this.toFormData(val),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(res => {
      if (res.data.success) {
        Toast.info('报名成功', 1);
        localStorage.removeItem('P&A-form');
        this.props.changeFromState();
      } else {
        Toast.info('操作失败, 请重新报名', 1);
      }
    })
  }


  toFormData = (data) => {
    var formData = new FormData();
    Object.keys(data).forEach(key => {
      let dataKey = data[key];
      if (Array.isArray(dataKey)) { // 发送数组
        for (let i = 0; i < dataKey.length; i++) {
          formData.append(`${key}`, dataKey[i]);
        }
      } else {
        formData.append(key, dataKey);
      }
    })
    return formData;
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





