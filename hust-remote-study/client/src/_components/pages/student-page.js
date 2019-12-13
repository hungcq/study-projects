import React from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Header } from 'semantic-ui-react';
import { doLogout } from '../../_actions';
import { lectureService } from '../../_services';
import { ClassList, Footer, LectureList } from '../';

class StudentPage extends React.Component {
  state = {
    lectureList: [],
  };

  componentDidMount () {
    lectureService.get().then(response => {
      this.setState({
        lectureList: response.data,
      });
    }).catch(error => {
      console.log(error);
    }).then(() => {
      // always executed
    });
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

const connectedStudent = connect(mapStateToProps, mapDispatch)(StudentPage);
export { connectedStudent as StudentIndex };