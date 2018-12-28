import React, { Component } from 'react';
import { Button, Form, Header, Table } from 'semantic-ui-react';
import UserService from '../services/User'

class User extends Component {

  constructor (props) {
    super(props)
    this.state = {
      users: [],
      userId: '',
      password: '',
      userClass: '',
      newUsername: '',
      newPassword: '',
      newUserClass: '',
    }
  }

  componentDidMount () {
    this.fetchUsers()
  }

  fetchUsers () {
    UserService.getUsers().then((res) => {
      const users = res.data;
      if (users && users.length) {
        this.setState({
          users: users,
          userId: users ? users[0].id : '',
          userClass: users ? users[0].user_class : ''
        });
      }
    })
  }

  editUser = (userId) => {
    let user = null
    for (let i = 0; i < this.state.users.length; i++) {
      if (this.state.users[i].id === userId) {
        user = this.state.users[i]
      }
    }
    this.setState({
      userId: user.id,
      userClass: user.user_class
    })
  }

  onPasswordChange = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  onUserClassChange = (e, {value}) => {
    this.setState({
      userClass: value
    })
  }

  onNewUsername = (event) => {
    this.setState({
      newUsername: event.target.value
    })
  }

  onNewPassword = (event) => {
    this.setState({
      newPassword: event.target.value
    })
  }

  onNewUserClass = (e, {value}) => {
    this.setState({
      newUserClass: value
    })
  }

  updateUser = () => {
    const data = {
      password: this.state.password,
      user_class: this.state.userClass
    }
    UserService.updateUser(this.state.userId, data).then(() => this.fetchUsers())
  }

  removeUser = () => {
    const id = this.state.userId
    UserService.deleteUser(id).then(() => this.fetchUsers())
  }

  createUser = () => {
    const data = {
      username: this.state.newUsername,
      password: this.state.newPassword,
      user_class: 1
    }
    UserService.createUser(data).then(() => this.fetchUsers())
  }

  render () {
    return (
      <div>
        <Table
          selectable
          celled
          compact
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                User ID
              </Table.HeaderCell>
              <Table.HeaderCell>
                Username
              </Table.HeaderCell>
              <Table.HeaderCell>
                User Class
              </Table.HeaderCell>
              <Table.HeaderCell/>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.users.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell width={3}>{user.id}</Table.Cell>
                <Table.Cell width={5}>{user.username}</Table.Cell>
                <Table.Cell width={5}>{user.user_class}</Table.Cell>
                <Table.Cell width={3}>
                  <Button size='small'
                          color={user.id === this.state.userId ? 'blue' : null}
                          onClick={() => this.editUser(user.id)}>
                    Edit
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Header>Edit User</Header>
        <Form>
          <Form.Group widths='equal'>
            <Form.Input fluid label='User ID' readOnly
                        value={this.state.userId}/>
            <Form.Input fluid label='Password' type='password'
                        placeholder='New Password'
                        onChange={this.onPasswordChange}/>
            <Form.Select fluid label='User Class' options={userClasses}
                         placeholder='User Class'
                         onChange={this.onUserClassChange}
                         value={this.state.userClass}/>
          </Form.Group>
          <Button type='submit' onClick={this.updateUser}>Update</Button>
          <Button color='red' floated='right' onClick={this.removeUser}>Remove</Button>
        </Form>
        <Header>New User</Header>
        <Form>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Username' placeholder='Username'
                        onChange={this.onNewUsername}
                        value={this.state.newUsername}/>
            <Form.Input fluid label='Password' type='password'
                        placeholder='Password'
                        onChange={this.onNewPassword}
                        value={this.state.newPassword}/>
            <Form.Select fluid label='User Class' options={userClasses}
                         placeholder='User Class'
                         onChange={this.onNewUserClass}
                         value={this.state.newUserClass}/>
          </Form.Group>
          <Button type='submit' onClick={this.createUser}>Create</Button>
        </Form>
      </div>
    );
  }
}

const userClasses = [
  // {key: 'u', text: 'User', value: 3},
  // {key: 's', text: 'Supervisor', value: 2},
  {key: 'a', text: 'Admin', value: 1},
];

export default User;
