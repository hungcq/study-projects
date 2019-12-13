import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { roomActionTypes, accountTypes, slideTypes } from '../_constants';
import { emitPerformActionLecture, getUsername } from '../_utils';

class DocumentList extends React.Component {

  onShowDoc = (item) => {
    const data = {
      lectureId: this.props.lectureId,
      actionType: roomActionTypes.CHANGE_SLIDE,
      slideUrl: item.url,
      username: getUsername(this.props.auth),
      slideType: item.slideType,
    };
    emitPerformActionLecture(data);
  };

  onStopDoc = (item) => {
    const data = {
      lectureId: this.props.lectureId,
      actionType: roomActionTypes.CHANGE_SLIDE,
      slideUrl: '',
      username: getUsername(this.props.auth),
      slideType: item.slideType,
    };
    emitPerformActionLecture(data);
  };

  render() {
    const { replaying } = this.props;
    return (
      <Table
        selectable
        celled
        compact
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Document Name
            </Table.HeaderCell>
            <Table.HeaderCell>
              Status
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.props.documentList.map(item => (
            <Table.Row key={item.url}>
              <Table.Cell width={3}>{item.title}</Table.Cell>
              <Table.Cell width={3}>
                {this.props.slideUrl === item.url ?
                  <Button size='small' basic
                          color={this.props.auth.accountType === accountTypes.STUDENT
                            ? 'blue'
                            : 'red'}
                          content={this.props.auth.accountType === accountTypes.STUDENT
                            ? 'Displaying'
                            : 'Stop'}
                          onClick={() => this.onStopDoc(item)}
                          disabled={this.props.auth.accountType === accountTypes.STUDENT || replaying}
                  />
                  :
                  <Button size='small' basic color='blue'
                          onClick={() => this.onShowDoc(item)}
                          disabled={this.props.auth.accountType === accountTypes.STUDENT || replaying}
                  >
                    Display
                  </Button>
                }
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}

const mapState = state => state;

const mapDispatch = (dispatch) => ({
});

const connectedDocumentList = connect(mapState, mapDispatch)(DocumentList);
export { connectedDocumentList as DocumentList };