export const convertToLocaleCurrency = (input: number, currency: string = 'USD') => Intl.NumberFormat(navigator.language, { style: 'currency', currency }).format(input);