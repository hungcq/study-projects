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

class MyAdminFieldOfStudy extends Component {
  render () {
    return (
      <div>
        <Header as="h1" textAlign='center'>Danh sách chuyên ngành</Header>
        <MyConnectedTable/>
      </div>
    );
  }
}

class MyTable extends Component {

  componentDidMount() {
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
              Mã ngành
            </TableHeader>
            <TableHeader
              sortKey={'name'}>
              Tên ngành
            </TableHeader>
            <TableHeader
              sortKey={'description'}>
              Mô tả
            </TableHeader>
            <TableHeader
              sortKey={'suggestedName'}>
              Tên gợi ý
            </TableHeader>
            <Table.HeaderCell>
              Save
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currentItems.map(
            ({id, code, name, description, suggestedName}) => (
              <Table.Row key={id}>
                <Table.Cell width={1}>{id}</Table.Cell>
                <Table.Cell width={1}>{code}</Table.Cell>
                <Table.Cell width={4}>{name}</Table.Cell>
                <Table.Cell width={4}>{description}</Table.Cell>
                <Table.Cell width={5}>{suggestedName}</Table.Cell>
                <Table.Cell width={1}><Button>SAVE</Button></Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </PaginatedSortableTable>
    );
  }
}

const list = [
  {id: 1, code: 'KTHH', name: 'Kỹ thuật hoá học', description: 'Kỹ thuật hoá học',
    suggestedName: 'KTHH;Kỹ thuật hoá học;Kỹ thuật hóa học;KT hóa học'}
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

const AdminFieldOfStudy = connect(null, null)(MyAdminFieldOfStudy);
export default AdminFieldOfStudy;