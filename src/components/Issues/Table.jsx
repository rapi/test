import React, { Component } from "react";
import PropTypes from "prop-types";

import { Table } from "semantic-ui-react";
/**
 *
 *  Display list of issues
 * @class IssuesTable
 * @extends {Component}
 */
class IssuesTable extends Component {
  render() {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}> Issue Number</Table.HeaderCell>
            <Table.HeaderCell width={6}>Title</Table.HeaderCell>
            <Table.HeaderCell width={1}>Created At</Table.HeaderCell>
            <Table.HeaderCell width={1}>Updated At</Table.HeaderCell>
            <Table.HeaderCell width={2}>Labels</Table.HeaderCell>
            <Table.HeaderCell width={1}>State</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.props.list.map(issue => (
            <Table.Row key={issue.number}>
              <Table.Cell>{issue.number}</Table.Cell>
              <Table.Cell>{issue.title}</Table.Cell>
              <Table.Cell>{issue.created_at}</Table.Cell>
              <Table.Cell>{issue.updated_at}</Table.Cell>
              <Table.Cell>{issue.labels.join(", ")}</Table.Cell>
              <Table.Cell>{issue.state}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}
IssuesTable.propTypes = {
  list: PropTypes.array.isRequired
};
export default IssuesTable;
