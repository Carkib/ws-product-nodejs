import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import {
  classForCount,
  makeCalendarDayData,
  toolTipText
} from "./CalendarViewUtils";

export const CalendarView = ({ events }) => (
  <CalendarHeatmap
    startDate={new Date("2016-12-31")}
    endDate={new Date("2017-07-01")}
    values={events.map(makeCalendarDayData)}
    classForValue={classForCount}
    titleForValue={toolTipText}
    showWeekdayLabels
  />
);
