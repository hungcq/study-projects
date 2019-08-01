import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Dropdown, Header, Table } from 'semantic-ui-react';
import TableHeader from '../../sub/TableHeader';
import '../Styles.css';
import {
  doSetData,
  doSetFilter,
  doSetItemsPerPage,
} from '../../../_actions/table-actions';
import PaginatedSortableTable from '../../sub/PaginatedSortableTable';
import {
  getCurrentItems, getFilteredData,
  getSortedData,
} from '../../../_selectors/table-selectors';
import { filterTypes } from '../../../_constants/filter-types';
import SortItem from '../../sub/SortItem';

class MyAdminClassSize extends Component {

  componentDidMount () {
    this.props.setData(projectList, 10);
  }

  onItemsPerPageChanged = (e, {value}) => this.props.setItemsPerPage(value);

  render () {
    return (
      <div>
        <Header as="h1" textAlign='center'>Hệ số quy mô lớp</Header>
        <SortItem
          options={options}
          placeholder='Choose id'
          label='Choose id'
          fieldName='id'
          filterType={filterTypes.CONTAIN}
        />
        <Dropdown
          onChange={this.onItemsPerPageChanged}
          options={numbersOfItems}
          placeholder='Choose items per page'
          selection
          value={this.props.itemsPerPage}
        />
        <MyConnectedTable/>
      </div>
    );
  }
}

const options = [
  {key: 0, text: 'NONE', value: null},
  {key: 1, text: 'id contains 1', value: 1},
  {key: 2, text: 'id contains 2', value: 2},
  {key: 3, text: 'id contains 3', value: 3},
];

const numbersOfItems = [
  {key: 1, text: '5 items', value: 5},
  {key: 2, text: '10 items', value: 10},
  {key: 3, text: '15 items', value: 15},
];

class MyTable extends Component {

  render () {
    const {filteredData, itemsPerPage, currentItems} = this.props;
    return (
      <PaginatedSortableTable
        selectable={true}
        basic='very'
        data={filteredData}
        itemsPerPage={itemsPerPage}>
        <Table.Header>
          <Table.Row>
            <TableHeader
              sortKey={'id'}>
              ID
            </TableHeader>
            <TableHeader
              sortKey={'min'}>
              Sinh viên (Min)
            </TableHeader>
            <TableHeader
              sortKey={'max'}>
              Sinh viên (Max)
            </TableHeader>
            <TableHeader
              sortKey={'factor'}>
              Hệ số
            </TableHeader>
            <Table.HeaderCell>
              Save
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currentItems.map(
            ({id, min, max, factor}) => (
              <Table.Row key={id}>
                <Table.Cell width={2}>{id}</Table.Cell>
                <Table.Cell width={4}>{min}</Table.Cell>
                <Table.Cell width={4}>{max}</Table.Cell>
                <Table.Cell width={4}>{factor}</Table.Cell>
                <Table.Cell width={2}><Button>SAVE</Button></Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </PaginatedSortableTable>
    );
  }
}

const projectList = [
  {id: 1, min: 40, max: 100, factor: 1.5},
  {id: 2, min: 40, max: 100, factor: 1.5},
  {id: 3, min: 40, max: 100, factor: 1.5},
  {id: 4, min: 40, max: 100, factor: 1.5},
  {id: 5, min: 40, max: 100, factor: 1.5},
  {id: 6, min: 40, max: 100, factor: 1.5},
  {id: 7, min: 40, max: 100, factor: 1.5},
  {id: 8, min: 40, max: 100, factor: 1.5},
  {id: 9, min: 40, max: 100, factor: 1.5},
  {id: 10, min: 40, max: 100, factor: 1.5},
  {id: 11, min: 40, max: 100, factor: 1.5},
  {id: 12, min: 40, max: 100, factor: 1.5},
  {id: 13, min: 40, max: 100, factor: 1.5},
  {id: 14, min: 40, max: 100, factor: 1.5},
  {id: 15, min: 40, max: 100, factor: 1.5},
  {id: 16, min: 40, max: 100, factor: 1.5},
  {id: 17, min: 40, max: 100, factor: 1.5},
  {id: 18, min: 40, max: 100, factor: 1.5},
  {id: 19, min: 40, max: 100, factor: 1.5},
  {id: 20, min: 40, max: 100, factor: 1.5},
  {id: 21, min: 40, max: 100, factor: 1.5},
  {id: 22, min: 40, max: 100, factor: 1.5},
  {id: 23, min: 40, max: 100, factor: 1.5},
  {id: 24, min: 40, max: 100, factor: 1.5},
  {id: 25, min: 40, max: 100, factor: 1.5},
  {id: 26, min: 40, max: 100, factor: 1.5},
  {id: 27, min: 40, max: 100, factor: 1.5},
  {id: 28, min: 40, max: 100, factor: 1.5},
  {id: 29, min: 40, max: 100, factor: 1.5},
];

const mapStateToProps = state => {
  const {tableData, sortKey, itemsPerPage, pageNumber, isSortReverse, filterMap} = state.table;
  const filteredData = getFilteredData(tableData, filterMap);
  return {
    currentItems: getCurrentItems(
      getSortedData(filteredData, sortKey, isSortReverse),
      pageNumber, itemsPerPage),
    itemsPerPage,
    filteredData,
  };
};

const MyConnectedTable = connect(mapStateToProps, null)(MyTable);

const mapState = state => {
  return {
    filterMap: state.table.filterMap,
    itemsPerPage: state.table.itemsPerPage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setData: (list, itemsPerPage) => dispatch(doSetData(list, itemsPerPage)),
  setFilter: (fieldName, fieldValue, filterType) => dispatch(
    doSetFilter(fieldName, fieldValue, filterType)),
  setItemsPerPage: (itemsPerPage) => dispatch(doSetItemsPerPage(itemsPerPage)),
});

const AdminClassSize = connect(mapState, mapDispatchToProps)(
  MyAdminClassSize);
export default AdminClassSize;