import React, { Component } from 'react';
import './App.css';
import history from './_utils/history';
import { connect, Provider } from 'react-redux';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { Form, Grid, Header, Image, Input } from 'semantic-ui-react';
import configStore from './_utils/store';
import { doGetAuthInfo, doGetLoginData, loginElearning } from './_actions';
import {
  LectureForm,
  LectureLecturerPage,
  LecturerIndex,
  LectureStudentPage,
  LoginPage,
  MainMenu,
  ReplayPage,
  StudentIndex,
} from './_components';
import { accountTypes, localStorageKeys, routerPaths } from './_constants';
import { emitJoinLecture, getUsername, emitStartLecture } from './_utils';
import { NotificationContainer } from 'react-notifications';

const store = configStore();

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Main/>
      </Provider>
    );
  }
}

const studentRoute =
  (
    <Router history={history}>
      <Switch>
        <Route path={routerPaths.INDEX} name="Index" component={StudentIndex}/>
        <Route path={routerPaths.LECTURE} name="Lecture"
               component={LectureStudentPage}/>
        <Route path={routerPaths.REPLAY} name="Replay" component={ReplayPage}/>
        <Redirect from="/" to={routerPaths.INDEX}/>
      </Switch>
    </Router>
  );

const lecturerRoute =
  (
    <Router history={history}>
      <Switch>
        <Route path={routerPaths.INDEX} name="Index" component={LecturerIndex}/>
        <Route exact path={routerPaths.CREATE_LECTURE} name="Create Lecture"
               render={(props) => <LectureForm {...props} isEditing={false}/>}/>
        <Route path={routerPaths.EDIT_LECTURE} name="Edit Lecture"
               render={(props) => <LectureForm {...props} isEditing={true}/>}/>
        <Route path={routerPaths.LECTURE} name="Lecture"
               component={LectureLecturerPage}/>
        <Route path={routerPaths.REPLAY} name="Replay" component={ReplayPage}/>
        <Redirect from="/" to={routerPaths.INDEX}/>
      </Switch>
    </Router>
  );

const notLoggedIn =
  (
    <Router history={history}>
      <Switch>
        <Route path={routerPaths.LOGIN} name="Login" component={LoginPage}/>
        <Route path="/" name="Login" component={LoginPage}/>
      </Switch>
    </Router>
  );

class MyMain extends Component {
  state = {
    isFromElearning: false,
    elearningUserId: null,
    elearningLectureId: null,
    elearningPassword: '',
  };

  componentDidMount () {
    const query = new URLSearchParams(history.location.search);
    const userId = query.get('user_id');
    const urlPaths = history.location.pathname.split('/');
    if (urlPaths.length === 3 && urlPaths[1] === 'lecture' && urlPaths[2] && userId) {
      const loginData = localStorage.getItem(localStorageKeys.LOGIN_DATA);
      const elearningAccountId = localStorage.getItem(urlPaths[2] + 'accountId');
      const elearningCourseId = localStorage.getItem(urlPaths[2] + 'courseId');
      if (loginData && elearningAccountId && elearningCourseId) {
        const loginDataObject = JSON.parse(loginData);
        console.log(loginDataObject.id, elearningAccountId, elearningCourseId)
        if (loginDataObject.id === elearningAccountId && loginDataObject.id === userId) {
          if (!loginDataObject.permissions[elearningCourseId]) {
            this.setState({
              isFromElearning: true,
              elearningLectureId: urlPaths[2],
              elearningUserId: userId,
            });
            alert('You do not have permission to join this lecture');
            return;
          }
          this.props.getLoginData({
            user_info: loginDataObject,
            access_token: 'elearning',
            accounTypeElearning: loginDataObject.permissions[elearningCourseId]
              ? loginDataObject.permissions[elearningCourseId].roleType
              : 0,
          });
          emitStartLecture({
            lectureId: urlPaths[2],
            username: loginDataObject.id,
            elearning: true,
          });
          return;
        }
      }
      this.setState({
        isFromElearning: true,
        elearningLectureId: urlPaths[2],
        elearningUserId: userId,
      });
    } else {
      this.getUserInfo();
      const loginData = localStorage.getItem(localStorageKeys.LOGIN_DATA);
      if (loginData) {
        this.props.getLoginData(JSON.parse(loginData));
        this.checkLiveLecturePath(JSON.parse(loginData));
      }
    }
  }

  getUserInfo () {
    const query = new URLSearchParams(history.location.search);
    const tempToken = query.get('tempToken');
    if (tempToken) this.props.getAuthInfo(tempToken);
  }

  checkLiveLecturePath = (loginData) => {
    console.log(history.location.pathname);
    switch (history.location.pathname) {
      case routerPaths.CREATE_LECTURE:
        break;
      case routerPaths.LECTURE:
        break;
      case routerPaths.EDIT_LECTURE:
        break;
      case routerPaths.INDEX:
        break;
      case routerPaths.LOGIN:
        break;
      case routerPaths.REPLAY:
        break;
      default:
        // console.log('live lecture path', history.location.pathname);
        if (history.location.pathname.includes('/lecture/')) {
          const lectureId = history.location.pathname.replace('/lecture/', '');
          let accountType = null;
          if (loginData && loginData.user_info) {
            if (loginData.user_info.studentYear) {
              accountType = accountTypes.STUDENT;
            } else {
              accountType = accountTypes.LECTURER;
            }
          }
          if (loginData.user_info !== null && accountType !== null &&
            lectureId !== this.props.liveLecture.lectureId) {
            emitJoinLecture({
              lectureId,
              username: getUsername({
                userInfo: loginData.user_info,
                accountType,
              }),
            });
          }
        }
        break;
    }
  };

  loginUsingElearningAccount = (e) => {
    this.props.loginElearning(
      this.state.elearningUserId,
      this.state.elearningPassword,
      this.state.elearningLectureId);
  };

  render () {
    if (this.state.isFromElearning && (
      !this.props.auth || this.props.auth.accessToken !== 'elearning'
    )) {
      return (
        <div className='login-form'>
          <Grid textAlign='center' style={{height: '100%'}}
                verticalAlign='middle'>
            <Grid.Column style={{maxWidth: 450}}>
              <Header as='h2' color='grey' textAlign='center'>
                <Image src='/logo_hust.jpg'/> Login using Elearning account
              </Header>
              <Form size='large' onSubmit={this.loginUsingElearningAccount}>
                <Form.Input fluid value={this.state.elearningUserId}
                            readOnly/>
                <Form.Input
                  control={Input} placeholder='Password'
                  required type='password'
                  value={this.state.elearningPassword}
                  onChange={(e) => this.setState(
                    {elearningPassword: e.target.value})}
                />
                <Form.Button fluid size='large'>Login</Form.Button>
              </Form>
            </Grid.Column>
          </Grid>
        </div>
      );
    }

    const {userInfo, accountType} = this.props.auth;
    return (
      <div>
        {
          userInfo === null || accountType === null || this.props.auth.accessToken === 'elearning'
            ? null
            : <MainMenu/>
        }
        {
          userInfo === null || accountType === null
            ? notLoggedIn
            : (
              accountType === accountTypes.STUDENT
                ? studentRoute
                : lecturerRoute
            )
        }
        <NotificationContainer/>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  getLoginData: (loginData) => dispatch(doGetLoginData(loginData)),
  getAuthInfo: (tempToken) => dispatch(doGetAuthInfo(tempToken)),
  loginElearning: (username, password, lectureId) => dispatch(
    loginElearning(username, password, lectureId)),
});

const Main = connect(mapStateToProps, mapDispatchToProps)(MyMain);
export default App;