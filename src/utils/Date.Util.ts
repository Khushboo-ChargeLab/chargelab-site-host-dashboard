import {
    format, isValid, addDays as addDaysfns,
    addMonths as addMonthsfns, differenceInDays as differenceInDaysfns,
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

export const addDays = (date: Date, days: number) => addDaysfns(date, days);
export const addMonths = (date: Date, amount: number) => addMonthsfns(date, amount);
export const differenceInDays = (startDate: Date, endDate: Date) => differenceInDaysfns(startDate, endDate);
