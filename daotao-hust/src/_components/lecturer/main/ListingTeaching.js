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

class MyListingTeaching extends Component {
  render () {
    return (
      <div>
        <Header as="h1" textAlign='center'>Khối lượng giảng dạy</Header>
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
              sortKey={'instructor'}>
              Họ tên cán bộ
            </TableHeader>
            <TableHeader
              sortKey={'program'}>
              Hệ ĐT
            </TableHeader>
            <TableHeader
              sortKey={'type'}>
              Loại giờ
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
              sortKey={'semester'}>
              Học kỳ
            </TableHeader>
            <TableHeader
              sortKey={'classCode'}>
              Mã lớp
            </TableHeader>
            <TableHeader
              sortKey={'numberOfStudent'}>
              Số SV
            </TableHeader>
            <TableHeader
              sortKey={'numberOfCredit'}>
              Số TC
            </TableHeader>
            <TableHeader
              sortKey={'totalHour'}>
              Số giờ
            </TableHeader>
            <TableHeader
              sortKey={'kl'}>
              kL
            </TableHeader>
            <TableHeader
              sortKey={'kc'}>
              kC
            </TableHeader>
            <TableHeader
              sortKey={'realHour'}>
              Giờ quy đổi
            </TableHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currentItems.map(
            ({instructor, program, type, subjectCode, subjectName, semester, classCode,
               numberOfStudent, numberOfCredit, totalHour, kl, kc, realHour}) => (
              <Table.Row key={instructor}>
                <Table.Cell width={2}>{instructor}</Table.Cell>
                <Table.Cell width={1}>{program}</Table.Cell>
                <Table.Cell width={1}>{type}</Table.Cell>
                <Table.Cell width={1}>{subjectCode}</Table.Cell>
                <Table.Cell width={3}>{subjectName}</Table.Cell>
                <Table.Cell width={1}>{semester}</Table.Cell>
                <Table.Cell width={1}>{classCode}</Table.Cell>
                <Table.Cell width={1}>{numberOfStudent}</Table.Cell>
                <Table.Cell width={1}>{numberOfCredit}</Table.Cell>
                <Table.Cell width={1}>{totalHour}</Table.Cell>
                <Table.Cell width={1}>{kl}</Table.Cell>
                <Table.Cell width={1}>{kc}</Table.Cell>
                <Table.Cell width={1}>{realHour}</Table.Cell>
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
    instructor: 'Nguyễn Anh Vũ',
    program: 'DHCQ',
    type: 'TN',
    subjectCode: 'CH3452',
    subjectName: 'Công nghệ Tổng hợp hợp chất trung gian',
    semester: '20162',
    classCode: 664837,
    numberOfStudent: 11,
    numberOfCredit: 2,
    totalHour: 30,
    kl: '0.5',
    kc: 1,
    realHour: 15,
  },
];

const ListingTeaching = connect(null, null)(MyListingTeaching);
export default ListingTeaching;