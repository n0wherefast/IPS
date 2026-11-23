const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const inFile = process.argv[2];
if (!inFile) {
  console.error('Usage: node scripts/xlsx-to-json.js <file.xlsx>');
  process.exit(1);
}

const wb = xlsx.readFile(inFile);
const sheetName = wb.SheetNames[0];
const raw = xlsx.utils.sheet_to_json(wb.Sheets[sheetName], { defval: '' });

const normalized = raw
  .filter(r => Object.values(r).some(v => v !== ''))
  .map((r, i) => ({
    id: r.id ?? `k${i+1}`,
    name: r.Name ?? r.name ?? r.Title ?? r['Dish'] ?? '',
    description: r.Description ?? r.description ?? '',
    price: Number(String(r.Price ?? r.price ?? r.Prezzo ?? '').replace(/[^\d.,-]/g, '').replace(',', '.')) || 0,
    category: r.Category ?? r.category ?? 'Uncategorized',
    image: r.Image ?? ''
  }));

const outDir = path.join(process.cwd(), 'app', 'api', 'kitchen');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'data.json'), JSON.stringify(normalized, null, 2), 'utf8');
console.log('Wrote', path.join(outDir, 'data.json'), 'items:', normalized.length);
