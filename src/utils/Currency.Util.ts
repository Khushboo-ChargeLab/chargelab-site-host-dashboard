export const convertToLocaleCurrency = (input:number, currency:string='USD') => {
    return Intl.NumberFormat(navigator.language, { style: 'currency', currency: currency }).format(input) 
  }