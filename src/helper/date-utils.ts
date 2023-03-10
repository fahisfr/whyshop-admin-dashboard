import { format } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

export const getDate = (date: string) => {
  const utcDate = zonedTimeToUtc(
    date,
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  // Format the date as "YYYY/MM/DD HH:mm:ss"
  return format(utcDate, "yyyy/MM/dd HH:mm:ss");
};

export const days: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
