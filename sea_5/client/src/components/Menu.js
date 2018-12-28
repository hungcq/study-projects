import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { doLogout } from '../actions';
import { menuItems } from '../constants';
import { doChangeMenuItem } from '../actions/menu-actions';
import { connect } from 'react-redux';

class MyMenu2 extends Component {

  onLogOut = (e, {name}) => {
    this.props.changeMenuItem(name);
    this.props.logout();
  };

  handleItemClick = (e, {name}) => {
    this.props.changeMenuItem(name);
  };

  render () {
    const {activeItem} = this.props;
    const loggedIn = this.props.auth.token !== null;
    return (
      <Menu pointing secondary size='large' style={{marginTop: '2%'}}>
        <Menu.Item
          name={menuItems.HOMEPAGE} active={activeItem === menuItems.HOMEPAGE}
          onClick={this.handleItemClick}>
          Homepage
        </Menu.Item>
        {loggedIn ?
          <Menu.Menu position='right'>
            <Menu.Item
              name={menuItems.PROFILE} active={activeItem === menuItems.PROFILE}
              onClick={this.handleItemClick}>
              Profile
            </Menu.Item>
            <Menu.Item
              onClick={this.onLogOut}
              name={menuItems.LOGOUT} active={activeItem === menuItems.LOGOUT}>
              Logout
            </Menu.Item>
          </Menu.Menu>
          :
          <Menu.Menu position='right'>
            <Menu.Item
              name={menuItems.LOGIN} active={activeItem === menuItems.LOGIN}
              onClick={this.handleItemClick}>
              Login
            </Menu.Item>
            <Menu.Item
              name={menuItems.SIGNUP} active={activeItem === menuItems.SIGNUP}
              onClick={this.handleItemClick}>
              Signup
            </Menu.Item>
          </Menu.Menu>
        }
      </Menu>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(doLogout()),
  changeMenuItem: (name) => dispatch(doChangeMenuItem(name)),
});

const MyMenu = connect(mapStateToProps, mapDispatchToProps)(MyMenu2);

export default MyMenu;