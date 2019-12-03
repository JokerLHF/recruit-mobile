
import React, { Component } from 'react';
import { List, InputItem, Picker, Toast, TextareaItem } from 'antd-mobile';
import { createForm } from 'rc-form';






const gradeList = [
  {
    label: '大一',
    value: 1,
  },
  {
    label: '大二',
    value: 2,
  },
  {
    label: '大三',
    value: 3,
  },
];



class FormSignItem extends Component {

  state = {
    direction: 2, // 选择方向 1前端 2后台 3安卓
    gender: '男', // 默认是男
    hasError: false,
  }

  componentDidMount () {
    this.props.onSure(this.joinUS);
    this.props.thinkLittle(this.thinkLittle);
    this.judgeLocalPhone();
    this.setDirection();
  }

  // 如果用户保存的是错误的电话号码 那么他保存之后再报名也要提示这个是不好的电话号码
  judgeLocalPhone = () => {
    const { phone = '' } = this.returnLocalStorage();
    phone && this.phoneChange(phone);
  }

  // 因为用户选择是保存再local里面， 但是要根据用户选择改变颜色就要利用state。 所以子啊第一次的时候如果local里面有值就改变一下state 的值
  setDirection = () => {
    const { direction = '' } = this.returnLocalStorage();
    direction && this.setState({ direction });
  }

  joinUS = () => {
    let val = undefined;
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
      if (error || this.state.hasError) {
        Toast.info('请正确填写表格数据', 1);
        return;
      }
      val = value;
    });
    return val;
  }

  thinkLittle = () => {
    return this.props.form.getFieldsValue();
  }



  // 电话号码改变
  phoneChange = (value) => {
    let temp = value.replace(/\s/g, ''); // 去除空格
    let phoneRex = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
    if (!phoneRex.test(temp)) {
      this.setState({
        hasError: true,
      });
    } else {
      this.setState({
        hasError: false,
      });
    }
    this.props.form.setFieldsValue({
      tel: value
    })
  }



  onErrorClick = (e) => {
    if (this.state.hasError) {
      Toast.info('请填写正确的电话号码', 1);
    }
  }

  // 方向改变
  onTagChange = (e, type) => {
    this.props.form.setFieldsValue({
      direction: type
    })
    this.setState({
      direction: type
    })
  }
  onGenderChange = (e, gender) => {
    this.props.form.setFieldsValue({
      gender
    })
    this.setState({
      gender
    })
  }

  returnLocalStorage = () => {
    let formData = localStorage.getItem('P&A-form') || "{}";
    return JSON.parse(formData);
  }

  render () {
    const { getFieldProps } = this.props.form;
    const { name = '', stuId = '', tel = '', majorAndClass = '', grade = [1], introduction = '', wechat = '', dormitory = '', academy = '计算机学院' } = this.returnLocalStorage();
    let departmentId = this.state.direction;
    let gender = this.state.gender;
    return (
      <form>

        <List>
          <InputItem
            {...getFieldProps('name', {
              initialValue: name,
              rules: [{
                'required': true,
              }]
            })}
            clear
            placeholder="请填写姓名"
          > 姓名</InputItem>

          <InputItem
            {...getFieldProps('stuId', {
              initialValue: stuId,
              rules: [{
                'required': true,
              }]
            })}
            clear
            type="number"
            placeholder="请填写学号"
          >学号</InputItem>


          <div
            className="gender-list am-list-item"
            {...getFieldProps('gender', {
              initialValue: gender,
              rules: [{
                'required': true,
              }]
            })}
          >
            <div className="am-list-line">
              <div className="gender-label am-input-label">性别</div>
              <div className="gender-tag-list">
                <div onClick={(e) => { this.onGenderChange(e, "男") }} className={gender === "男" ? "my-tag my-tag-active" : "my-tag"}>男</div>
                <div onClick={(e) => { this.onGenderChange(e, "女") }} className={gender === "女" ? "my-tag my-tag-active" : "my-tag"}>女</div>
              </div>
            </div>
          </div>

          <InputItem
            {...getFieldProps('wechat', {
              initialValue: wechat,
              rules: [{
                'required': true,
              }]
            })}
            clear
            placeholder="请填写微信"
          >微信号</InputItem>

          <InputItem
            {...getFieldProps('dormitory', {
              initialValue: dormitory,
              rules: [{
                'required': true,
              }]
            })}
            clear
            placeholder="请填写宿舍号"
          >宿舍号</InputItem>



          <InputItem
            {...getFieldProps('tel', {
              initialValue: tel,
              rules: [
                { 'required': true },
              ]
            })}
            error={this.state.hasError}
            onChange={this.phoneChange}
            onErrorClick={this.onErrorClick}
            type="phone"
            placeholder="请填写手机号"
          >手机号</InputItem>


          <InputItem
            {...getFieldProps('academy', {
              initialValue: academy,
              rules: [{
                'required': true,
              }]
            })}
            clear
            placeholder="请填写学院"
          >学院</InputItem>

          <InputItem
            {...getFieldProps('majorAndClass', {
              initialValue: majorAndClass,
              rules: [{
                'required': true,
              }]
            })}
            clear
            placeholder="请填写专业"
          >专业班级</InputItem>

          <Picker
            data={gradeList}
            title="选择年级"
            cols={1}
            {...getFieldProps('grade', {
              initialValue: grade,
              rules: [{
                'required': true,
              }]
            })}
          >
            <List.Item arrow="horizontal">选择年级</List.Item>
          </Picker>

          <div
            className="direction-list am-list-item"
            {...getFieldProps('departmentId', {
              initialValue: departmentId,
              rules: [{
                'required': true,
              }]
            })}
          >
            <div className="am-list-line">
              <div className="direction-label am-input-label">选择方向</div>
              <div className="direction-tag-list">
                <div onClick={(e) => { this.onTagChange(e, 2) }} className={departmentId === 2 ? "my-tag my-tag-active" : "my-tag"} >前端</div>
                <div onClick={(e) => { this.onTagChange(e, 1) }} className={departmentId === 1 ? "my-tag my-tag-active" : "my-tag"}>后台</div>
                <div onClick={(e) => { this.onTagChange(e, 3) }} className={departmentId === 3 ? "my-tag my-tag-active" : "my-tag"}>安卓</div>
              </div>
            </div>
          </div>

          <TextareaItem
            {...getFieldProps('introduction', {
              initialValue: introduction,
              rules: [{
                'required': true,
              }]
            })}
            title="自我介绍"
            autoHeight
            count={50}
            placeholder="50字以内简短的自我介绍"
          />



        </List>
      </form>
    );
  }
}

export default FormSignItem = createForm()(FormSignItem);
