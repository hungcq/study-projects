import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pagination, Table } from 'semantic-ui-react';
import { sortBy } from 'lodash';
import '../lecturer/Styles.css';
import { doChangePage } from '../../_actions/table-actions';

class MyTable extends Component {

  handlePaginationChange = (e, {activePage}) => {
    this.props.changePage(activePage);
  };

  render () {
    const {basic, children, selectable} = this.props;
    const {data, itemsPerPage, pageNumber} = this.props;

    const numberOfPages = Math.ceil(data.length / itemsPerPage);
    return (
      <Table sortable={true}
             basic={basic}
             selectable={selectable}>
        {children}
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan={4}>
              <Pagination activePage={pageNumber}
                          onPageChange={this.handlePaginationChange}
                          totalPages={numberOfPages}
                          ellipsisItem={numberOfPages >= 8}
                          siblingRange={1}
                          boundaryRange={2}
                // secondary
                // pointing
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pageNumber: state.table.pageNumber,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {changePage: (pageNumber) => dispatch(doChangePage(pageNumber))};
};

const PaginatedSortableTable = connect(mapStateToProps, mapDispatchToProps)(
  MyTable);
export default PaginatedSortableTable;