import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

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
    items: PropTypes.array
  };

  renderTable = () => {
    return(
      <Table multiSelectable={true} wrapperStyle={{height: "100%"}} bodyStyle={this.props.style}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableRowColumn>1</TableRowColumn>
            <TableRowColumn>John Smith</TableRowColumn>
            <TableRowColumn>Employed</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>2</TableRowColumn>
            <TableRowColumn>Randal White</TableRowColumn>
            <TableRowColumn>Unemployed</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>3</TableRowColumn>
            <TableRowColumn>Stephanie Sanders</TableRowColumn>
            <TableRowColumn>Employed</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>4</TableRowColumn>
            <TableRowColumn>Steve Brown</TableRowColumn>
            <TableRowColumn>Employed</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>5</TableRowColumn>
            <TableRowColumn>Christopher Nolan</TableRowColumn>
            <TableRowColumn>Unemployed</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>5</TableRowColumn>
            <TableRowColumn>Christopher Nolan</TableRowColumn>
            <TableRowColumn>Unemployed</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>5</TableRowColumn>
            <TableRowColumn>Christopher Nolan</TableRowColumn>
            <TableRowColumn>Unemployed</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>5</TableRowColumn>
            <TableRowColumn>Christopher Nolan</TableRowColumn>
            <TableRowColumn>Unemployed</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>5</TableRowColumn>
            <TableRowColumn>Christopher Nolan</TableRowColumn>
            <TableRowColumn>Unemployed</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>5</TableRowColumn>
            <TableRowColumn>Christopher Nolan</TableRowColumn>
            <TableRowColumn>Unemployed</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>5</TableRowColumn>
            <TableRowColumn>Christopher Nolan</TableRowColumn>
            <TableRowColumn>Unemployed</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>5</TableRowColumn>
            <TableRowColumn>Christopher Nolan</TableRowColumn>
            <TableRowColumn>Unemployed</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>5</TableRowColumn>
            <TableRowColumn>Christopher Nolan</TableRowColumn>
            <TableRowColumn>Unemployed</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>8</TableRowColumn>
            <TableRowColumn>Christopher Nolan</TableRowColumn>
            <TableRowColumn>Unemployed</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>9</TableRowColumn>
            <TableRowColumn>Christopher Nolan</TableRowColumn>
            <TableRowColumn>Unemployed</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>9</TableRowColumn>
            <TableRowColumn>Christopher Nolan</TableRowColumn>
            <TableRowColumn>Unemployed</TableRowColumn>
          </TableRow>
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

export default ContainerTable;
