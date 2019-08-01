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

class MyListingClass extends Component {
  render () {
    return (
      <div>
        <Header as="h1" textAlign='center'>Lớp thi</Header>
        <MyConnectedTable/>
      </div>
    );
  }
}

class MyTable extends Component {

  componentDidMount () {
    this.props.setData(list, 50);
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
              sortKey={'classCode'}>
              Mã lớp học
            </TableHeader>
            <TableHeader
              sortKey={'subjectCode'}>
              Mã HP
            </TableHeader>
            <TableHeader
              sortKey={'subjectName'}>
              Tên HP
            </TableHeader>
            <TableHeader
              sortKey={'instructor'}>
              Giảng viên
            </TableHeader>
            <TableHeader
              sortKey={'testClass1'}>
              Mã lớp thi 1
            </TableHeader>
            <TableHeader
              sortKey={'numberStudent1'}>
              Số SV 1
            </TableHeader>
            <TableHeader
              sortKey={'testClass2'}>
              Mã lớp thi 2
            </TableHeader>
            <TableHeader
              sortKey={'numberStudent2'}>
              Số SV 2
            </TableHeader>
            <TableHeader
              sortKey={'testClass3'}>
              Mã lớp thi 3
            </TableHeader>
            <TableHeader
              sortKey={'numberStudent3'}>
              Số SV 3
            </TableHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currentItems.map(
            ({classCode, subjectCode, subjectName, instructor, testClass1, numberStudent1, testClass2,
               numberStudent2, testClass3, numberStudent3}) => (
              <Table.Row key={instructor}>
                <Table.Cell width={2}>{classCode}</Table.Cell>
                <Table.Cell width={1}>{subjectCode}</Table.Cell>
                <Table.Cell width={4}>{subjectName}</Table.Cell>
                <Table.Cell width={3}>{instructor}</Table.Cell>
                <Table.Cell width={1}>{testClass1}</Table.Cell>
                <Table.Cell width={1}>{numberStudent1}</Table.Cell>
                <Table.Cell width={1}>{testClass2}</Table.Cell>
                <Table.Cell width={1}>{numberStudent2}</Table.Cell>
                <Table.Cell width={1}>{testClass3}</Table.Cell>
                <Table.Cell width={1}>{numberStudent3}</Table.Cell>
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
    classCode: 95579,
    subjectCode: 'CH3452',
    subjectName: 'Công nghệ Tổng hợp hợp chất trung gian',
    instructor: 'Nguyễn Anh Vũ',
    testClass1: 123456,
    numberStudent1: 100,
    testClass2: 123456,
    numberStudent2: 100,
    testClass3: 123456,
    numberStudent3: 100,
  },
];

const ListingClass = connect(null, null)(MyListingClass);
export default ListingClass;