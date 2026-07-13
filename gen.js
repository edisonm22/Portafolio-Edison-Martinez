const fs = require('fs');
const path = require('path');
const root = 'C:\\Users\\gomita\\portfolio';
function w(rel, content) {
  const full = path.join(root, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
  console.log('OK ->', rel);
}
module.exports = { w, root };
