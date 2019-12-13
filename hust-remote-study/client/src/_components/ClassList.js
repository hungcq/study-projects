import React from 'react';
import { Item } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getUsername, isStudent } from '../_utils';
import { classService } from '../_services';
import { NotificationManager } from 'react-notifications';

class ClassList extends React.Component {

  state = {
    classList: [],
  };

  componentDidMount() {
    if (isStudent(this.props.auth)) {
      classService.getByStudentId(getUsername(this.props.auth))
      // classService.getByStudentId('20161846')
        .then(response => {
          if (response.data && response.data.data && Array.isArray(response.data.data)) {
            this.setState({
              classList: response.data.data,
            });
          }
        })
        .catch(error => {
          NotificationManager.error(JSON.stringify(error));
          console.log(JSON.stringify(error));
        })
        .then(() => {
          // always executed
        });
    } else {
      classService.getByTeacherId(getUsername(this.props.auth))
        .then(response => {
          if (response.data && response.data.data && Array.isArray(response.data.data)) {
            this.setState({
              classList: response.data.data,
            });
          }
        })
        .catch(error => {
          NotificationManager.error(JSON.stringify(error));
          console.log(JSON.stringify(error));
        })
        .then(() => {
          // always executed
        });
    }
  }

  render() {
    return (
      <div>
        {
          !isStudent(this.props.auth) ?
            <Item.Group divided>
              {this.state.classList.map(item => {
                return <Item key={item.id}>
                  <Item.Image src='/placeholder.png'/>
                  <Item.Content>
                    <Item.Header as='a'>Class ID: {item.classId}</Item.Header>
                    <Item.Meta>
                      <span>Last update: {new Date(
                        item.lastUpdate).toLocaleString()}</span>
                    </Item.Meta>
                    <Item.Description>
                      Semester: {item.semester}
                    </Item.Description>
                    <Item.Description>
                      Status: {item.status}
                    </Item.Description>
                    <Item.Description>
                      Teacher email: {item.teacherEmail}
                    </Item.Description>
                  </Item.Content>
                </Item>;
              })}
            </Item.Group>
            :
            <Item.Group divided>
              {this.state.classList.map(item => {
                return <Item key={item.id}>
                  <Item.Image src='/placeholder.png'/>
                  <Item.Content>
                    <Item.Header as='a'>{item.name} - {item.courseId}</Item.Header>
                    <Item.Meta>
                      <span>{item.studentNum} students</span>
                    </Item.Meta>
                    <Item.Meta>
                      <span>{item.info}</span>
                    </Item.Meta>
                    <Item.Description>
                      Class ID: {item.classId}
                    </Item.Description>
                    <Item.Description>
                      Schedule: {item.calendarInfo}
                    </Item.Description>
                    <Item.Description>
                      Semester: {item.semester}
                    </Item.Description>
                  </Item.Content>
                </Item>;
              })}
            </Item.Group>
        }
      </div>
    );
  }
}

const mapState = state => state;

const mapDispatch = (dispatch) => ({});

const connectedClassList = connect(mapState, mapDispatch)(ClassList);
export { connectedClassList as ClassList };