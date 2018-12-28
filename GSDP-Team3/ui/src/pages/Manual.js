import React, { Component } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import RobotService from 'services/Robot';

class Manual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      robots: [],
      overrideRobot: null,
      loading: {},
      currentMode: null,
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

  handleOverrideRobot = (id) => {
    RobotService.overrideRobot({ robot_id: id }).then((res) => {
      this.setState({ overrideRobot: this.state.robots.filter(robot => robot.id === id)[0]});
    });
  }

  handleManualRobot = (command) => {
    this.setState({ currentMode: command, loading: { [command]: true }});
    RobotService.sendManual({ robot_id: this.state.overrideRobot.id, command }).then(res => this.setState({ loading: {} }));
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
                Mac address
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
                  <Button size='small' onClick={() => this.handleOverrideRobot(robot.id)} disabled={!!this.state.overrideRobot}>Override</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <div style={{textAlign: 'left'}}>
          <Button disabled={!this.state.overrideRobot || this.state.loading.auto || ['auto', 'forward', 'left', 'right', 'backward'].includes(this.state.currentMode)} onClick={() => this.handleManualRobot('auto')}>
            Auto mode
          </Button>
          <Button color ='red' disabled={!this.state.overrideRobot || this.state.loading.stop || this.state.currentMode !== 'auto'} onClick={() => this.handleManualRobot('stop')}>
            Auto mode stop
          </Button>
        </div>
        <div style={{textAlign: 'center', marginTop: '1rem'}}>
          <Button icon size='big' disabled={!this.state.overrideRobot || this.state.loading.forward} onClick={() => this.handleManualRobot('forward')}>
            <Icon name='arrow up'/>
          </Button>
        </div>
        <div
          style={{textAlign: 'center', marginTop: '4px', marginBottom: '4px'}}>
          <Button icon size='big' disabled={!this.state.overrideRobot || this.state.loading.left} onClick={() => this.handleManualRobot('left')}>
            <Icon name='arrow left'/>
          </Button>
          <Button icon size='big' color ='red' disabled={!this.state.overrideRobot || this.state.loading.stop} onClick={() => this.handleManualRobot('stop')}>
            <Icon name='stop'/>
          </Button>
          <Button icon size='big' disabled={!this.state.overrideRobot || this.state.loading.right} onClick={() => this.handleManualRobot('right')}>
            <Icon name='arrow right'/>
          </Button>
        </div>
        <div style={{textAlign: 'center'}}>
          <Button icon size='big' disabled={!this.state.overrideRobot || this.state.loading.backward} onClick={() => this.handleManualRobot('backward')}>
            <Icon name='arrow down'/>
          </Button>
        </div>
      </div>
    );
  }
}

export default Manual;
