import React, { Component } from 'react';
import {
  Button,
  Card,
  CardGroup,
  Container, Divider,
  Form,
  Grid, Header, Icon,
} from 'semantic-ui-react';
import axios from 'axios';

class App extends Component {

  state = {
    data: null,
    str: '',
    list: [],
  };

  componentDidMount () {
    document.title = 'Dict(k)';
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
    axios({
      method: 'get',
      url: 'http://localhost:3001/dictk/suggestion',
      params: {
        value,
      },
    }).then((res) => {
      if (res.data === []) {
        console.info('no suggestion');
        return;
      }
      // console.info(res.data);
      this.setState({
        list: res.data,
      });
    }).catch(error => {
      console.error(error);
    });
  };

  handleSubmit = () => {
    axios({
      method: 'get',
      url: 'http://localhost:3001/dictk',
      params: {
        value: this.state.str,
      },
    }).then((res) => {
      if (res.data === null) {
        this.setState({
          data: null,
        });
        console.info('no value');
        return;
      }
      // console.info(res.data);
      this.setState({
        data: res.data,
      });
    }).catch(error => {
      console.error(error);
    });
  };

  render () {
    const data = this.state.data;
    return (
      <Container fluid style={{ marginTop: '20px' }}>
        <Grid textAlign='center' style={{ height: '100%' }}
              verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column style={{ maxWidth: '70%' }}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group
                  widths='equal'
                >
                  <Form.Input
                    name='str'
                    value={this.state.str}
                    onChange={this.handleChange}
                    placeholder='Search...'
                    fluid
                    list='list'
                  />
                  <datalist id='list'>
                    {this.state.list.map(item =>
                      <option value={item} key={item}/>)}
                  </datalist>
                  <Button onClick={this.handleSubmit}>
                    Search
                  </Button>
                </Form.Group>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <CardGroup
              centered
              stackable>
              {data ?
                <Card style={{ width: 'auto' }} key={data.value}>
                  <Card.Content>
                    <Card.Header>
                      <Header as='h2'>{data.value}</Header>
                    </Card.Header>
                    <Card.Meta>
                      {data.pronunciation}
                    </Card.Meta>
                    {data.text.map(item => {
                        switch (item[0]) {
                          case '*':
                            return (
                              <Card.Description key={item}>
                                <Divider/>
                                <Header as='h3'><Icon name='angle right'/>{item.substring(3)}</Header>
                              </Card.Description>
                            );
                          case '-':
                            return (
                              <Card.Description key={item}>
                                <Header as='h5'>&emsp;{item.substring(2)}</Header>
                              </Card.Description>
                            );
                          case '=':
                          default:
                            return (
                              <Card.Description key={item}>
                                &emsp; &emsp;<Icon name='asterisk' size='small'/>{item.substring(1)}
                              </Card.Description>
                            );
                        }
                      },
                    )}
                  </Card.Content>
                </Card>
                : null
              }
            </CardGroup>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default App;