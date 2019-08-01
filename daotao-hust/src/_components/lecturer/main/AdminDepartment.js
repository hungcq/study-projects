import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Table } from 'semantic-ui-react';
import TableHeader from '../../sub/TableHeader';
import '../Styles.css';
import PaginatedSortableTable from '../../sub/PaginatedSortableTable';
import { doSetData } from '../../../_actions/table-actions';
import {
  getCurrentItems, getFilteredData,
  getSortedData,
} from '../../../_selectors/table-selectors';

class MyAdminDepartment extends Component {
  render () {
    return (
      <div>
        <Header as="h1" textAlign='center'>Danh sách đơn vị</Header>
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
              Mã đơn vị
            </TableHeader>
            <TableHeader
              sortKey={'name'}>
              Tên đơn vị
            </TableHeader>
            <TableHeader
              sortKey={'suggestedName'}>
              Tên gợi ý
            </TableHeader>
            <TableHeader
              sortKey={'type'}>
              Loại đơn vị
            </TableHeader>
            <TableHeader
              sortKey={'website'}>
              Website
            </TableHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currentItems.map(
            ({id, code, name, suggestedName, type, website}) => (
              <Table.Row key={id}>
                <Table.Cell width={1}>{id}</Table.Cell>
                <Table.Cell width={1}>{code}</Table.Cell>
                <Table.Cell width={4}>{name}</Table.Cell>
                <Table.Cell width={4}>{suggestedName}</Table.Cell>
                <Table.Cell width={2}>{type}</Table.Cell>
                <Table.Cell width={3}>{website}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </PaginatedSortableTable>
    );
  }
}

const list = [
  {
    id: 1,
    code: 'HUST',
    name: 'Trường Đại học Bách Khoa Hà Nội',
    suggestedName: 'hust;trường đại học bách khoa hà nội',
    type: 'University',
    website: 'soict.hust.edu.vn',
  },
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

const mapDispatchToProps = (dispatch) => ({
  setData: (list, itemsPerPage) => dispatch(doSetData(list, itemsPerPage)),
});

const MyConnectedTable = connect(mapStateToProps, mapDispatchToProps)(MyTable);

const AdminDepartment = connect(null, null)(
  MyAdminDepartment);
export default AdminDepartment;