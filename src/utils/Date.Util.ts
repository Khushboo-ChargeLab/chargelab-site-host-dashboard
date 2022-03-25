import { format, isValid } from 'date-fns';

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
