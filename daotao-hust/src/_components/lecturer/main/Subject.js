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

class MySubject extends Component {
  render () {
    return (
      <div>
        <Header as="h1" textAlign='center'>Danh sách môn học</Header>
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
              sortKey={'id'}>
              Mã HP
            </TableHeader>
            <TableHeader
              sortKey={'courseName'}>
              Tên học phần
            </TableHeader>
            <TableHeader
              sortKey={'type'}>
              Loại
            </TableHeader>
            <TableHeader
              sortKey={'numberOfCredit'}>
              Số tín chỉ
            </TableHeader>
            <TableHeader
              sortKey={'theory'}>
              Số giờ LT
            </TableHeader>
            <TableHeader
              sortKey={'exercise'}>
              Số giờ BT
            </TableHeader>
            <TableHeader
              sortKey={'lab'}>
              Số giờ TN
            </TableHeader>
            <TableHeader
              sortKey={'allocation'}>
              Phân bố
            </TableHeader>
            <TableHeader
              sortKey={'program'}>
              CTĐT
            </TableHeader>
            <TableHeader
              sortKey={'fieldOfStudy'}>
              Bộ môn
            </TableHeader>
            <TableHeader
              sortKey={'instructor'}>
              Giảng viên
            </TableHeader>
            <TableHeader
              sortKey={'document'}>
              Tài liệu môn học
            </TableHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currentItems.map(
            ({id, courseName, type, numberOfCredit, theory, exercise, lab, allocation, program, fieldOfStudy, instructor, document}) => (
              <Table.Row key={count}>
                <Table.Cell>{count++}</Table.Cell>
                <Table.Cell width={1}>{id}</Table.Cell>
                <Table.Cell width={3}>{courseName}</Table.Cell>
                <Table.Cell width={1}>{type}</Table.Cell>
                <Table.Cell width={1}>{numberOfCredit}</Table.Cell>
                <Table.Cell width={1}>{theory}</Table.Cell>
                <Table.Cell width={1}>{exercise}</Table.Cell>
                <Table.Cell width={1}>{lab}</Table.Cell>
                <Table.Cell width={1}>{allocation}</Table.Cell>
                <Table.Cell width={1}>{program}</Table.Cell>
                <Table.Cell width={1}>{fieldOfStudy}</Table.Cell>
                <Table.Cell width={2}>{instructor}</Table.Cell>
                <Table.Cell width={2}>{document}</Table.Cell>
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
    id: 'CB5254',
    courseName: 'Kỹ thuật vật liệu chất dẻo',
    type: 'Lớp',
    numberOfCredit: 4,
    theory: 1,
    exercise: 1,
    lab: 1,
    allocation: '2-1-1-6',
    program: 'Việt Nhật',
    fieldOfStudy: 'PLM',
    instructor: 'Hoàng Nam',
    document: 'Tài liệu CB5254',
  },
];

const Subject = connect(null, null)(MySubject);
export default Subject;