import React from "react";
import { Table, Pagination } from "semantic-ui-react";
import { makeRowData, renderRow, renderHeader } from "./BasicTableUtils";

const BasicTable = ({ events, changePage, paginated, highlightedText }) => (
  <Table celled striped compact>
    <Table.Header>{renderHeader(["Date", "Hours", "Events"])}</Table.Header>
    <Table.Body>
      {events.map(makeRowData).map(renderRow(highlightedText))}
    </Table.Body>

    {paginated && (
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan="3">
            <Pagination
              floated="right"
              defaultActivePage={1}
              totalPages={38}
              onPageChange={(evt, value) => changePage(value.activePage)}
            />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    )}
  </Table>
);

export default BasicTable;
