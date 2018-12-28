import React, { Component } from 'react'
import { Button, Form, Header, Table } from 'semantic-ui-react'
import ShelfService from '../services/Shelf'

class Shelf extends Component {

  constructor (props) {
    super(props)
    this.state = {
      shelves: [],
      shelfId: '',
      locationX: '',
      locationY: '',
      newX: '',
      newY: ''
    }
  }

  componentDidMount () {
    this.fetchShelves()
  }

  fetchShelves () {
    ShelfService.getShelves().then((res) => {
      const shelves = res.data.shelves;
      if (shelves && shelves.length) {
        this.setState({
          shelves: shelves,
          shelfId: shelves ? shelves[0].shelf_id : '',
          locationX: shelves ? shelves[0].location_x : '',
          locationY: shelves ? shelves[0].location_y : ''
        });
      }
    })
  }

  editShelf = (shelfId) => {
    let shelf = null
    for (let i = 0; i < this.state.shelves.length; i++) {
      if (this.state.shelves[i].shelf_id === shelfId) {
        shelf = this.state.shelves[i]
      }
    }
    this.setState({
      shelfId: shelf.shelf_id,
      locationX: shelf.location_x,
      locationY: shelf.location_y
    })
  }

  onXChange = (event) => {
    this.setState({
      locationX: event.target.value
    })
  }

  onYChange = (event) => {
    this.setState({
      locationY: event.target.value
    })
  }

  onNewX = (event) => {
    this.setState({
      newX: event.target.value
    })
  }

  onNewY = (event) => {
    this.setState({
      newY: event.target.value
    })
  }

  updateShelf = () => {
    const data = {
      location_x: this.state.locationX,
      location_y: this.state.locationY
    }
    ShelfService.updateShelf(this.state.shelfId, data).then(() => this.fetchShelves())
  }

  removeShelf = () => {
    const id = this.state.shelfId
    ShelfService.deleteShelf(id).then(() => this.fetchShelves())
  }

  createShelf = () => {
    const data = {
      location_x: this.state.newX,
      location_y: this.state.newY
    }
    ShelfService.createShelf(data).then(() => this.fetchShelves())
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
                Shelf ID
              </Table.HeaderCell>
              <Table.HeaderCell>
                Location X
              </Table.HeaderCell>
              <Table.HeaderCell>
                Location Y
              </Table.HeaderCell>
              <Table.HeaderCell/>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.shelves.map((shelf) => (
              <Table.Row key={shelf.shelf_id}>
                <Table.Cell width={3}>{shelf.shelf_id}</Table.Cell>
                <Table.Cell width={5}>{shelf.location_x}</Table.Cell>
                <Table.Cell width={5}>{shelf.location_y}</Table.Cell>
                <Table.Cell width={3}>
                  <Button size='small'
                          color={shelf.shelf_id === this.state.shelfId ? 'blue' : null}
                          onClick={() => this.editShelf(shelf.shelf_id)}>
                    Edit
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Header>Edit Shelf</Header>
        <Form>
          <Form.Group widths='equal'>
            <Form.Input fluid
                        label='Shelf ID'
                        readOnly
                        value={this.state.shelfId}/>
            <Form.Input fluid
                        label='Location'
                        placeholder='New Location X'
                        onChange={this.onXChange}
                        value={this.state.locationX}/>
            <Form.Input fluid
                        label='Location'
                        placeholder='New Location Y'
                        onChange={this.onYChange}
                        value={this.state.locationY}/>
          </Form.Group>
          <Button type='submit' onClick={this.updateShelf}>Update</Button>
          <Button color='red' floated='right' onClick={this.removeShelf}>Remove</Button>
        </Form>
        <Header>New Shelf</Header>
        <Form>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Location X' placeholder='Location X'
                        onChange={this.onNewX}
                        value={this.state.newX}/>
            <Form.Input fluid label='Location Y' placeholder='Location Y'
                        onChange={this.onNewY}
                        value={this.state.newY}/>
          </Form.Group>
          <Button type='submit' onClick={this.createShelf}>Create</Button>
        </Form>
      </div>
    )
  }
}

export default Shelf
