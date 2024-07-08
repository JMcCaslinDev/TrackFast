// app/dashboard/DateConversion/dateUtils.js

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const getUserTimeZone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const toLocalDateString = (utcDate, timeZone) => {
  return dayjs(utcDate).tz(timeZone).format('YYYY-MM-DDTHH:mm:ss');
};

export const toUTC = (localDate, timeZone) => {
  return dayjs.tz(localDate, timeZone).utc().format();
};
