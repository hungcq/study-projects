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

class MyTeaching extends Component {
  render () {
    return (
      <div>
        <Header as="h1" textAlign='center'>Giảng dạy</Header>
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
              sortKey={'classCode'}>
              Mã lớp
            </TableHeader>
            <TableHeader
              sortKey={'subjectCode'}>
              Mã HP
            </TableHeader>
            <TableHeader
              sortKey={'subjectName'}>
              Tên Học phần
            </TableHeader>
            <TableHeader
              sortKey={'program'}>
              Hệ
            </TableHeader>
            <TableHeader
              sortKey={'numberOfStudents'}>
              SV
            </TableHeader>
            <TableHeader
              sortKey={'time'}>
              Lịch học
            </TableHeader>
            <TableHeader
              sortKey={'changed'}>
              Sửa
            </TableHeader>
            <TableHeader
              sortKey={'department'}>
              Đơn vị
            </TableHeader>
            <TableHeader
              sortKey={'instructor'}>
              Giảng viên
            </TableHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currentItems.map(
            ({classCode, subjectCode, subjectName, program, numberOfStudents, time, changed, department, instructor}) => (
              <Table.Row key={count}>
                <Table.Cell>{count++}</Table.Cell>
                <Table.Cell width={1}>{classCode}</Table.Cell>
                <Table.Cell width={1}>{subjectCode}</Table.Cell>
                <Table.Cell width={4}>{subjectName}</Table.Cell>
                <Table.Cell width={1}>{program}</Table.Cell>
                <Table.Cell width={1}>{numberOfStudents}</Table.Cell>
                <Table.Cell width={4}>{time}</Table.Cell>
                <Table.Cell width={1}>{changed}</Table.Cell>
                <Table.Cell width={1}>{department}</Table.Cell>
                <Table.Cell width={2}>{instructor}</Table.Cell>
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
    classCode: 664837,
    subjectCode: 'CH3480',
    subjectName: 'TN Quá trình và thiết bị I',
    program: 'DHCQ',
    numberOfStudents: 8,
    time: 'Sáng T2, Tiết 3-6, C4-105, Tuần:3-8',
    changed: '18/09',
    department: 'QTTB',
    instructor: 'Nguyen Thanh Hung',
  },
];

const Teaching = connect(null, null)(MyTeaching);
export default Teaching;