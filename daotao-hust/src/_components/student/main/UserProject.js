import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Form, Header, Table } from 'semantic-ui-react';
import { sortBy } from 'lodash';
import TableHeader from '../../sub/TableHeader';
import '../Styles.css';
import WithCard from '../sub/WithCard';
import PaginatedSortableTable from '../../sub/PaginatedSortableTable';
import {
  getCurrentItems,
  getFilteredData,
  getSortedData,
} from '../../../_selectors/table-selectors';
import {
  doSetFilter,
  doSetItemsPerPage,
} from '../../../_actions/table-actions';
import { doGetMyProject } from '../../../_actions/student/my-project-actions';

class UserProject extends Component {

  componentDidMount () {
    // if (this.props.userInfo) {
    //   this.props.getMyProject(this.props.username, 10);
    // }
    this.props.getMyProject(this.props.userInfo.id, 10);
  }

  onItemsPerPageChanged = (e, {value}) => this.props.setItemsPerPage(value);

  render () {
    return (
      <WithCard>
        <Header as="h1" textAlign='center'>
          Thông tin phân công các môn Đồ án
        </Header>
        <Form>
          <Form.Field>
            <label>Số dòng/trang</label>
            <Dropdown
              onChange={this.onItemsPerPageChanged}
              options={numbersOfItems}
              placeholder='Choose items per page'
              selection
              value={this.props.itemsPerPage}
            />
          </Form.Field>
        </Form>
        <MyConnectedTable/>
      </WithCard>
    );
  }
}

const numbersOfItems = [
  {key: 1, text: '5 items', value: 5},
  {key: 2, text: '10 items', value: 10},
  {key: 3, text: '15 items', value: 15},
];

class MyTable extends Component {

  render () {
    let count = 0;
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
              sortKey={'semester'}>
              Kỳ
            </TableHeader>
            <TableHeader
              sortKey={'courseId'}>
              Mã Lớp/HP
            </TableHeader>
            <TableHeader
              sortKey={'course'}>
              Tên Học phần
            </TableHeader>
            <TableHeader
              sortKey={'topicName'}>
              Tên Đề tài
            </TableHeader>
            <TableHeader
              sortKey={'fieldOfStudy'}>
              ĐV
            </TableHeader>
            <TableHeader
              sortKey={'instructor'}>
              GVHD
            </TableHeader>
            <Table.HeaderCell>
              Email/Phone
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currentItems.map(
            (item) => (
              <Table.Row key={count++}>
                <Table.Cell>{count}</Table.Cell>
                <Table.Cell width={1}>{item.semester}</Table.Cell>
                <Table.Cell width={2}>{item.courseId}</Table.Cell>
                <Table.Cell width={3}>{item.projectName}</Table.Cell>
                <Table.Cell width={4}>{item.projectTitle}</Table.Cell>
                <Table.Cell width={1}>{item.eduProgramId}</Table.Cell>
                <Table.Cell width={3}>{item.teacherId}</Table.Cell>
                <Table.Cell width={4}><span></span></Table.Cell>
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

const MyConnectedTable = connect(mapStateToProps, null)(MyTable);

const mapState = state => {
  return {
    filterMap: state.table.filterMap,
    itemsPerPage: state.table.itemsPerPage,
    data: state.student.studentProjects.data,
    userInfo: state.auth.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setFilter: (fieldName, fieldValue, filterType) => dispatch(
    doSetFilter(fieldName, fieldValue, filterType)),
  setItemsPerPage: (itemsPerPage) => dispatch(doSetItemsPerPage(itemsPerPage)),
  getMyProject: (username, itemsPerPage) => dispatch(
    doGetMyProject(username, itemsPerPage)),
});

const ConnectedUserProject = connect(mapState, mapDispatchToProps)(UserProject);
export default ConnectedUserProject;