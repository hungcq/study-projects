import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Table } from 'semantic-ui-react';
import { sortBy } from 'lodash';
import TableHeader from '../../sub/TableHeader';
import '../Styles.css';
import { doSetData } from '../../../_actions/table-actions';
import PaginatedSortableTable from '../../sub/PaginatedSortableTable';
import {
  getCurrentItems, getFilteredData,
  getSortedData,
} from '../../../_selectors/table-selectors';

class MyAdminProgram extends Component {
  render () {
    return (
      <div>
        <Header as="h1" textAlign='center'>Danh sách chương trình đào
          tạo</Header>
        <MyConnectedTable/>
      </div>
    );
  }
}

class MyTable extends Component {

  componentDidMount () {
    this.props.setData(list, 10);
  }

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
              sortKey={'code'}>
              Mã CTĐT
            </TableHeader>
            <TableHeader
              sortKey={'name'}>
              Chương trình đào tạo
            </TableHeader>
            <TableHeader
              sortKey={'suggestedName'}>
              Gợi ý
            </TableHeader>
            <TableHeader
              sortKey={'type'}>
              Loại 1A/1B
            </TableHeader>
            <TableHeader
              sortKey={'theory'}>
              KC lớp LT
            </TableHeader>
            <TableHeader
              sortKey={'exercise'}>
              KC lớp BT
            </TableHeader>
            <TableHeader
              sortKey={'lab'}>
              KC lớp TH-TN
            </TableHeader>
            <TableHeader
              sortKey={'KCDA'}>
              KC ĐA
            </TableHeader>
            <Table.HeaderCell>
              Save
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currentItems.map(
            ({id, code, name, suggestedName, type, theory, exercise, lab, KCDA}) => (
              <Table.Row key={id}>
                <Table.Cell width={1}>{id}</Table.Cell>
                <Table.Cell width={1}>{code}</Table.Cell>
                <Table.Cell width={5}>{name}</Table.Cell>
                <Table.Cell width={2}>{suggestedName}</Table.Cell>
                <Table.Cell width={2}>{type}</Table.Cell>
                <Table.Cell width={1}>{theory}</Table.Cell>
                <Table.Cell width={1}>{exercise}</Table.Cell>
                <Table.Cell width={1}>{lab}</Table.Cell>
                <Table.Cell width={1}>{KCDA}</Table.Cell>
                <Table.Cell width={1}><Button>SAVE</Button></Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </PaginatedSortableTable>
    );
  }
}

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

const mapDispatchToProps = (dispatch) => ({
  setData: (list, itemsPerPage) => dispatch(doSetData(list, itemsPerPage)),
});

const MyConnectedTable = connect(mapStateToProps, mapDispatchToProps)(MyTable);

const list = [
  {
    id: 1,
    code: 'CD-A',
    name: 'CD-A Cao đẳng tại trường năm nhất',
    suggestedName: 'cd-a;cd-a',
    type: 'Loại 1A',
    theory: 1,
    exercise: 1,
    lab: 1,
    KCDA: 1,
  },
];

const AdminProgram = connect(null, null)(MyAdminProgram);
export default AdminProgram;