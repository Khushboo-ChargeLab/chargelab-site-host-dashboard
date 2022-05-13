export const convertToLocaleCurrency = (
  input: number,
  currency: string = 'USD',
) => {
  const result = Intl.NumberFormat(navigator.language, { style: 'currency', currency }).format(
    input,
  );
  // This is a hard fix, people don't want to US and CA for intl standard currency
  return result.startsWith('US') || result.startsWith('CA') ? result.substring(2) : result;
};
