import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sortBy } from 'lodash';
import {
  Grid,
  Header,
  Table,
  Dropdown,
  Input,
  Container, Form,
} from 'semantic-ui-react';
import Model from '../../../models/topic';
import TableHeader from '../../sub/TableHeader';
import '../Styles.css';
import PaginatedSortableTable from '../../sub/PaginatedSortableTable';
import { filterTypes } from '../../../_constants/filter-types';
import SortItem from '../../sub/SortItem';
import {
  doSetData,
  doSetFilter,
  doSetItemsPerPage,
} from '../../../_actions/table-actions';
import {
  getCurrentItems,
  getFilteredData, getSortedData,
} from '../../../_selectors/table-selectors';
import { doGetMyProject } from '../../../_actions/student/my-project-actions';

class TopicList extends Component {

  componentDidMount () {
    this.props.setData(list, 10);
  }

  onItemsPerPageChanged = (e, {value}) => this.props.setItemsPerPage(value);

  render () {
    return (
      <Container fluid>
        <Header as="h1" textAlign="center">
          Danh sách định hướng đề tài Kỳ 20172
        </Header>

        <Grid columns='2' stackable
              style={{paddingLeft: '2%', paddingRight: '2%'}}>
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
              options={programOptions}
              placeholder='Chọn hệ'
              label='Chọn hệ'
              fieldName='program'
              filterType={filterTypes.MATCH}
            />
          </Grid.Row>
        </Grid>

        <MyConnectedTable/>
      </Container>
    )
      ;
  }
}

const numbersOfItems = [
  {key: 1, text: '5 items', value: 5},
  {key: 2, text: '10 items', value: 10},
  {key: 3, text: '15 items', value: 15},
];

const programOptions = [
  {
    text: 'Tất cả',
    value: null,
  },
  {
    text: 'ATTT',
    value: 'ATTT',
  },
  {
    text: 'CNPM',
    value: 'CNPM',
  },
  {
    text: 'HTTT',
    value: 'HTTT',
  },
  {
    text: 'KHMT',
    value: 'KHMT',
  },
  {
    text: 'KTMT',
    value: 'KTMT',
  },
  {
    text: 'TTM',
    value: 'TTM',
  },
  {
    text: 'TTMT',
    value: 'TTMT',
  },
];

const list = [
  new Model('Nguyễn Nhất Hải', 'Develop a react application', 'CNPM', '2'),
  new Model('Nguyễn Nhất Hải', 'Develop a react application', 'Tất cả', '3'),
  new Model('Nguyễn Nhất Hải', 'Develop a react application', 'KHMT', '1'),
  new Model('Nguyễn Nhất Hải', 'Develop a react application', 'TTMT', '4'),
  new Model('Nguyễn Nhất Hải', 'Develop a react application', 'HTTT', '4'),
  new Model('Nguyễn Nhất Hải', 'Develop a react application', 'Tất cả', '6'),
  new Model('Nguyễn Nhất Hải', 'Develop a react application', 'TTM', '2'),
  new Model('Nguyễn Nhất Hải', 'Develop a react application', 'CNPM', '2'),
  new Model('Nguyễn Nhất Hải', 'Develop a react application', 'ATTT', '1'),
  new Model('Nguyễn Nhất Hải', 'Develop a react application', 'CNPM', '5'),
  new Model('Nguyễn Nhất Hải', 'Develop a react application', 'Tất cả', '3'),
];

class MyTable extends Component {

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
              sortKey={'instructor'}>
              GV
            </TableHeader>
            <TableHeader
              sortKey={'description'}>
              Hướng đề tài
            </TableHeader>
            <TableHeader
              sortKey={'program'}>
              Hệ
            </TableHeader>
            <TableHeader
              sortKey={'numberOfStudent'}>
              Số lượng SV
            </TableHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currentItems.map(
            ({instructor, description, program, numberOfStudent}) => (
              <Table.Row key={count}>
                <Table.Cell width={1}>Đề tài{` ${count++}`}</Table.Cell>
                <Table.Cell width={2}>{instructor}</Table.Cell>
                <Table.Cell width={11}>{description}</Table.Cell>
                <Table.Cell width={1}>{program}</Table.Cell>
                <Table.Cell width={1}>{numberOfStudent}</Table.Cell>
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

const ConnectedTopicList = connect(mapState, mapDispatchToProps)(TopicList);
export default ConnectedTopicList;