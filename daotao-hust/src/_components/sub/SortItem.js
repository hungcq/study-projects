import React, { Component } from 'react';
import { Dropdown, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { doRemoveFilter, doSetFilter } from '../../_actions/table-actions';

class MySortItem extends Component {
  handleChange = (e, {value}) => {
    if (value == null) {
      this.props.removeFilter(this.props.fieldName);
    } else {
      this.props.setFilter(this.props.fieldName, value, this.props.filterType);
    }
  };

  render () {
    const {label, placeholder, options, filterMap, fieldName} = this.props;
    return (
      <Form>
        <Form.Field>
          <label>{label}</label>
          <Dropdown
            selection
            name='default'
            options={options}
            placeholder={placeholder}
            onChange={this.handleChange}
            value={filterMap.has(fieldName) ? filterMap.get(fieldName).fieldValue : ''}
          />
        </Form.Field>
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setFilter: (fieldName, fieldValue, filterType) => dispatch(
    doSetFilter(fieldName, fieldValue, filterType)),
  removeFilter: (fieldName) => dispatch(doRemoveFilter(fieldName)),
});

const mapStateToProps = (state) => ({
  filterMap: state.table.filterMap,
});

const SortItem = connect(mapStateToProps, mapDispatchToProps)(MySortItem);
export default SortItem;