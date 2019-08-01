import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Form, Divider, Grid, Image, Icon, Modal, Header } from 'semantic-ui-react';
import { doLogin } from '../../_actions';

class MyGuest extends Component {
  state = {
    username: '',
    password: '',
    openModal: false
  };

  onUsernameChanged = (event) => {
    this.setState({ username: event.target.value });
  };

  onPasswordChanged = (event) => {
    this.setState({ password: event.target.value });
  };

  onButtonClicked = () => {
    const { username, password } = this.state;
    this.props.login(username, password);
  };

  render() {
    console.log(this.props);
    const { username, password } = this.state;
    return (
      <Container fluid style={{
        position: 'absolute !important',
        zIndex: '99',
        backgroundColor: '#F1F1F1',
        paddingLeft: '4%',
        paddingRight: '4%',
        paddingTop: '2%',
        paddingBottom: '2%',
      }}
      >
        <Container textAlign="right" fluid style={{
          paddingLeft: '1%',
          paddingRight: '1%',
          paddingTop: '1%',
        }}
        >
          {/*<Image*/}
          {/*src="https://www.yueimg.com/en/images/common/avatar.b6a87.png"*/}
          {/*href="#"*/}
          {/*size="mini"*/}
          {/*/>*/}
          <a onClick={() => { }}
            href="#"
          >
            <Icon name="facebook square" color="blue" />
          </a>
          <a
            href="#"
          >-
          </a>
          <a onClick={() => { }}
            href="#"
          >
            <Icon name="google" color="red" />
          </a>
          <a onClick={() => {
            this.setState({ openModal: true });
          }}
            href="#"
          >
            - Đăng nhập
          </a>
          <Divider />
        </Container>
        <Container fluid
          style={{ paddingLeft: '1%', paddingRight: '1%' }}
        >
          <Grid>
            <Grid.Column>
              <Image
                src="http://daotao.soict.hust.edu.vn/images/logo.png"
              />
            </Grid.Column>
            <Grid.Column width={15} verticalAlign="bottom">
              <div style={{ fontSize: '1.2em', marginBottom: '3px' }}>HỆ
                THỐNG QUẢN LÝ GIẢNG DẠY, ĐỒ ÁN VÀ DỊCH VỤ TRỰC TUYẾN
              </div>
              <div style={{ fontSize: '0.9em' }}>VIỆN CÔNG NGHỆ THÔNG TIN
                VÀ TRUYỀN THÔNG
              </div>
            </Grid.Column>
          </Grid>
          <Divider />
        </Container>

        {
          this.props.data.webSetting
            ? (
              <div className="Container" dangerouslySetInnerHTML={{
                __html: this.props.data.webSetting.homeInfo
              }}
              />
            )
            : null
        }
        <Modal
          open={this.state.openModal}
          onClose={() => { this.setState({ openModal: false }); }}
          basic
          // dimmer="inverted"
          size="small"
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '20%'
          }}
        >
          <Form>
            <Form.Field>
              <label>Username</label>
              <input placeholder="Username" value={username} onChange={this.onUsernameChanged} />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input placeholder="password" type="password" value={password} onChange={this.onPasswordChanged} />
            </Form.Field>
            <Button type="submit" onClick={this.onButtonClicked}>Login</Button>
          </Form>
          {/* <Modal.Header>Select a Photo</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Header>Default Profile Image</Header>
              <p>We've found the following gravatar image associated with your e-mail address.</p>
              <p>Is it okay to use this photo?</p>
            </Modal.Description>
          </Modal.Content> */}
        </Modal>

      </Container>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(doLogin(username, password)),
});

const Guest = connect(mapStateToProps, mapDispatchToProps)(MyGuest);

export default Guest;