// Prints a Markdown coverage table from jest's json-summary reporter output.
// Usage: node scripts/utils/coverage-summary.cjs <coverage-dir>...
const fs = require('fs');
const path = require('path');

const metrics = ['statements', 'branches', 'functions', 'lines'];
const rows = [];
for (const dir of process.argv.slice(2)) {
  const file = path.join(dir, 'coverage-summary.json');
  if (!fs.existsSync(file)) {
    rows.push(`| \`${dir}\` | ${metrics.map(() => 'n/a').join(' | ')} |`);
    continue;
  }
  const { total } = JSON.parse(fs.readFileSync(file, 'utf8'));
  rows.push(`| \`${dir}\` | ${metrics.map((m) => `${total[m].pct}%`).join(' | ')} |`);
}

console.log('### Coverage\n');
console.log(`| Package | ${metrics.join(' | ')} |`);
console.log(`| --- | ${metrics.map(() => '---:').join(' | ')} |`);
console.log(rows.join('\n'));
