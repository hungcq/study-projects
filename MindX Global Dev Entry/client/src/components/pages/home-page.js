import React, { Component } from 'react';
import {
  Button, Container,
  Form,
  Grid,
  Header, Icon,
  Image,
  Message, Pagination,
  Segment, Select, Table,
} from 'semantic-ui-react';
import axios from 'axios';
import _ from 'lodash';

class Homepage extends Component {

  state = {
    authen: false,
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    fullname: '',
    error: '',
    page: 'register',
    list: [],
    pageNumber: 1,
    column: null,
    direction: null,
    filter: '',
  };

  componentDidMount () {
    document.title = 'Homepage';
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === 'filter') {
      localStorage.setItem('filter', e.target.value);
      this.setState({ pageNumber: 1 });
    }
  };

  handlePaginationChange = (e, { activePage }) => {
    if (isNaN(activePage)) {
      return;
    }
    this.setState({ pageNumber: activePage }, () => {
      this.handleSubmit();
    });
  };

  handleSubmit = () => {
    if (!this.state.username || !this.state.password) {
      this.setState({
        error: 'Username or password is null.',
      });
      return;
    }
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        error: 'Passwords do not match.',
      });
      return;
    }
    axios({
      method: 'post',
      url: `http://localhost:8452/news`,
      data: {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        fullname: this.state.fullname,
      },
    }).then((res) => {
      if (res.data.error) {
        this.setState({
          error: 'Username existed.',
        });
        return;
      }
      this.setState({
        authen: true,
      });
      this.getUserList();
    }).catch(error => {
      this.setState({
        error: 'Error.',
      });
      console.error(error);
    });
  };

  handleLogin = () => {
    if (!this.state.username || !this.state.password) {
      this.setState({
        error: 'Username or password is null.',
      });
      return;
    }
    axios({
      method: 'post',
      url: `http://localhost:8452/news/login`,
      data: {
        username: this.state.username,
        password: this.state.password,
      },
    }).then((res) => {
      if (res.data.error) {
        this.setState({
          error: res.data.error,
        });
        return;
      }
      this.setState({
        authen: true,
      });
      this.getUserList();
      console.log(res.data);
    }).catch(error => {
      this.setState({
        error: 'Error.',
      });
    });
  };

  getUserList = () => {
    console.log('on submit at url:');
    axios({
      method: 'get',
      url: `http://localhost:8452/news`,
    }).then((res) => {
      console.log(res.data);
      if (res.data.error) {
        console.error(res.data);
        return;
      }
      const column = localStorage.getItem('column');
      const direction = localStorage.getItem('direction');
      const filter = localStorage.getItem('filter');
      this.setState({
        list: res.data,
        column: column ? column : '',
        direction: direction ? direction : direction,
        filter: filter ? filter : '',
      });
      console.log(res.data);
    }).catch(error => {
      console.log(error);
    });
  };

  handleSort = (clickedColumn) => () => {
    const { column, list, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        list: _.sortBy(list, [clickedColumn]),
        direction: 'ascending',
      });
      localStorage.setItem('column', clickedColumn);
      localStorage.setItem('direction', 'ascending');
      return;
    }

    this.setState({
      list: list.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    });
    localStorage.setItem('direction',
      direction === 'ascending' ? 'descending' : 'ascending');
  };

  render () {
    let list = this.state.list;
    if (this.state.filter) {
      list = list.filter(item => {
        if (item.username.toLowerCase().
            includes(this.state.filter.toLowerCase()) ||
          item.fullname.toLowerCase().
            includes(this.state.filter.toLowerCase())) {
          return true;
        }
        return false;
      });
    }
    let lastItemIndex = this.state.pageNumber * 5;
    const firstItemIndex = lastItemIndex - 5;
    if (lastItemIndex > list.length) {
      lastItemIndex = list.length;
    }
    let numberOfPages = Math.floor(list.length / 5) + 1;
    if (list.length % 5 === 0) {
      numberOfPages -= 1;
    }
    list = list.slice(firstItemIndex, lastItemIndex);
    const { column, direction } = this.state;
    if (!this.state.authen) {
      if (this.state.page === 'register') {
        return (
          <Container>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Grid textAlign='center' style={{ height: '100%' }}
                  verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' textAlign='center'>
                  Register
                </Header>
                <Form size='large' onSubmit={this.handleSubmit}>
                  <Segment stacked>
                    <Form.Input
                      name='username'
                      fluid
                      icon='user'
                      iconPosition='left'
                      placeholder='Username'
                      onChange={this.handleChange}
                    />
                    <Form.Input
                      name='password'
                      fluid
                      icon='lock'
                      iconPosition='left'
                      placeholder='Password'
                      type='password'
                      onChange={this.handleChange}
                    />
                    <Form.Input
                      name='confirmPassword'
                      fluid
                      icon='lock'
                      iconPosition='left'
                      placeholder='Confirm password'
                      type='password'
                      onChange={this.handleChange}
                    />

                    <Form.Input
                      name='email'
                      fluid
                      placeholder='Email'
                      onChange={this.handleChange}
                    />

                    <Form.Input
                      name='fullname'
                      fluid
                      placeholder='Fullname'
                      onChange={this.handleChange}
                    />
                    <Button fluid size='large'>
                      Register
                    </Button>
                  </Segment>
                </Form>
                <Message error>
                  {this.state.error}
                </Message>
                <Message>
                  Already have an account?
                </Message>
                <Button
                  onClick={() => {
                    this.setState({ page: 'login' });
                  }}>Login</Button>
              </Grid.Column>
            </Grid>
          </Container>
        );
      } else {
        return (
          <Container>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Grid textAlign='center' style={{ height: '100%' }}
                  verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' textAlign='center'>
                  Login
                </Header>
                <Form size='large' onSubmit={this.handleLogin}>
                  <Segment stacked>
                    <Form.Input
                      name='username'
                      fluid
                      icon='user'
                      iconPosition='left'
                      placeholder='Username'
                      onChange={this.handleChange}
                    />
                    <Form.Input
                      name='password'
                      fluid
                      icon='lock'
                      iconPosition='left'
                      placeholder='Password'
                      type='password'
                      onChange={this.handleChange}
                    />

                    <Button fluid size='large'>
                      Login
                    </Button>
                  </Segment>
                </Form>
                <Message error>
                  {this.state.error}
                </Message>
                <Message>
                  Don't have an account?
                </Message>
                <Button
                  onClick={() => {this.setState({ page: 'register' });}}>
                  Register
                </Button>
              </Grid.Column>
            </Grid>
          </Container>
        );
      }
    } else {
      return (
        <Container>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <Header>
            {this.state.username}
          </Header>
          <Grid>
            <Grid.Row>
              <Grid.Column style={{ maxWidth: '70%' }}>
                <Form>
                  <Form.Input
                    name='filter'
                    label='Filter'
                    value={this.state.filter}
                    onChange={this.handleChange}
                    placeholder='Filter by username or fullname'
                    fluid
                  />
                </Form>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Table
                selectable
                celled
                sortable
              >
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell
                      sorted={column === 'username' ? direction : null}
                      onClick={this.handleSort('username')}>
                      Username
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={column === 'fullname' ? direction : null}
                      onClick={this.handleSort('fullname')}>
                      Fullname
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={column === 'email' ? direction : null}
                      onClick={this.handleSort('email')}>
                      Email
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {list.map(item => (
                    <Table.Row key={item._id}>
                      <Table.Cell width={5}>{item.username}</Table.Cell>
                      <Table.Cell width={5}>{item.fullname}</Table.Cell>
                      <Table.Cell width={6}>
                        {item.email}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell colSpan={4}>
                      <Pagination activePage={this.state.pageNumber}
                                  onPageChange={this.handlePaginationChange}
                                  totalPages={numberOfPages}
                                  siblingRange={1}
                                  boundaryRange={2}
                        // secondary
                        // pointing
                      />
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
            </Grid.Row>
          </Grid>
        </Container>
      );
    }
  }
}

export default Homepage;