/* eslint-disable no-extend-native */
declare global {  
  interface Number {    
    toThousandSeperator(): string;    
    toLocaleCurrency(currency:string): string;
  }
}

// 12389.12 -> 12,389.12
Number.prototype.toThousandSeperator = function(): string {  
  return Intl.NumberFormat().format(Number(this))
}   

// check locals code and currency code list on confluence

// 12389.12 -> $12,389.12
Number.prototype.toLocaleCurrency = function(currency='USD'): string {  
  return Intl.NumberFormat(navigator.language, { style: 'currency', currency: currency }).format(Number(this)) 
}   

export {}; 