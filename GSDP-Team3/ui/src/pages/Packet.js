import React, { Component } from 'react'
import { Button, Form, Header, Table } from 'semantic-ui-react'
import PacketService from '../services/Packet'

class Packet extends Component {

  constructor (props) {
    super(props)
    this.state = {
      packets: [],
      packetId: '',
      lpar: '',
      tpar: '',
      width: '',
      height: '',
      length: '',
      newBarcode: '',
      newLpar: '',
      newTpar: '',
    }
  }

  componentDidMount () {
    this.fetchPackets()
  }

  fetchPackets () {
    PacketService.getPackets().then((res) => {
      const packets = res.data.packets
      if (packets && packets.length) {
        this.setState({
          packets: packets,
          packetId: packets ? packets[0].packet_id : '',
          lpar: packets ? packets[0].light_param : '',
          tpar: packets ? packets[0].temp_param : ''
        })
      }
    })
  }

  editPacket = (packetId) => {
    let packet = null
    for (let i = 0; i < this.state.packets.length; i++) {
      if (this.state.packets[i].packet_id === packetId) {
        packet = this.state.packets[i]
      }
    }
    this.setState({
      packetId: packet.packet_id,
      lpar: packet.light_param,
      tpar: packet.temp_param
    })
  }

  onLparChange = (event) => {
    this.setState({
      lpar: event.target.value
    })
  }

  onTparChange = (event) => {
    this.setState({
      tpar: event.target.value
    })
  }

  onNewWidth = (event) => {
    this.setState({
      width: event.target.value
    })
  }

  onNewHeight = (event) => {
    this.setState({
      height: event.target.value
    })
  }

  onNewLength = (event) => {
    this.setState({
      length: event.target.value
    })
  }

  onNewBarcode = (event) => {
    this.setState({
      newBarcode: event.target.value
    })
  }

  onNewLpar = (event) => {
    this.setState({
      newLpar: event.target.value
    })
  }

  onNewTpar = (event) => {
    this.setState({
      newTpar: event.target.value
    })
  }

  updatePacket = () => {
    const data = {
      light_param: this.state.lpar,
      temp_param: this.state.tpar
    }
    PacketService.updatePacket(this.state.packetId, data).then(() => this.fetchPackets())
  }

  removePacket = () => {
    const id = this.state.packetId
    PacketService.deletePacket(id).then(() => this.fetchPackets())
  }

  createPacket = () => {
    const data = {
      width: this.state.width,
      height: this.state.height,
      length: this.state.length,
      barcode: this.state.newBarcode,
      light_param: this.state.newLpar,
      temp_param: this.state.newTpar
    }
    PacketService.createPacket(data).then(() => this.fetchPackets())
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
                Packet ID
              </Table.HeaderCell>
              <Table.HeaderCell>
                Shelf ID
              </Table.HeaderCell>
              <Table.HeaderCell>
                Width
              </Table.HeaderCell>
              <Table.HeaderCell>
                Height
              </Table.HeaderCell>
              <Table.HeaderCell>
                Length
              </Table.HeaderCell>
              <Table.HeaderCell>
                BarCode
              </Table.HeaderCell>
              <Table.HeaderCell>
                Light Param
              </Table.HeaderCell>
              <Table.HeaderCell>
                Temp Param
              </Table.HeaderCell>
              <Table.HeaderCell/>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.packets.map((packet) => (
              <Table.Row key={packet.packet_id}>
                <Table.Cell width={2}>{packet.packet_id}</Table.Cell>
                <Table.Cell width={2}>{packet.shelf_id ? packet.shelf_id : ''}</Table.Cell>
                <Table.Cell width={1}>{packet.width}</Table.Cell>
                <Table.Cell width={1}>{packet.height}</Table.Cell>
                <Table.Cell width={1}>{packet.length}</Table.Cell>
                <Table.Cell width={2}>{packet.barcode}</Table.Cell>
                <Table.Cell width={2}>{packet.light_param}</Table.Cell>
                <Table.Cell width={2}>{packet.temp_param}</Table.Cell>
                <Table.Cell width={2}>
                  <Button size='small'
                          color={packet.packet_id === this.state.packetId ? 'blue' : null}
                          onClick={() => this.editPacket(packet.packet_id)}>Edit</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Header>Edit Packet</Header>
        <Form>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Packet ID' readOnly
                        value={this.state.packetId}/>
            <Form.Input fluid label='Light Param' placeholder='New LPar'
                        value={this.state.lpar}
                        onChange={this.onLparChange}/>
            <Form.Input fluid label='Temp Param' placeholder='New TPar'
                        value={this.state.tpar}
                        onChange={this.onTparChange}/>
          </Form.Group>
          <Button type='submit' onClick={this.updatePacket}>Update</Button>
          <Button color='red' floated='right' onClick={this.removePacket}>Remove</Button>
        </Form>
        <Header>New Packet</Header>
        <Form>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Width' placeholder='Width'
                        onChange={this.onNewWidth}
                        value={this.state.width}/>
            <Form.Input fluid label='Height' placeholder='Height'
                        onChange={this.onNewHeight}
                        value={this.state.height}/>
            <Form.Input fluid label='Length' placeholder='Length'
                        onChange={this.onNewLength}
                        value={this.state.length}/>
            <Form.Input fluid label='BarCode' placeholder='BarCode'
                        onChange={this.onNewBarcode}
                        value={this.state.newBarcode}/>
            <Form.Input fluid label='Light Param' placeholder='Light Param'
                        onChange={this.onNewLpar}
                        value={this.state.newLpar}/>
            <Form.Input fluid label='Temp Param' placeholder='Temp Param'
                        onChange={this.onNewTpar}
                        value={this.state.newTpar}/>
          </Form.Group>
          <Button type='submit' onClick={this.createPacket}>Create</Button>
        </Form>
      </div>
    )
  }
}

export default Packet
