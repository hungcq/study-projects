import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Table } from 'semantic-ui-react';
import TableHeader from '../../sub/TableHeader';
import '../Styles.css';
import { doSetData } from '../../../_actions/table-actions';
import PaginatedSortableTable from '../../sub/PaginatedSortableTable';
import {
  getCurrentItems, getFilteredData,
  getSortedData,
} from '../../../_selectors/table-selectors';

class MyAdminTitle extends Component {
  render () {
    return (
      <div>
        <Header as="h1" textAlign='center'>Danh sách chức danh</Header>
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
              Mã chức danh
            </TableHeader>
            <TableHeader
              sortKey={'name'}>
              Tên chức danh
            </TableHeader>
            <TableHeader
              sortKey={'teach'}>
              Giờ chuẩn giảng dạy
            </TableHeader>
            <TableHeader
              sortKey={'research'}>
              Giờ chuẩn nghiên cứu
            </TableHeader>
            <TableHeader
              sortKey={'factor'}>
              Hệ số chức danh
            </TableHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currentItems.map(
            ({id, code, name, teach, research, factor}) => (
              <Table.Row key={id}>
                <Table.Cell width={1}>{id}</Table.Cell>
                <Table.Cell width={2}>{code}</Table.Cell>
                <Table.Cell width={4}>{name}</Table.Cell>
                <Table.Cell width={3}>{teach}</Table.Cell>
                <Table.Cell width={3}>{research}</Table.Cell>
                <Table.Cell width={3}>{factor}</Table.Cell>
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
    id: 1, code: 'GVC-TS', name: 'Giảng Viên Chính - Tiến Sỹ',
    teach: '320', research: '320', factor: '1.5',
  },
];

const AdminTitle = connect(null, null)(MyAdminTitle);
export default AdminTitle;