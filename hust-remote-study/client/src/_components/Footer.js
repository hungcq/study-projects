import { Container, Grid, Header, List, Segment } from 'semantic-ui-react';
import React from 'react';

class Footer extends React.Component {

  render () {
    return (

      <Segment inverted vertical style={{
        margin: '5em 0em 0em',
        padding: '5em 0em',
      }}>
        <Container textAlign='center'>
          <Grid divided inverted stackable>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Hust Remote Study
              </Header>
              <p>
                Real-time e-learning system
              </p>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Developers'/>
              <List link inverted>
                <List.Item as='a' onClick={() => window.open(
                  'https://github.com/rt1918', '_blank')}>
                  Chu Quoc Hung
                </List.Item>
                <List.Item as='a' onClick={() => window.open(
                  'https://github.com/nadajokezy', '_blank')}>
                  Nguyen Quoc Huy
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={6}>
              <Header inverted as='h4' content='About'/>
              <List link inverted>
                <List.Item as='a' onClick={() => window.open(
                  'https://en.hust.edu.vn/home', '_blank')}>
                  Hanoi University of Science and Technology
                </List.Item>
                <List.Item as='a' onClick={() => window.open(
                  'https://soict.hust.edu.vn/en/', '_blank')}>
                  School of Information and Communication Technology
                </List.Item>
                <List.Item as='a'>ICT 59</List.Item>
              </List>
            </Grid.Column>
          </Grid>
        </Container>
      </Segment>
    );
  }
}

export { Footer as Footer };