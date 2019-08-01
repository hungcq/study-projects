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

class MyAdminPosition extends Component {
  render () {
    return (
      <div>
        <Header as="h1" textAlign='center'>Danh sách chức vụ</Header>
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
              Mã chức vụ
            </TableHeader>
            <TableHeader
              sortKey={'name'}>
              Tên chức vụ
            </TableHeader>
            <TableHeader
              sortKey={'factor'}>
              Hệ số
            </TableHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currentItems.map(
            ({id, code, name, factor}) => (
              <Table.Row key={id}>
                <Table.Cell width={1}>{id}</Table.Cell>
                <Table.Cell width={2}>{code}</Table.Cell>
                <Table.Cell width={11}>{name}</Table.Cell>
                <Table.Cell width={2}>{factor}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </PaginatedSortableTable>
    );
  }
}

const list = [
  {
    id: 1,
    code: '1',
    name: 'Trưởng phòng, ban, giámxcv đốc trung tâm quản lý hành chính cấp trường, viện trưởng các viện quản lý đào tạo cấp trường, Giám độc NXB BK',
    factor: '1.5',
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

const AdminPosition = connect(null, null)(MyAdminPosition);
export default AdminPosition;