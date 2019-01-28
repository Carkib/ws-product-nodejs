import React from "react";
import { format, parse } from "date-fns";
import { Menu, Table } from "semantic-ui-react";

export const makeRowData = event => ({
  date: parse(event.date).setHours(event.hour),
  number: event.events
});

export const renderRow = row => (
  <Table.Row key={`${row.date}`}>
    <Table.Cell>{format(row.date, "YYYY-MM-DD")}</Table.Cell>
    <Table.Cell>{format(row.date, "h a")}</Table.Cell>
    <Table.Cell>{row.number}</Table.Cell>
  </Table.Row>
);

export const renderPageNumber = (changePage, currentPage) => pageNumber => (
  <Menu.Item
    key={pageNumber}
    as="a"
    onClick={() => changePage(pageNumber)}
    active={currentPage === pageNumber}
  >
    {pageNumber}
  </Menu.Item>
);

export const renderHeader = columns => (
  <Table.Row>
    {columns.map(columnName => (
      <Table.HeaderCell key={columnName}>{columnName}</Table.HeaderCell>
    ))}
  </Table.Row>
);
