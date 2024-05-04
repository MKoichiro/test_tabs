
// const date = new Date();
// const formattedDate1 = date.toISOString();
// const revivedDate1 = new Date(formattedDate1);
// const formattedDate2 = date.toLocaleString();
// const revivedDate2 = new Date(formattedDate2);
// const formattedDate3 = date.toDateString();
// const revivedDate3 = new Date(formattedDate3);
// const formattedDate4 = date.toTimeString();
// const revivedDate4 = new Date(formattedDate4);
// const formattedDate5 = date.toUTCString();
// const revivedDate5 = new Date(formattedDate5);
// const formattedDate6 = String(date);
// const revivedDate6 = new Date(formattedDate6);

// console.log('toISOString()');
// console.log(formattedDate1);
// console.log(revivedDate1);
// console.log('---------------------------------');
// console.log('toLocaleString()');
// console.log(formattedDate2);
// console.log(revivedDate2);
// console.log('---------------------------------');
// console.log('toDateString()');
// console.log(formattedDate3);
// console.log(revivedDate3);
// console.log('---------------------------------');
// console.log('toTimeString()');
// console.log(formattedDate4);
// console.log(revivedDate4);
// console.log('---------------------------------');
// console.log('toUTCString()');
// console.log(formattedDate5);
// console.log(revivedDate5);
// console.log('---------------------------------');
// console.log('String()');
// console.log(formattedDate6);
// console.log(revivedDate6);
// console.log('---------------------------------');


const getFormattedTime = (dateISO: string) => {
  const date = new Date(dateISO);
  return `${date.getHours()}:${date.getMinutes()}`;
};

const dateISOStr = '2026-01-31T21:26:56.039Z';

console.log(getFormattedTime(dateISOStr));