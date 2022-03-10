export const convertToThousandSeperator = (input:number) => {
    return Intl.NumberFormat().format(input)
  }