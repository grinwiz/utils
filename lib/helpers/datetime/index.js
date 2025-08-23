const moment = require('moment-timezone');

const getCurrentDateTime = () => {
  return moment()
    .utc()
    .toDate();
};

const formatDSTime = (date, format = 'YYYY-MM-DD') => {
  return moment(date).format(format);
};

const addYears = (date, count) => {
  return moment
    .utc(date)
    .add(count, 'y')
    .toDate();
};

const addMonths = (date, count) => {
  return moment
    .utc(date)
    .add(count, 'M')
    .toDate();
};

const addDays = (date, count) => {
  return moment
    .utc(date)
    .add(count, 'd')
    .toDate();
};

const addHours = (date, count) => {
  return moment
    .utc(date)
    .add(count, 'h')
    .toDate();
};

const addMinutes = (date, count) => {
  return moment
    .utc(date)
    .add(count, 'm')
    .toDate();
};

const convertTimezone = (date, timezone = "Asia/Jakarta") => {
  return moment(date).tz(timezone).format();
};

const dayDiff = (fromDate, toDate) => {
  return moment(toDate).diff(moment(fromDate), 'days');
};

module.exports = {
  getCurrentDateTime,
  formatDSTime,
  addYears,
  addMonths,
  addDays,
  addHours,
  addMinutes,
  convertTimezone,
  dayDiff
}