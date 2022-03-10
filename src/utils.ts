// 12389.12 -> 12,389.12
export const convertToThousandSeperator = (input:number) => {
  return Intl.NumberFormat().format(input)
}
// 12389.12 -> $12,389.12
export const convertToLocaleCurrency = (input:number, currency:string='USD') => {
  return Intl.NumberFormat(navigator.language, { style: 'currency', currency: currency }).format(input) 
}