const enUSFormatNumber = (num) => {
  return new Intl.NumberFormat('en-US').format(num);
}

export default enUSFormatNumber;