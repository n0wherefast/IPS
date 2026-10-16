const xlsx = require('xlsx');
const path = require('path');
const inFile = process.argv[2];
if (!inFile) { console.error('Usage: node inspect-xlsx.js <file.xlsx>'); process.exit(1); }
const wb = xlsx.readFile(inFile);
const sheetName = wb.SheetNames[0];
const data = xlsx.utils.sheet_to_json(wb.Sheets[sheetName], { defval: '' });
console.log('Sheet:', sheetName);
console.log('Rows:', data.length);
console.log('Sample rows (first 5):');
console.log(JSON.stringify(data.slice(0,5), null, 2));
