import React, { Component } from 'react';
import { Button, Form, Grid, Modal } from 'semantic-ui-react';

class ProfileModal extends Component {

  render () {
    const {handleClose, modelOpen} = this.props;
    return (
      <Modal
        open={modelOpen}
        onClose={handleClose}
        size='small'
        style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '0%'}}
      >
        <Modal.Header>
          Profile
        </Modal.Header>
        <Modal.Content style={{paddingLeft: '7%', paddingRight: '7%'}}>
          <Form>
            <Grid columns='2' stackable>
              <Grid.Row>
                <Grid.Column>
                  <Form.Group>
                    <label className='modalLabel'>Mã số SV (*)</label>
                    <Form.Input size="mini" width={10}/>
                  </Form.Group>
                </Grid.Column>
                <Grid.Column>
                  <Form.Group>
                    <label className='modalLabel'>Ngành</label>
                    <Form.Input size="mini" width={10}/>
                  </Form.Group>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Form.Group>
                    <label className='modalLabel'>Họ và Tên (*)</label>
                    <Form.Input size="mini" width={10}/>
                  </Form.Group>
                </Grid.Column>
                <Grid.Column>
                  <Form.Group>
                    <label className='modalLabel'>Số CMT</label>
                    <Form.Input size="mini" width={10}/>
                  </Form.Group>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Form.Group>
                    <label className='modalLabel'>Ngày sinh (*)</label>
                    <Form.Input size="mini" width={10}/>
                  </Form.Group>
                </Grid.Column>
                <Grid.Column>
                  <Form.Group>
                    <label className='modalLabel'>Ghi chú</label>
                    <Form.Input size="mini" width={10}/>
                  </Form.Group>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Form.Group>
                    <label className='modalLabel'>Giới tính (*)</label>
                    <Form.Input size="mini" width={10}/>
                  </Form.Group>
                </Grid.Column>
                <Grid.Column>
                  <Form.Group>
                    <label className='modalLabel'>Nơi ở hiện tại</label>
                    <Form.Input size="mini" width={10}/>
                  </Form.Group>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Form.Group>
                    <label className='modalLabel'>Hệ đào tạo (*)</label>
                    <Form.Input size="mini" width={10}/>
                  </Form.Group>
                </Grid.Column>
                <Grid.Column>
                  <Form.Group>
                    <label className='modalLabel'>Xã/Phường</label>
                    <Form.Input size="mini" width={10}/>
                  </Form.Group>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Form.Group>
                    <label className='modalLabel'>Email (*)</label>
                    <Form.Input size="mini" width={10}/>
                  </Form.Group>
                </Grid.Column>
                <Grid.Column>
                  <Form.Group>
                    <label className='modalLabel'>Quận/Huyện</label>
                    <Form.Input size="mini" width={10}/>
                  </Form.Group>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Form.Group>
                    <label className='modalLabel'>Điện thoại (*)</label>
                    <Form.Input size="mini" width={10}/>
                  </Form.Group>
                </Grid.Column>
                <Grid.Column>
                  <Form.Group>
                    <label className='modalLabel'>Tỉnh/TP</label>
                    <Form.Input size="mini" width={10}/>
                  </Form.Group>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Form.Group>
                    <label className='modalLabel'>Lớp (*)</label>
                    <Form.Input size="mini" width={10}/>
                  </Form.Group>
                </Grid.Column>
                <Grid.Column>
                  <Form.Group>
                    <label className='modalLabel'>Khóa (*)</label>
                    <Form.Input size="mini" width={10}/>
                  </Form.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>

        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={handleClose}>
            No
          </Button>
          <Button positive icon='checkmark' labelPosition='right'
                  content='Yes'/>
        </Modal.Actions>
      </Modal>
    );
  }
}

const options = [
  {key: 'm', text: 'Male', value: 'male'},
  {key: 'f', text: 'Female', value: 'female'},
];

export default ProfileModal;