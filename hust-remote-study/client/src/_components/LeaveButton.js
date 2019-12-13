import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

class LeaveButton extends React.Component {

  handleConfirm = () => {
    this.props.onConfirmAction();
  };

  render() {
    return (
      <div>
        <Button negative attached='bottom' onClick={this.show} data-toggle="modal"
                data-target="#myModal">
          {this.props.content}
        </Button>
        <div className="modal" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h4 className="modal-title">Confirm</h4>
              </div>

              <div className="modal-body">
                Are you sure?
              </div>

              <div className="modal-footer">
                <Button data-dismiss="modal">
                  <Icon name='remove'/> No
                </Button>
                <Button color='green' data-dismiss="modal" onClick={this.handleConfirm}>
                  <Icon name='checkmark'/> Yes
                </Button>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { LeaveButton };