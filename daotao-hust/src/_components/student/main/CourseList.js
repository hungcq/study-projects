import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sortBy } from 'lodash';
import {
  Header,
  Table,
  Dropdown,
  Input,
  Grid,
  Form,
  Container,
} from 'semantic-ui-react';
import Model from '../../../models/course';
import '../Styles.css';
import TableHeader from '../../sub/TableHeader';
import { filterTypes } from '../../../_constants/filter-types';
import SortItem from '../../sub/SortItem';
import PaginatedSortableTable from '../../sub/PaginatedSortableTable';
import {
  getCurrentItems,
  getFilteredData, getSortedData,
} from '../../../_selectors/table-selectors';
import {
  doSetData,
  doSetFilter,
  doSetItemsPerPage,
} from '../../../_actions/table-actions';

class CourseList extends Component {

  componentDidMount () {
    this.props.setData(list, 10);
  }

  onItemsPerPageChanged = (e, {value}) => this.props.setItemsPerPage(value);

  render () {
    return (
      <Container fluid>
        <Header as="h1" textAlign="center">Danh sách Các môn học</Header>

        <Grid columns='2' stackable style={{paddingLeft: '2%', paddingRight: '2%'}}>
          <Grid.Row>
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

            <SortItem
              options={classOptions}
              placeholder='Chọn hệ'
              label='Chọn hệ'
              fieldName='programValue'
              filterType={filterTypes.MATCH}
            />
          </Grid.Row>
        </Grid>

        <MyConnectedTable/>
      </Container>
    );
  }
}

const numbersOfItems = [
  {key: 1, text: '5 items', value: 5},
  {key: 2, text: '10 items', value: 10},
  {key: 3, text: '15 items', value: 15},
];

const list = [
  new Model(
    'IT4947E', 'ITSS Project Management for Embedded System', 'Lớp', 2,
    60, 1, 0, 'CTTT - Kỳ chuẩn: 8', 'CTTT',
  ),
  new Model(
    'IT4948E', '1ITSS Project Management for Embedded System', 'Lớp', 2,
    60, 2, 0, 'DHCQ - Kỳ chuẩn: 8', 'DHCQ',
  ),
  new Model(
    'IT4949E', '2ITSS Project Management for Embedded System', 'Lớp', 2,
    60, 3, 0, 'CTHEDSPI-ATT - Kỳ chuẩn: 8', 'HEDSPI-A',
  ),
  new Model(
    'IT4940E', '3ITSS Project Management for Embedded System', 'Lớp', 2,
    60, 4, 0, 'SIE - Kỳ chuẩn: 8', 'SIE',
  ),
  new Model(
    'IT4941E', '4ITSS Project Management for Embedded System', 'Lớp', 2,
    60, 10, 0, 'SIE - Kỳ chuẩn: 8', 'SIE',
  ),
  new Model(
    'IT4942E', 'ITSS Project Management for Embedded System', 'Lớp', 2,
    60, 0, 0, 'KSTN - Kỳ chuẩn: 8', 'KSTN',
  ),
  new Model(
    'IT4943E', 'ITSS Project Management for Embedded System', 'Lớp', 2,
    60, 0, 0, 'CNKT - Kỳ chuẩn: 8', 'CNKT',
  ),
  new Model(
    'IT4944E', 'ITSS Project Management for Embedded System', 'Lớp', 2,
    60, 0, 0, 'KSCLC - Kỳ chuẩn: 8', 'KSCLC',
  ),
];

const classOptions = [
  {
    text: 'Tất cả',
    value: null,
  },
  {
    text: 'CTTT',
    value: 'CTTT',
  },
  {
    text: 'DHCQ',
    value: 'DHCQ',
  }, {
    text: 'HEDSPI-A',
    value: 'HEDSPI-A',
  },
  {
    text: 'KSCLC',
    value: 'KSCLC',
  },
  {
    text: 'KSTN',
    value: 'KSTN',
  },
  {
    text: 'SDH',
    value: 'SDH',
  },
  {
    text: 'SIE',
    value: 'SIE',
  },
  {
    text: 'TC',
    value: 'TC',
  },
  {
    text: 'VB2',
    value: 'VB2',
  },
  {
    text: 'CNCN',
    value: 'CNCN',
  },
  {
    text: 'CNKT',
    value: 'CNKT',
  },
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
              Số Tín chỉ
            </TableHeader>
            <TableHeader
              sortKey={'theory'}>
              LT
            </TableHeader>
            <TableHeader
              sortKey={'exercise'}>
              BT
            </TableHeader>
            <TableHeader
              sortKey={'lab'}>
              TN
            </TableHeader>
            <TableHeader
              sortKey={'program'}>
              CTDT
            </TableHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currentItems.map(
            ({id, courseName, type, numberOfCredit, theory, exercise, lab, program}) => (
              <Table.Row key={count++}>
                <Table.Cell width={1}>{id}</Table.Cell>
                <Table.Cell width={4}>{courseName}</Table.Cell>
                <Table.Cell width={1}>{type}</Table.Cell>
                <Table.Cell width={1}>{numberOfCredit}</Table.Cell>
                <Table.Cell width={1}>{theory}</Table.Cell>
                <Table.Cell width={1}>{exercise}</Table.Cell>
                <Table.Cell width={1}>{lab}</Table.Cell>
                <Table.Cell width={1}>{program}</Table.Cell>
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
  };
};

const mapDispatchToProps = (dispatch) => ({
  setData: (list, itemsPerPage) => dispatch(doSetData(list, itemsPerPage)),
  setFilter: (fieldName, fieldValue, filterType) => dispatch(
    doSetFilter(fieldName, fieldValue, filterType)),
  setItemsPerPage: (itemsPerPage) => dispatch(doSetItemsPerPage(itemsPerPage)),
});

const ConnectedCourseList = connect(mapState, mapDispatchToProps)(CourseList);
export default ConnectedCourseList;