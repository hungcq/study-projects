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

class MyAdminLog extends Component {
  render () {
    return (
      <div>
        <Header as="h1" textAlign='center'>Log hệ thống</Header>
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
              sortKey={'userId'}>
              UserId
            </TableHeader>
            <TableHeader
              sortKey={'time'}>
              Thời gian
            </TableHeader>
            <TableHeader
              sortKey={'content'}>
              Nội dung
            </TableHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currentItems.map(
            ({userId, time, content}) => (
              <Table.Row key={userId}>
                <Table.Cell width={2}>{userId}</Table.Cell>
                <Table.Cell width={2}>{time}</Table.Cell>
                <Table.Cell width={12}>{content}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </PaginatedSortableTable>
    );
  }
}

const projectList = [
  {
    userId: 'admin',
    time: '27-08-2017',
    content: 'Semester - Course not found, create new one for CH5502 of class 98445',
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

const AdminLog = connect(null, null)(
  MyAdminLog);
export default AdminLog;