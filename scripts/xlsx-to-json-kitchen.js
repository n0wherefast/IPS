const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const inFile = process.argv[2];
if (!inFile) {
  console.error('Usage: node xlsx-to-json-kitchen.js <file.xlsx>');
  process.exit(1);
}

const wb = xlsx.readFile(inFile);
const sheetName = wb.SheetNames[0];
const raw = xlsx.utils.sheet_to_json(wb.Sheets[sheetName], { defval: '' });

function findField(obj, candidates) {
  const keys = Object.keys(obj);
  for (const c of candidates) {
    const k = keys.find(kk => kk.trim().toLowerCase() === c.toLowerCase());
    if (k) return obj[k];
  }
  for (const c of candidates) {
    const k = keys.find(kk => kk.toLowerCase().includes(c.toLowerCase()));
    if (k) return obj[k];
  }
  return '';
}

const normalized = raw
  .filter(r => {
    const type = String(findField(r, ['TYPE','Type','type'])).trim().toUpperCase();
    return type !== 'PIZZA' && type !== 'PIZZA ';
  })
  .filter(r => Object.values(r).some(v => v !== ''))
  .map((r, i) => {
    const name = findField(r, ['NAME','Name','name','Dish']);
    const ingredients = findField(r, ['INGREDIENTS','Ingredients','ingredients']);
    const note = findField(r, ['NOTE','Note','note']);
    const cls = findField(r, ['CLASS','Class','class']);
    const type = findField(r, ['TYPE','Type','type']);

    // find price columns
    const keys = Object.keys(r);
    let price = 0;
    for (const k of keys) {
      const kl = k.toLowerCase();
      if (kl.includes('price')) {
        const rawv = String(r[k]).replace(/[^0-9,\.\-]/g, '').trim().replace(',', '.');
        const num = Number(rawv) || 0;
        if (num > 0) { price = num; break; }
      }
    }

    return {
      id: `k${i+1}`,
      name: String(name).trim(),
      description: [String(ingredients).trim(), String(note).trim()].filter(Boolean).join(' ').trim(),
      price: price,
      category: String(cls || type || 'Uncategorized').trim(),
      image: '/wep_files/placeholder-food.svg'
    };
  });

const outDir = path.join(process.cwd(), 'app', 'api', 'kitchen');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'data.json'), JSON.stringify(normalized, null, 2), 'utf8');
console.log('Wrote', path.join(outDir, 'data.json'), 'items:', normalized.length);
