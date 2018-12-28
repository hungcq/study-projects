import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import auth from '../utils/auth';
import history from 'utils/history';

class MyMenu extends Component {

  onLogOut = () => {
    auth.setAccessToken(null);
    localStorage.clear();
  };

  render () {
    return (
      <Menu size='large' style={{marginTop: '2%'}}>
        <Menu.Item onClick={() => history.push('/robot')}>
          Show robots
        </Menu.Item>
        <Menu.Item onClick={() => history.push('/manual')}>
          Manual override
        </Menu.Item>
        {/*<Menu.Item onClick={() => history.push('/order')}>*/}
          {/*Show orders*/}
        {/*</Menu.Item>*/}
        <Menu.Item onClick={() => history.push('/packet')}>
          Show packets
        </Menu.Item>
        <Menu.Item onClick={() => history.push('/shelf')}>
          Show shelves
        </Menu.Item>
        {/*<Menu.Item onClick={() => history.push('/sensor')}>*/}
          {/*Show sensor info*/}
        {/*</Menu.Item>*/}
        <Menu.Item onClick={() => history.push('/user')}>
          Show users
        </Menu.Item>
        <Menu.Item
          position='right'
          onClick={this.onLogOut}>
          Logout
        </Menu.Item>
      </Menu>
    );
  }
}

export default MyMenu;