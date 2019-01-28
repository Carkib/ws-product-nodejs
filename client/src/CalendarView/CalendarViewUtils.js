import { format, parse } from "date-fns";

export const makeCalendarDayData = event => ({
  date: format(parse(event.date), "YYYY-MM-DD"),
  count: event.events
});

export const classForCount = value => {
  if (!value || !value.count) {
    return "color-github-0";
  } else if (value.count < 15) {
    return "color-github-1";
  } else if (value.count < 30) {
    return "color-github-2";
  } else if (value.count < 45) {
    return "color-github-3";
  }
  return "color-github-4";
};

export const toolTipText = value => {
  if (!value) {
    return "";
  }
  return `${value.count} events on ${value.date}`;
};
