export const convertToThousandSeperator = (input: number) => {
  if (!input) {
    return '';
  }
  
  return Intl.NumberFormat().format(input)
}