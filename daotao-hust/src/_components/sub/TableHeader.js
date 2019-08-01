import React, { Component } from 'react';
import { Icon, Table } from 'semantic-ui-react';
import { doSortItem } from '../../_actions/table-actions';
import { connect } from 'react-redux';

class MyTableHeader extends Component {
  render () {
    const {onSort, children, sortKey} = this.props;
    const {isSortReverse} = this.props.table;
    const activeSortKey = this.props.table.sortKey;
    let icon = <Icon name="caret up" style={{visibility: 'hidden'}}/>;
    if (activeSortKey === sortKey) {
      icon = isSortReverse ? <Icon name="caret up"/> : <Icon
        name="caret down"/>;
    }
    return (
      <Table.HeaderCell className={'TableHeader'}
                        onClick={() => onSort(
                          sortKey)}>{children} {icon}</Table.HeaderCell>
    );
  }
}

const mapStateToProps = state => ({
  table: state.table,
});

const mapDispatchToProps = dispatch => ({
  onSort: (sortKey) => dispatch(doSortItem(sortKey)),
});

const TableHeader = connect(mapStateToProps, mapDispatchToProps)(MyTableHeader);
export default TableHeader;