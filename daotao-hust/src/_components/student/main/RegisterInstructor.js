import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Divider, Form, Header, TextArea } from 'semantic-ui-react';
import WithCard from '../sub/WithCard';

const options = [
  {key: 'm', text: 'Male', value: 'male'},
  {key: 'f', text: 'Female', value: 'female'},
];

class RegisterInstructor extends Component {
  render () {
    return (
      <WithCard>
        <Header as="h3" textAlign='center'>
          Đăng ký nguyện vọng Giáo viên cho Đồ án kỳ 20172
        </Header>
        <Divider/>
        <Form>
          <Form.Select
            options={options}
            fluid
            placeholder='Chọn Nguyện vọng'
            label='Chọn Nguyện vọng'/>
          <Form.Input
            fluid
            readOnly
            label='Họ tên'
            placeholder='Họ tên'
            defaultValue='Chử Quốc Hưng'
            required/>
          <Form.Group widths={2}>
            <Form.Input
              fluid
              label='Email'
              placeholder='Email'
              defaultValue='hungcq1996@gmail.com'
              required/>
            <Form.Input
              fluid
              label='Điện thoại'
              placeholder='Điện thoại'
              defaultValue='0987134200'
              required/>
          </Form.Group>
          <Form.Button
            content='Upload'
            label='CV cho Giảng viên'/>
          <Form.Group widths={2}>
            <Form.Select
              options={options}
              placeholder='Hệ đào tạo'
              label='Hệ đào tạo'
              fluid/>
            <Form.Select
              options={options}
              placeholder='Chọn Đơn vị'
              label='Chọn Đơn vị'
              fluid/>
          </Form.Group>
          <Form.Button
            content='Danh sách đề tài'
            inline/>
          <Form.Select
            options={options}
            placeholder='Môn Đồ án'
            label='Môn Đồ án'
            fluid/>
          <Form.Field fluid>
            <label>Ghi chú cho GV</label>
            <TextArea placeholder='Ghi chú cho GV'/>
          </Form.Field>
          <Form.Button
            primary
            content='Lưu'
            inline/>
        </Form>
      </WithCard>
    );
  }
}

const ConnectedRegisterInstructor = connect(null, null)(RegisterInstructor);
export default ConnectedRegisterInstructor;