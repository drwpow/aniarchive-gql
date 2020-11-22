const fs = require('fs');
const path = require('path');

const CWD = path.join(__dirname, '..', 'prisma', 'data');
const dataFiles = fs.readdirSync(CWD);

function length(text) {
  let l = 0;
  for (char in text) {
    l += text.charCodeAt(char) > 10000 ? 1.625 : 1;
  }
  return l;
}

dataFiles.forEach((f) => {
  const filepath = path.join(CWD, f);
  let code = fs.readFileSync(filepath, 'utf-8');

  // pre-pass: condense arrays
  code = code.replace(/\[[^\]]+/g, (match) => match.replace(/\s+/g, ''));
  // pre-pass: remove EOL space
  code = code.replace(/[ ]+}[ ]+$/gm, ' }');
  // pre-pass: compress space after colon
  code = code.replace(/(":)\s*/g, '$1 ');

  // pass 1: measure longest colummns
  const lengths = [0];
  let lines = code.split('\n');
  for (const n in lines) {
    if (lines[n].length < 2 || lines[n].indexOf('{') === -1) {
      continue;
    }
    const rowHead = length(lines[n].substring(0, lines[n].indexOf(':')).trim());
    if (rowHead > lengths[0]) {
      lengths[0] = rowHead;
    }
    lines[n]
      .substr(rowHead)
      .match(/"[^"]+":\s*("[^"]+"|\d+|\[[^\]]*\]),/g)
      .forEach((match, i) => {
        const colLength = length(match.trim());
        if (!lengths[i + 1] || colLength > lengths[i + 1]) {
          lengths[i + 1] = colLength;
        }
      });
  }

  // pass 1.5: normalize column values
  let maxReached = false; // if a certain column exceeds a particular length, stop spacing out and condense everything
  lengths.forEach((l, i) => {
    if (l >= 120 || maxReached) {
      maxReached = true;
      lengths[i] = undefined;
    }
  });

  // pass 2: align columns
  for (const n in lines) {
    if (lines[n].length < 2 || lines[n].indexOf('{') === -1) {
      continue;
    }

    const [rowHead, ...cols] = lengths;

    // 2.1: row head
    if (rowHead) {
      lines[n] = lines[n].replace(/[^{]+/, (match) => {
        const key = match.trim();
        return `  ${key}${new Array(Math.ceil(rowHead - length(key) + 3)).join(' ')}`;
      });
    }

    // 2.2: spacing
    lines[n] = lines[n].replace(/{\s*/, '{ ');

    // 2.3: columns
    lines[n]
      .substr(rowHead)
      .match(/"[^"]+":\s*("[^"]+"|\d+|\[[^\]]*\]),\s*/g)
      .forEach((match, i) => {
        lines[n] = lines[n].replace(match, (submatch) => {
          let replacement = submatch.replace(/:\s*/, ': ').trim();
          return cols[i]
            ? `${replacement}${new Array(Math.ceil(cols[i] - length(replacement) + 2)).join(' ')}`
            : `${replacement} `;
        });
      });
  }

  // save file
  fs.writeFileSync(path.join(filepath), lines.join('\n'), 'utf-8');
});
