import React, { Component } from 'react';
import { Container, Form, Grid, Header, Select } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { lectureService, classService } from '../../_services';
import history from '../../_utils/history';
import { NotificationManager } from 'react-notifications';
import { getUsername } from '../../_utils';

class LectureForm extends Component {

  constructor (props) {
    super(props);
    this.fileInput = React.createRef();
  }

  state = {
    name: '',
    classId: '',
    session: 1,
    startTime: new Date(),
    endTime: new Date(),
    description: '',
    password: '',
    teacherIds: [],
    slide: '',
    publiclyOpen: false,
    maxLateTime: 15,
    classIds: [],
  };

  componentDidMount () {
    const {isEditing} = this.props;
    if (isEditing) {
      lectureService.getById(this.props.match.params.id).then(response => {
        console.log(response.data);
        this.setState({
          ...response.data,
        });
      }).catch(error => {
        NotificationManager.error(JSON.stringify(error));
        console.log(JSON.stringify(error));
      }).then(() => {
        // always executed
      });
    }
    classService.getByTeacherId(getUsername(this.props.auth)).then(response => {
      const classIds = response.data.data.map(item => {
        return {key: item.classId, text: item.classId, value: item.classId};
      });
      this.setState({
        classIds,
        classId: classIds.length > 0 ? classIds[0].value : ''
      });
    }).catch(error => {
      NotificationManager.error(JSON.stringify(error));
      console.log(JSON.stringify(error));
    }).then(() => {
      // always executed
    });
  }

  onChange = (e, {name, value}) => {
    this.setState({
      [name]: value,
    });
  };

  onCheckBoxChange = e => {
    this.setState({publiclyOpen: !this.state.publiclyOpen});
  };

  onSubmit = (e) => {
    const {isEditing} = this.props;
    const data = this.state;
    data.startTime = Date.parse(data.startTime);
    data.endTime = Date.parse(data.endTime);
    data.teacherIds = JSON.stringify(data.teacherIds);
    if (isEditing) {
      lectureService.update(this.props.match.params.id, this.state,
        this.fileInput.current.files[0]).then(response => {
        NotificationManager.info('Lecture successfully edited.');
        history.goBack();
      }).catch(error => {
        if (error.response && error.response.data &&
          error.response.data.error) {
          NotificationManager.error(error.response.data.error);
        }
      }).then(() => {
        // always executed
      });
    } else {
      lectureService.create(this.state, this.fileInput.current.files[0]).
        then(response => {
          NotificationManager.info('Lecture successfully created.');
          history.goBack();
        }).
        catch(error => {
          if (error.response && error.response.data &&
            error.response.data.error) {
            NotificationManager.error(error.response.data.error);
          }
        }).
        then(() => {
          // always executed
        });
    }
  };

  render () {
    const {isEditing} = this.props;
    let header = '';
    if (isEditing) {
      header = 'Edit Lecture';
    } else {
      header = 'Create Lecture';
    }
    const username = getUsername(this.props.auth);
    const teacherIds = [
      {key: username, text: username, value: username},
    ];
    return (
      <Container>
        <Grid style={{height: '100%'}}
              verticalAlign='middle'>
          <Grid.Column>
            <Header as='h1' textAlign='center'>
              {header}
            </Header>
            <Form onSubmit={this.onSubmit}>
              <Form.Input label='Name'
                          name='name'
                          value={this.state.name}
                          onChange={this.onChange}/>
              <Form.Field
                name='classId'
                control={Select}
                options={this.state.classIds}
                label='Class Id'
                value={this.state.classId}
                onChange={this.onChange}
                placeholder='Class Id'
              />
              <Form.Input label='Session'
                          name='session'
                          type='number'
                          value={this.state.session}
                          onChange={this.onChange}/>
              <Form.Input label='Description'
                          name='description'
                          value={this.state.description}
                          onChange={this.onChange}/>
              <Form.Input label='Password'
                          name='password'
                          type='password'
                          value={this.state.password}
                          onChange={this.onChange}/>

              <Form.Field
                name='teacherIds'
                control={Select}
                options={teacherIds}
                label='Teacher(s)'
                value={this.state.teacherIds}
                onChange={this.onChange}
                placeholder='Teacher(s)'
                multiple
              />
              <Form.Input label='Start time'
                          name='startTime'
                          type='datetime-local'
                          value={this.state.startTime}
                          onChange={this.onChange}/>
              <Form.Input label='End time'
                          name='endTime'
                          type='datetime-local'
                          value={this.state.endTime}
                          onChange={this.onChange}/>
              <Form.Field>
                <label>Slide Upload</label>
                <input type='file' ref={this.fileInput}/>
              </Form.Field>
              <Form.Checkbox label='Publicly open'
                             name='publiclyOpen'
                             checked={this.state.publiclyOpen}
                             onChange={this.onCheckBoxChange}/>
              <Form.Input label='Max late time (minutes)'
                          name='maxLateTime'
                          type='number'
                          value={this.state.maxLateTime}
                          onChange={this.onChange}/>
              <Form.Button content='Submit'/>
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({});

const connectedLectureForm = connect(mapStateToProps, mapDispatchToProps)(
  LectureForm);

export { connectedLectureForm as LectureForm };
