import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import RobotService from 'services/Robot';

class Robot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      robots: [],
      macAdress: '',
    }
  }

  componentDidMount() {
    this.fetchRobots();
  }

  fetchRobots() {
    RobotService.getRobots().then((res) => {
      this.setState({ robots: res.data.robots });
    });
  }

  handleMacAddressChange = (e) => {
    this.setState({ macAdress: e.target.value });
  }

  removeRobot = (id) => {
    RobotService.deleteRobot(id).then(() => this.fetchRobots());
  }

  createRobot = () => {
    if (this.state.macAdress) {
      RobotService.createRobot({ mac_address: this.state.macAdress }).then(() => {
        this.fetchRobots();
        this.setState({ macAddress: '' });
      });
    }
  }

  render () {
    return (
      <div>
        <Table
          selectable
          celled
          compact
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                Robot ID
              </Table.HeaderCell>
              <Table.HeaderCell>
                Location
              </Table.HeaderCell>
              <Table.HeaderCell>
                Mac Address
              </Table.HeaderCell>
              <Table.HeaderCell/>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.robots.map(robot => (
              <Table.Row key={robot.id}>
                <Table.Cell width={3}>{robot.id}</Table.Cell>
                <Table.Cell width={5}>{robot.current_location_x} - {robot.current_location_y}</Table.Cell>
                <Table.Cell width={5}>{robot.mac_address}</Table.Cell>
                <Table.Cell width={3}>
                  <Button size='small' color='red' onClick={() => this.removeRobot(robot.id)}>Remove</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <input
          name="mac-address"
          onChange={this.handleMacAddressChange}
          value={this.state.macAddress}
          className="form-control pull-left"
          style={{ width: '300px'}}
        />
        <Button
          size='small'
          color='blue'
          className="pull-right"
          onClick={this.createRobot}
          disabled={!this.state.macAdress}
        >Create</Button>
      </div>
    );
  }
}

export default Robot;
