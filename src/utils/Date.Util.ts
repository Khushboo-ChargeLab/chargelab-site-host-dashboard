import {
  format, isValid, addDays as addDaysfns,
  addMonths as addMonthsfns, differenceInDays as differenceInDaysfns,
  startOfMonth, startOfWeek, endOfWeek, endOfMonth, formatISO,
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

export const getLastMonth = (date?: Date) => {
  const result = addMonths(date || new Date(), -1);
  return [startOfMonth(result), endOfMonth(result)];
};

export const getLastWeek = (date?: Date) => {
  const result = addDays(date || new Date(), -7);
  return [startOfWeek(result), endOfWeek(result)];
};

export const getShortMonth = (date: Date) => formatTime(date, 'LLL');
export const formatIso = (date: Date) => formatISO(date);