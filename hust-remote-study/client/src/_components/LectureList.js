import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Item, Label } from 'semantic-ui-react';
import { accountTypes, lectureStatus, routerPaths } from '../_constants';
import history from '../_utils/history';
import { emitJoinLecture, emitStartLecture, getUsername } from '../_utils';
import { doFetchLectures } from '../_actions';

class LectureList extends React.Component {

  state = {
    lectureList: [],
  };

  componentDidMount() {
    this.props.fetchLectures(1000, 1);
  }

  onStartLecture = (item) => {
    history.push(routerPaths.lectureById(item.id));
    emitStartLecture({
      lectureId: item.id,
      username: getUsername(this.props.auth),
    });
  };

  onEditLecture = (item) => {
    history.push(routerPaths.editLecture(item.id));
  };

  onJoinLecture = (item) => {
    history.push(routerPaths.lectureById(item.id));
    emitJoinLecture({
      lectureId: item.id,
      username: getUsername(this.props.auth),
    });
  };

  onReplayLecture = item => {
    history.push(routerPaths.replayById(item.id));
  };

  render() {
    return (
      <Item.Group divided>
        {this.props.lecture.lectureList.map(item => {
          return <Item key={item.id}>
            <Item.Image src='/placeholder.png'/>
            <Item.Content>
              <Item.Header as='a'>{item.name} - Session: {item.session}</Item.Header>
              <Item.Meta>
                <span>Start: {new Date(item.startTime).toLocaleString()}</span>
              </Item.Meta>
              <Item.Meta>
                <span>End: {new Date(item.endTime).toLocaleString()}</span>
              </Item.Meta>
              <Item.Description>
                {item.description}
              </Item.Description>
              {this.props.auth.accountType === accountTypes.STUDENT ?
                <div>
                  {item.status === lectureStatus.ON_GOING ?
                    <Item.Extra>
                      <Button floated='right' primary onClick={() => this.onJoinLecture(item)}>
                        Join
                        <Icon name='chevron right'/>
                      </Button>
                      <Label>{getStatusText(item.status)}</Label>
                    </Item.Extra>
                    :
                    null
                  }
                  {item.status === lectureStatus.FINISHED ?
                    <Item.Extra>
                      <Button floated='right' primary onClick={() => this.onReplayLecture(item)}>
                        Replay
                        <Icon name='chevron right'/>
                      </Button>
                    </Item.Extra>
                    :
                    null
                  }
                </div>
                :
                <div>
                  {item.status === lectureStatus.START_SOON ?
                    <Item.Extra>
                      <Button floated='right' primary onClick={() => this.onEditLecture(item)}>
                        Edit
                        <Icon name='chevron right'/>
                      </Button>
                    </Item.Extra>
                    :
                    null
                  }
                  {item.status === lectureStatus.START_SOON ?
                    <Item.Extra>
                      <Button floated='right' primary onClick={() => this.onStartLecture(item)}>
                        Start
                        <Icon name='chevron right'/>
                      </Button>
                      <Label>{getStatusText(item.status)}</Label>
                    </Item.Extra>
                    :
                    null
                  }
                  {item.status === lectureStatus.ON_GOING ?
                    <Item.Extra>
                      <Button floated='right' primary onClick={() => this.onJoinLecture(item)}>
                        Continue
                        <Icon name='chevron right'/>
                      </Button>
                    </Item.Extra>
                    :
                    null
                  }
                  {item.status === lectureStatus.FINISHED ?
                    <Item.Extra>
                      <Button floated='right' primary onClick={() => this.onReplayLecture(item)}>
                        Replay
                        <Icon name='chevron right'/>
                      </Button>
                    </Item.Extra>
                    :
                    null
                  }
                </div>
              }
            </Item.Content>
          </Item>;
        })}
      </Item.Group>
    );
  }
}

const getStatusText = status => {
  switch (status) {
    case lectureStatus.START_SOON:
      return 'Start soon';
    case lectureStatus.ON_GOING:
      return 'On Going';
    case lectureStatus.FINISHED:
    default:
      return 'Finished';
  }
};

const mapStateToProps = state => state;

const mapDispatch = dispatch => {
  return { fetchLectures: (limit, page) => dispatch(doFetchLectures(limit, page)) };
};

const connectedLectureList = connect(mapStateToProps, mapDispatch)(LectureList);
export { connectedLectureList as LectureList };