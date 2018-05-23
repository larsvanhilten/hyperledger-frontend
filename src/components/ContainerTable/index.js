import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setSelected } from '../../actions';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class ContainerTable extends Component {

  static propTypes = {
    items: PropTypes.array,
    table: PropTypes.object,
    type: PropTypes.string
  };

  generateHeaders = () => {
    const headers = [];
    if(this.props.items && this.props.items[0]) {
      Object.keys(this.props.items[0]).map(key => {
        return headers.push(<TableHeaderColumn key={key}>{key}</TableHeaderColumn>);
      });
      headers.shift();
      return headers;
    }
    return headers;
  }

  generateBody = () => {
    const body = [];
    if(this.props.items) {
      for(let i = 0; i < this.props.items.length; i++) {
        const content = this.props.items[i];
        const rows = [];
        for(let j = 1; j < Object.keys(content).length; j++) {
          const key = Object.keys(content)[j];
          rows.push(<TableRowColumn key={j}>{ content[key] }</TableRowColumn>);
        }
        body.push(
          <TableRow key={i}>
            {rows}
          </TableRow>
        );
      }
    }
    return body;
  }

  onSelected = (row) => {
    let rows = row;
    if(rows === "all") {
      rows = [];
      for(let i = 0; i < this.props.items.length; i++) {
        rows.push(i);
      } 
    }

    this.props.setSelected(rows, this.props.type);
    
  }

  renderTable = () => {
    const headers = this.generateHeaders();
    const body = this.generateBody();
    return(
      <Table multiSelectable={true} onRowSelection={this.onSelected} wrapperStyle={{height: "100%"}} bodyStyle={this.props.style}>
        <TableHeader>
          <TableRow>
            { headers }
          </TableRow>
        </TableHeader>
        <TableBody deselectOnClickaway={false}>
            { body }
        </TableBody>
    </Table>
    )
  };

  render() {
    return (
      <div style={{height: "100%"}}>
        { this.renderTable() }
      </div>
    );
  }
}

export default connect(
  table => ({
    table
  }),
  dispatch => ({
    setSelected: (rows, table) => dispatch(setSelected(rows, table))
  })
)(ContainerTable);
