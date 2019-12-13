import React from 'react';
import { Container, Dropdown, Image, Menu } from 'semantic-ui-react';
import { doLogout, doSelectMenuItem } from '../_actions';
import { connect } from 'react-redux';
import { accountTypes, menuItems } from '../_constants';
import { confirmAlert } from 'react-confirm-alert';
import { getUsername } from '../_utils/index';
import 'react-confirm-alert/src/react-confirm-alert.css';

class MainMenu extends React.Component {

  state = {
    open: false,
    menuItem: '',
  };

  show = (menuItem) => {
    this.setState({
      open: true,
      menuItem,
    });
  };

  handleConfirm = (menuItem) => {
    this.setState({ open: false });
    this.props.selectMenuItem(menuItem);
  };

  handleCancel = () => {
    this.setState({ open: false });
  };

  onMenuClick = (menuItem) => {
    if (this.props.replay.lectureId !== '' || this.props.liveLecture.lectureId !== '') {
      confirmAlert({
        title: 'Confirm',
        message: 'Are you sure?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => this.handleConfirm(menuItem),
          },
          {
            label: 'No',
            onClick: () => this.handleCancel(),
          },
        ],
      });
    } else {
      this.props.selectMenuItem(menuItem);
    }
  };

  render() {
    const { activeMenuItem } = this.props.menu;
    const { accountType } = this.props.auth;
    const dropDownText = accountType === accountTypes.LECTURER ? 'Teaching' : 'Study';
    return (
      <Menu inverted stackable>
        <Container>
          <Menu.Item header
                     onClick={() => this.onMenuClick(menuItems.HOME)}
          >
            <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }}/>
            Hust Remote Study
          </Menu.Item>
          <Menu.Item
            active={activeMenuItem === menuItems.HOME}
            onClick={() => this.onMenuClick(menuItems.HOME)}
          >
            Home
          </Menu.Item>

          <Dropdown item simple text={dropDownText}>
            <Dropdown.Menu>
              <Dropdown.Item
                active={activeMenuItem === menuItems.CLASS_LIST}
                onClick={() => this.onMenuClick(menuItems.CLASS_LIST)}
              >
                Class List
              </Dropdown.Item>

              {accountType === accountTypes.LECTURER ?
                <Dropdown.Item
                  active={activeMenuItem === menuItems.LECTURE_LIST}
                  onClick={() => this.onMenuClick(menuItems.LECTURE_LIST)}
                >
                  Lecture List
                </Dropdown.Item>
                :
                <Dropdown.Item
                  active={activeMenuItem === menuItems.ON_GOING_LECTURE_LIST}
                  onClick={() => this.onMenuClick(menuItems.ON_GOING_LECTURE_LIST)}
                >
                  On-Going Lectures
                </Dropdown.Item>
              }
            </Dropdown.Menu>
          </Dropdown>
          {accountType === accountTypes.LECTURER ?
            <Menu.Item
              active={activeMenuItem === menuItems.CREATE_LECTURE}
              onClick={() => this.onMenuClick(menuItems.CREATE_LECTURE)}
            >
              Create Lecture
            </Menu.Item>
            : null
          }
          <Menu.Item position='right' onClick={() => this.props.logout(this.props.auth.accessToken)}>Logout</Menu.Item>
          {
            this.renderUserInfo()
          }
        </Container>
      </Menu>
    );
  }
  renderUserInfo = () => {
    if (!this.props.auth.userInfo) return null;
    if (this.props.auth.accountType === 'STUDENT' || this.props.auth.accountType === 'LECTURER') {
      return (
        <Menu.Item>Hello, {getUsername(this.props.auth).split('-')[0]}</Menu.Item>
      )
    } else return null;
  }
}

const mapState = state => state;

const mapDispatch = dispatch => ({
  selectMenuItem: (menuItem) => dispatch(doSelectMenuItem(menuItem)),
  logout: (ssoToken) => dispatch(doLogout(ssoToken)),
});

const connectedMainMenu = connect(mapState, mapDispatch)(MainMenu);
export { connectedMainMenu as MainMenu };