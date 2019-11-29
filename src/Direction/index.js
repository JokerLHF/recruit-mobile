import React, { Component, Fragment } from 'react';
import './index.less';

class Direction extends Component {

  // defaultShow表示默认进入页面展示的卡片
  introcution = [
    { name: '前端', tip: '大法好, 大法秒', shortIntro: '前端主要是做web页面, 手机h5页面, 小程序...', imgFile: require('../static/front.jpg') },
    { name: 'P&A', tip: '大法好, 大法秒', shortIntro: '一个团队, 啦啦啦啦啦啦啦啦...', imgFile: require('../static/front.jpg'), defaultShow: true },
    { name: '后台', tip: '大法好, 大法秒', shortIntro: '后台语言java, 啦啦啦啦啦...', imgFile: require('../static/front.jpg') },
    { name: '安卓', tip: '大法好, 大法秒', shortIntro: '安卓语言是什么?? 我不知道...', imgFile: require('../static/front.jpg') },
  ]

  // 返回介绍的列表
  returnIntroctionList = () => {
    return (
      <div className="direction-intro-overflow-div">
        {
          this.introcution.map(item => {
            return this.returnItemIntro(item)
          })
        }
      </div>
    )
  }
  // 返回具体的某一个
  returnItemIntro = ({ imgFile, name, tip, shortIntro }) => {
    return (
      <div className="direction-intro-div">
        <div className="direction-to-center">
          <div className="direction-logo-div">
            <img alt="" src={imgFile} />
          </div>
          <div className="title-intro">
            <div className="title">
              <div className="direction-name">{name}</div>
              <div className="direction-tip">{tip}</div>
            </div>
            <div className="short-intro">{shortIntro}</div>
          </div>
          <div className="nore-more">点击了解详情</div>
        </div>
      </div>
    )
  }

  // 返回底部轮播的li
  returnBottomLi = () => {
    return (
      <ul className="carousel-bottom-ul">
        {
          this.introcution.map(item => {
            return (
              <li className="carouse-bottom-li"></li>
            )
          })
        }
      </ul>
    )
  }

  // 判断现在是在第几个轮播
  judgeNow = () => {

  }

  // 判断要移动几个vw
  judgeMoveVW = () => {
    let len = this.introcution.length;
    for (let i = 0; i < len; i++) {
      if (this.introcution[i].defaultShow) {
        return i;
      }
    }
  }
  render () {
    return (
      <Fragment>
        <div className="direction-intro-outer-div">
          {this.returnIntroctionList()}
        </div>
        {this.returnBottomLi()}
      </Fragment>
    )
  }
}
export default Direction;
