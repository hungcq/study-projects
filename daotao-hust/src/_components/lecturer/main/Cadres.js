import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Table } from 'semantic-ui-react';
import { sortBy } from 'lodash';
import TableHeader from '../../sub/TableHeader';
import '../Styles.css';
import PaginatedSortableTable from '../../sub/PaginatedSortableTable';
import { doSetData } from '../../../_actions/table-actions';
import {
  getCurrentItems, getFilteredData,
  getSortedData,
} from '../../../_selectors/table-selectors';

class MyCadres extends Component {
  render () {
    return (
      <div>
        <Header as="h1" textAlign='center'>Danh sách cán bộ</Header>
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
    let count = 1;
    const {filteredData, itemsPerPage, currentItems} = this.props;
    return (
      <PaginatedSortableTable
        selectable={true}
        basic='very'
        data={filteredData}
        itemsPerPage={itemsPerPage}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              #
            </Table.HeaderCell>
            <TableHeader
              sortKey={'fullName'}>
              Họ và tên
            </TableHeader>
            <TableHeader
              sortKey={'email'}>
              Email
            </TableHeader>
            <TableHeader
              sortKey={'phone'}>
              Số ĐT
            </TableHeader>
            <TableHeader
              sortKey={'gender'}>
              Giới tính
            </TableHeader>
            <TableHeader
              sortKey={'department'}>
              Đơn vị
            </TableHeader>
            <TableHeader
              sortKey={'title'}>
              Chức danh
            </TableHeader>
            <TableHeader
              sortKey={'factor'}>
              Hệ số
            </TableHeader>
            <TableHeader
              sortKey={'systemRole'}>
              Phân quyền
            </TableHeader>
            <TableHeader
              sortKey={'admin'}>
              Quản lý CTĐT
            </TableHeader>
            <TableHeader
              sortKey={'lastLogin'}>
              Last login
            </TableHeader>
            <Table.HeaderCell
              sortKey={'resetPW'}>
              Reset PW
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currentItems.map(
            ({fullName, email, phone, gender, department, title, factor, systemRole, admin, lastLogin}) => (
              <Table.Row key={count}>
                <Table.Cell>{count++}</Table.Cell>
                <Table.Cell width={2}>{fullName}</Table.Cell>
                <Table.Cell width={3}>{email}</Table.Cell>
                <Table.Cell width={2}>{phone}</Table.Cell>
                <Table.Cell width={1}>{gender}</Table.Cell>
                <Table.Cell width={1}>{department}</Table.Cell>
                <Table.Cell width={1}>{title}</Table.Cell>
                <Table.Cell width={1}>{factor}</Table.Cell>
                <Table.Cell width={2}>{systemRole}</Table.Cell>
                <Table.Cell width={2}>{admin}</Table.Cell>
                <Table.Cell width={1}>{lastLogin}</Table.Cell>
                <Table.Cell width={1}><Button>Reset</Button></Table.Cell>
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
    fullName: 'CB5254',
    email: 'Kỹ thuật vật liệu chất dẻo',
    phone: 'Lớp',
    gender: 4,
    department: 1,
    title: 1,
    factor: 1,
    systemRole: '2-1-1-6',
    admin: 'Việt Nhật',
    lastLogin: 'PLM',
  },
];

const Cadres = connect(null, null)(MyCadres);
export default Cadres;