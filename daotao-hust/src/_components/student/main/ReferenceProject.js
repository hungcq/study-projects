import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sortBy } from 'lodash';
import {
  Table,
  Dropdown,
  Input,
  Container,
  Grid,
  Form,
} from 'semantic-ui-react';
import Model from '../../../models/project';
import '../Styles.css';
import TableHeader from '../../sub/TableHeader';
// import InfoCard, { FunctionCard } from './InfoCard';
import WithCard from '../sub/WithCard';
import { filterTypes } from '../../../_constants/filter-types';
import SortItem from '../../sub/SortItem';
import PaginatedSortableTable from '../../sub/PaginatedSortableTable';
import {
  doSetData,
  doSetFilter,
  doSetItemsPerPage,
} from '../../../_actions/table-actions';
import {
  getCurrentItems,
  getFilteredData, getSortedData,
} from '../../../_selectors/table-selectors';

const semesterOptions = [
  {
    text: '20182',
    value: '20182',
  },
  {
    text: '20181',
    value: '20181',
  },
  {
    text: '20172',
    value: '20172',
  },
  {
    text: '20171',
    value: '20171',
  }, {
    text: '20162',
    value: '20162',
  },
  {
    text: '20161',
    value: '20161',
  },
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

const projectList = [
  new Model(
    'Chử Quốc Hưng', 'Develop a react application',
    '2Graduation Research 1', 'DHCQ', 'CNPM',
    'Nguyễn nhất Hải', 'hainn@soict.hust.edu.vn', '0914727982',
  ),
  new Model(
    'Chử Quốc Hưng', 'Develop a react application',
    '3Graduation Research 1', 'DHCQ', 'KHMT',
    'Nguyễn nhất Hải', 'hainn@soict.hust.edu.vn', '0914727982',
  ),
  new Model(
    'Chử Quốc Hưng', 'Develop a react application',
    '4Graduation Research 1', 'CNCN', 'HTTT',
    'Nguyễn nhất Hải', 'hainn@soict.hust.edu.vn', '0914727982',
  ),
  new Model(
    'Chử Quốc Hưng', 'Develop a react application',
    '5Graduation Research 1', 'DHCQ', 'TTM',
    'Nguyễn nhất Hải', 'hainn@soict.hust.edu.vn', '0914727982',
  ),
  new Model(
    'Chử Quốc Hưng', 'Develop a react application',
    '5Graduation Research 1', 'CNCN', 'TTMT',
    'Nguyễn nhất Hải', 'hainn@soict.hust.edu.vn', '0914727982',
  ),
  new Model(
    'Chử Quốc Hưng', 'Develop a react application',
    '5Graduation Research 1', 'DHCQ', 'ATTT',
    'Nguyễn nhất Hải', 'hainn@soict.hust.edu.vn', '0914727982',
  ),
  new Model(
    'Chử Quốc Hưng', 'Develop a react application',
    '5Graduation Research 1', 'CNCN', 'CNPM',
    'Nguyễn nhất Hải', 'hainn@soict.hust.edu.vn', '0914727982',
  ),
  new Model(
    'Chử Quốc Hưng', 'Develop a react application',
    '5Graduation Research 1', 'CNCN', 'CNPM',
    'Nguyễn nhất Hải', 'hainn@soict.hust.edu.vn', '0914727982',
  ),
  new Model(
    'Chử Quốc Hưng', 'Develop a react application',
    '5Graduation Research 1', 'TC', 'HTTT',
    'Nguyễn nhất Hải', 'hainn@soict.hust.edu.vn', '0914727982',
  ),
  new Model(
    'Chử Quốc Hưng', 'Develop a react application',
    '5Graduation Research 1', 'TC', 'KHMT',
    'Nguyễn nhất Hải', 'hainn@soict.hust.edu.vn', '0914727982',
  ),
  new Model(
    'Chử Quốc Hưng', 'Develop a react application',
    '6Graduation Research 1', 'TC', 'TTM',
    'Nguyễn nhất Hải', 'hainn@soict.hust.edu.vn', '0914727982',
  ),
];

const numbersOfItems = [
  {key: 1, text: '5 items', value: 5},
  {key: 2, text: '10 items', value: 10},
  {key: 3, text: '15 items', value: 15},
];

class ReferenceProject extends Component {

  componentDidMount () {
    this.props.setData(projectList, 10);
  }

  onItemsPerPageChanged = (e, {value}) => this.props.setItemsPerPage(value);

  render () {
    return (
      <Container fluid style={{paddingLeft: '1%', paddingRight: '1%'}}>
        <Grid columns='4' stackable>
          <Grid.Row>
            <Grid.Column>
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
            </Grid.Column>

            <Grid.Column>
              <SortItem
                options={semesterOptions}
                placeholder='Chọn học kỳ'
                label='Chọn học kỳ'
                fieldName='semester'
                filterType={filterTypes.MATCH}
              />
            </Grid.Column>

            <Grid.Column>
              <SortItem
                options={programOptions}
                placeholder='Chọn ngành'
                label='Chọn ngành'
                fieldName='fieldOfStudy'
                filterType={filterTypes.MATCH}
              />
            </Grid.Column>
            <Grid.Column>
              <Form>
                <Form.Field>
                  <label>Tìm kiếm</label>
                  <Input placeholder="Tìm kiếm..."/>
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <WithCard>
          <MyConnectedTable/>
        </WithCard>
      </Container>
    );
  }
}

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
              sortKey={'topicName'}>
              Tên đề tài
            </TableHeader>
            <TableHeader
              sortKey={'studentName'}>
              Tên Sinh Viên
            </TableHeader>
            <TableHeader
              sortKey={'schoolYear'}>
              Khóa
            </TableHeader>
            <TableHeader
              sortKey={'program'}>
              Hệ
            </TableHeader>
            <TableHeader
              sortKey={'fieldOfStudy'}>
              Ngành
            </TableHeader>
            <TableHeader
              sortKey={'instructor'}>
              GV Hướng Dẫn
            </TableHeader>
            <Table.HeaderCell>
              File báo cáo
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currentItems.map(
            ({topicName, studentName, schoolYear, program, fieldOfStudy, instructor, file}) => (
              <Table.Row key={count}>
                <Table.Cell>{count++}</Table.Cell>
                <Table.Cell width={5}>{topicName}</Table.Cell>
                <Table.Cell width={3}>{studentName}</Table.Cell>
                <Table.Cell width={1}>{schoolYear}</Table.Cell>
                <Table.Cell width={1}>{program}</Table.Cell>
                <Table.Cell width={1}>{fieldOfStudy}</Table.Cell>
                <Table.Cell width={3}>{instructor}</Table.Cell>
                <Table.Cell width={2}>{file}</Table.Cell>
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

const ConnectedReferenceProject = connect(mapState, mapDispatchToProps)(
  ReferenceProject);
export default ConnectedReferenceProject;