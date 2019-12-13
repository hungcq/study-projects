import React from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Header } from 'semantic-ui-react';
import { doLogout } from '../../_actions';
import { ClassList, LectureList, Footer } from '../';

class LecturerPage extends React.Component {
  componentDidMount () {

  }

  render () {
    return (
      <div>
        <Container>
          <Grid stackable style={style.grid}>
            <Grid.Column width={8}>
              <Header as='h3' content='Lecture List' style={style.h3}
                      textAlign='center'/>
              <LectureList/>
            </Grid.Column>
            <Grid.Column width={8}>
              <Header as='h3' content='Class List' style={style.h3}
                      textAlign='center'/>
              <ClassList/>
            </Grid.Column>
          </Grid>
        </Container>
        <Footer/>
      </div>
    );
  }
}

const style = {
  h1: {
    marginTop: '3em',
  },
  h2: {
    margin: '4em 0em 2em',
  },
  h3: {
    marginTop: '0em',
    padding: '2em 0em',
  },
  last: {
    marginBottom: '300px',
  },
  grid: {},
};

const mapStateToProps = (state) => {
  return {activeMenuItem: state.menu.activeMenuItem};
};

const mapDispatch = dispatch => {
  return {
    logout: () => dispatch(doLogout()),
  };
};

const connectedLecturer = connect(mapStateToProps, mapDispatch)(LecturerPage);
export { connectedLecturer as LecturerIndex };