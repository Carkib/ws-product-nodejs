import React from "react";
import { Icon, Menu, Table } from "semantic-ui-react";
import { range } from "lodash";
import {
  makeRowData,
  renderRow,
  renderPageNumber,
  renderHeader
} from "./BasicTableUtils";

const BasicTable = ({ events, changePage, currentPage }) => (
  <Table celled striped>
    <Table.Header>{renderHeader(["Date", "Hours", "Events"])}</Table.Header>

    <Table.Body>{events.map(makeRowData).map(renderRow)}</Table.Body>

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan="3">
          <Menu floated="right" pagination>
            <Menu.Item
              as="a"
              icon
              disabled={currentPage === 1}
              onClick={() => changePage(currentPage - 1)}
            >
              <Icon name="chevron left" />
            </Menu.Item>
            {range(1, 16).map(renderPageNumber(changePage, currentPage))}
            <Menu.Item
              as="a"
              icon
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === 15}
            >
              <Icon name="chevron right" />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
);

export default BasicTable;
