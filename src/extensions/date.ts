/* eslint-disable no-extend-native */
/**
 * Mask	Description	
 * YYYY	4-digits year	1984
 * YY	2-digits year	84
 * MMMM	Month name	January
 * MMM	Short month name	Jan
 * DD	2-digits day	17
 * dddd	Day of the week	Tuesday
 * ddd	Short day of the week	Tue
 * A	Day period	AM, PM
 * a	Lowercased day period	am, pm
 * HH	24-hours hour	16
 * hh	12-hours hour	04
 * mm	2-digit minute	13
 * ss	2-digit second	37
 */
declare global {  
    interface Date {    
      toMMYYYY(): string;    
      toMMDDhhmma(): string; 
    }
  }
  
  // Nov 2021
  Date.prototype.toMMYYYY = function(): string { 
    return Intl.DateTimeFormat(navigator.language, { month: 'short', year: 'numeric' }).format(new Date()) 
  }

  // Nov 20, 12:17 pm
  Date.prototype.toMMDDhhmma = function(): string { 
    return Intl.DateTimeFormat(navigator.language, { month: 'short', day:'numeric', hour12:true, hour:'numeric', minute:'numeric' }).format(new Date()) 
  }

  export {}; 