import React, { Component } from 'react';
import { introcution } from './introuction';
import DeatilIntro from './DetailIntro';
import $ from 'jquery';
import './index.less';

let overflowRef = React.createRef(null);
let setWidthRef = React.createRef(null);

class Direction extends Component {
  state = {
    showIndex: 1, // 展示第几个小卡片， 从0开始
    reserveRotate: {} // key为反转的小卡片的index val为旋转了多少次    180*n  双数就是处于反转状态， 单数 || undefined 就是处于正常状态  因为是反转之后才加1
  }



  componentDidMount () {

    // 设置宽度
    let widthVW = this.returnFlowVW();
    setWidthRef.style.width = `${widthVW}%`;
    // 设置默认值展示的那一个的left
    let movwPX = this.returnPx(this.state.showIndex)
    overflowRef.scrollLeft = movwPX;

    // 记住高度
    let height = $(".direction-to-center").eq(0).height();
    this.normalHeight = height;
  }

  returnFlowVW = () => {
    let len = introcution.length;
    return len * 60 + (len + 1) * 10;
  }

  // 返回介绍的列表
  returnIntroctionList = () => {
    return (
      <div className="direction-intro-overflow-div" ref={(node) => { setWidthRef = node }}>
        {
          introcution.map((item, index) => {
            return this.returnItemIntro(item, index)
          })
        }
      </div>
    )
  }
  // 返回具体的某一个
  returnItemIntro = (item, index) => {
    let isReverse = this.isReverse(index);
    return (
      <div className="direction-to-center" key={index}>
        {
          !isReverse ? this.normalStatusDom(item, index) : <DeatilIntro height={this.normalHeight} nowIndex={index} returnLearnMore={this.learnMore} />
        }
      </div>
    )
  }

  // 正常状态下的渲染dom
  normalStatusDom = ({ imgFile, name, tip, shortIntro }, index) => {
    return (
      <div className="fadeOut-div">
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
        <div className="kore-more" onClick={(e) => {
          let dom = $(e.target.closest('.fadeOut-div'));
          this.learnMore(index, dom)
        }}>点击了解详情</div>
      </div>
    )
  }


  // 反会是否处于反转状态
  isReverse = (index) => {
    let reverseData = this.state.reserveRotate[index];
    if (reverseData === undefined || reverseData % 2 !== 0) { // 处于正常状态
      return false;
    }
    return true;
  }
  // 了解更多的按钮
  learnMore = (index, fadeOutDiv) => {
    let dom = $(".direction-to-center").eq(index);
    let time = this.state.reserveRotate[index] || 1;
    dom.css({ "transform": `rotateY(${time * 180}deg)` });

    let obj = Object.assign({}, this.state.reserveRotate)
    obj[index] = time + 1;


    fadeOutDiv && fadeOutDiv.fadeOut(500);

    setTimeout(() => {
      this.setState({
        reserveRotate: obj
      })
    }, 500);
  }



  // 返回底部轮播的li
  returnBottomLi = () => {
    let i = this.state.showIndex;
    return (
      <ul className="carousel-bottom-ul">
        {
          introcution.map((item, index) => {
            let clazzName = (index === i ? "carouse-bottom-li carouse-bottom-li-active" : "carouse-bottom-li");
            return (
              <li className={clazzName} key={index}></li>
            )
          })
        }
      </ul>
    )
  }



  // 返回要移动的具体vw 收受现在是第几个卡片在中间
  returnPx = (i) => {
    if (i === 0) {
      return 0;
    }
    let allVW = i * 60 + (i + 1) * 10;   // 第i个 前面有i个60vw  i+1个10vw
    return this.vwToPx(allVW - 20);  // 一个60的卡片左边有20 的空闲位置
  }

  // 因为scrollLeft 不支持vw, 所以就只能转换为px
  vwToPx = (vw) => {
    let width = document.documentElement.clientWidth;
    let oneVWToPx = width / 100; // 一个vw的宽度
    return vw * oneVWToPx;
  }

  pxToVW = (px) => {
    let width = document.documentElement.clientWidth;
    let onPxToVW = 100 / width; // 一个vw的宽度
    return px * onPxToVW;
  }
  // 监听滚动事件
  scrollListen = (e) => {
    let width = document.documentElement.clientWidth; // 屏幕的宽度  
    let screenRight = this.pxToVW(e.target.scrollLeft + width); // 屏幕右边 具体可以滚动的div最左边的位置
    let index = this.judgeWhichOne(screenRight); // 判断现在第几个
    if (index !== this.state.showIndex) {
      this.setState({
        showIndex: index
      })
    }
  }

  judgeWhichOne = (screenRight) => {

    let len = introcution.length;
    let nowIndex = this.state.showIndex;
    for (let i = 0; i < len; i++) {
      let index = i + 1;
      let vw = (index - 1) * 60 + index * 10 + 60; // 这个表示第i个小卡片的最右边距离最左边的vw数
      if (screenRight >= vw) {
        nowIndex = i;
      }
    }
    return nowIndex;
  }
  render () {
    return (
      <div className="center-content">
        <div className="direction-intro-outer-div" ref={(node) => { overflowRef = node }} onScroll={(e) => { this.scrollListen(e) }}>
          {this.returnIntroctionList()}
        </div>
        {this.returnBottomLi()}
      </div>
    )
  }
}
export default Direction;
