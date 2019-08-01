import React, { Component } from 'react';
import { Button, Form, Grid, Modal } from 'semantic-ui-react';

class ChangePasswordModal extends Component {

  render () {
    const {handleClose, modelOpen} = this.props;
    return (
      <Modal
        open={modelOpen}
        onClose={handleClose}
        size='mini'
        style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '10%'}}
      >
        <Modal.Header>
          Đổi mật khẩu
        </Modal.Header>
        <Modal.Content style={{paddingLeft: '7%', paddingRight: '7%'}}>
          <Form>
            <Form.Input placeholder='Mật khẩu cũ' type='password'/>
            <Form.Input placeholder='Mật khẩu mới' type='password'/>
            <Form.Input placeholder='Nhập lại mật khẩu mới' type='password'/>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button positive icon='checkmark' labelPosition='right'
                  content='Đổi mật khẩu'/>
          <Button negative onClick={handleClose} content='Hủy bỏ'/>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ChangePasswordModal;