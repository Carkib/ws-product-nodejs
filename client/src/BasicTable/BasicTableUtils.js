import React from "react";
import { format, parse } from "date-fns";
import { Table } from "semantic-ui-react";
import Highlight from "./Highlight";

export const makeRowData = event => ({
  date: parse(event.date).setHours(event.hour),
  number: event.events.toString()
});

export const renderRow = match => row => (
  <Table.Row key={`${row.date}`}>
    <Table.Cell>
      <Highlight match={match}>{format(row.date, "YYYY-MM-DD")}</Highlight>
    </Table.Cell>
    <Table.Cell>
      <Highlight match={match}>{format(row.date, "H")}</Highlight>
    </Table.Cell>
    <Table.Cell>
      <Highlight match={match}>{row.number}</Highlight>
    </Table.Cell>
  </Table.Row>
);

export const renderHeader = columns => (
  <Table.Row>
    {columns.map(columnName => (
      <Table.HeaderCell key={columnName}>{columnName}</Table.HeaderCell>
    ))}
  </Table.Row>
);
