// Menyalin pustaka PDF dan Excel dari node_modules ke folder lib supaya ikut terbungkus di aplikasi.
const fs = require('fs');
const path = require('path');
fs.mkdirSync('lib', { recursive: true });
const files = [
  ['node_modules/jspdf/dist/jspdf.umd.min.js', 'lib/jspdf.umd.min.js'],
  ['node_modules/xlsx/dist/xlsx.full.min.js', 'lib/xlsx.full.min.js']
];
for (const [from, to] of files) {
  if (!fs.existsSync(from)) { console.error('File tidak ditemukan: ' + from); process.exit(1); }
  fs.copyFileSync(from, to);
  console.log('Disalin: ' + to);
}
