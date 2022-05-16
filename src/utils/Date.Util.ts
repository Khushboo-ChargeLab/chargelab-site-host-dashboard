import {
  format, isValid, addDays as addDaysfns,
  addMonths as addMonthsfns, differenceInDays as differenceInDaysfns,
  startOfMonth, startOfWeek, endOfWeek, endOfMonth, formatISO,
  toDate,
  parseISO,
  differenceInMinutes,
  getYear, getMonth, subDays, subMonths,
} from 'date-fns';

export const formatDate = (date: Date, dateFormat: string = 'LLL dd, yyyy') => {
  if (isValid(date)) {
    return format(date, dateFormat || 'LLL dd, yyyy');
  }

  return '';
};

export const formatTime = (date: Date, dateFormat: string = 'HH:mm') => {
  if (isValid(date)) {
    return format(date, dateFormat);
  }

  return '';
};

export const formatDateTime = (date: Date, dateFormat: string = 'LLL dd, yyyy HH:mm a') => {
  if (isValid(date)) {
    return format(date, dateFormat);
  }

  return '';
};

export const addDays = (date: Date | number, days: number) => addDaysfns(date, days);
export const addMonths = (date: Date | number, amount: number) => addMonthsfns(date, amount);
export const differenceInDays = (startDate: Date | number, endDate: Date | number) => differenceInDaysfns(startDate, endDate);

export const getLastMonth = (date: Date = new Date()) => {
  const startDate = subMonths(date, 1);
  return [startDate, date];
};

export const getLastWeek = (date: Date = new Date()) => {
  const startDate = subDays(date, 6);
  return [startDate, date];
};

export const getShortMonth = (date: Date) => {
  if (!isValid(date)) {
    return formatTime(new Date(`${date}-10`), 'LLL');
  }

  return formatTime(date, 'LLL');
};

export const formatIso = (date: Date) => formatISO(date);
export const convertToDate = (date: any) => parseISO(date);

export const getDifferenceInMinutes = (laterDate: Date, earlierDate: Date, options?: {}) => {
  if (isValid(laterDate) && isValid(earlierDate)) {
    return differenceInMinutes(laterDate, earlierDate, options);
  }
  return '';
};

export const formatDateRange = (dates: Date[]) => {
  if (!dates || dates.length < 2 || dates[0] >= dates[1]) return '';

  if (getYear(dates[0]) === getYear(dates[1])) {
    if (getMonth(dates[0]) === getMonth(dates[1])) {
      return `${format(dates[0], 'LLL dd')} - ${format(dates[1], 'dd, yyyy')}`;
    }
      return `${format(dates[0], 'LLL dd')} - ${format(dates[1], 'LLL dd, yyyy')}`;
  }
    return `${format(dates[0], 'LLL dd, yyyy')} - ${format(dates[1], 'LLL dd, yyyy')}`;
};
