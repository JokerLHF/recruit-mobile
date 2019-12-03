import React, { Component } from 'react';
import { introcution } from './introuction';
import $ from 'jquery';
import './detailIntro.less';

class DeatilIntro extends Component {


  render () {
    const { height, nowIndex, returnLearnMore } = this.props;
    let intro = introcution[nowIndex].longIntro;
    return (
      <div className="paragraph-div" style={{ 'height': `${height}px` }}
        onClick={(e) => {
          let dom = $(e.target);
          returnLearnMore(nowIndex, dom);
        }}
      >
        {
          intro.map((item, index) => {
            return (
              <div className="paragraph" key={index}>{item}</div>
            )
          })
        }
      </div>
    )
  }
}
export default DeatilIntro;
