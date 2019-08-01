import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Table } from 'semantic-ui-react';
import TableHeader from '../../sub/TableHeader';
import '../Styles.css';
import { doSetData } from '../../../_actions/table-actions';
import PaginatedSortableTable from '../../sub/PaginatedSortableTable';
import {
  getCurrentItems, getFilteredData,
  getSortedData,
} from '../../../_selectors/table-selectors';

class MyAdminSemester extends Component {
  render () {
    return (
      <div>
        <Header as="h1" textAlign='center'>Quản lý học kỳ</Header>
        <MyConnectedTable/>
      </div>
    );
  }
}

class MyTable extends Component {

  componentDidMount () {
    this.props.setData(projectList, 10);
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
              sortKey={'semester'}>
              Học kỳ
            </TableHeader>
            <TableHeader
              sortKey={'classStatus'}>
              Trạng thái lớp
            </TableHeader>
            <TableHeader
              sortKey={'projectStatus'}>
              Trạng thái đồ án
            </TableHeader>
            <TableHeader
              sortKey={'start'}>
              Ngày bắt đầu
            </TableHeader>
            <TableHeader
              sortKey={'end'}>
              Ngày kết thúc
            </TableHeader>
            <TableHeader
              sortKey={'defaultForClass'}>
              Kỳ mặc định<br />cho lớp
            </TableHeader>
            <TableHeader
              sortKey={'defaultForProject'}>
              Kỳ mặc định<br />cho Project
            </TableHeader>
            <TableHeader
              sortKey={'displayRegisterColumn'}>
              Hiển thị cột<br />nguyện vọng ĐA
            </TableHeader>
            <Table.HeaderCell>
              Save
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currentItems.map(
            ({semester, classStatus, projectStatus, start, end, defaultForClass, defaultForProject, displayRegisterColumn}) => (
              <Table.Row key={semester}>
                <Table.Cell width={1}>{semester}</Table.Cell>
                <Table.Cell width={2}>{classStatus}</Table.Cell>
                <Table.Cell width={2}>{projectStatus}</Table.Cell>
                <Table.Cell width={2}>{start}</Table.Cell>
                <Table.Cell width={2}>{end}</Table.Cell>
                <Table.Cell width={2}>{defaultForClass}</Table.Cell>
                <Table.Cell width={2}>{defaultForProject}</Table.Cell>
                <Table.Cell width={2}>{displayRegisterColumn}</Table.Cell>
                <Table.Cell width={1}><Button>SAVE</Button></Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </PaginatedSortableTable>
    );
  }
}

const projectList = [
  {semester: 1, classStatus: 'unlocked', projectStatus: 'unlocked', start: '29-04-2018', end: '29-04-2018',
    defaultForClass: true, defaultForProject: true, displayRegisterColumn: true},
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

const AdminSemester = connect(null, null)(
  MyAdminSemester);
export default AdminSemester;