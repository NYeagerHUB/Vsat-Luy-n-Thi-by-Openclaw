// Utility functions shared across all modules

function renderMathHTML(str) {
  if (!str) return '';
  if (!window.katex) return escHTML(str);
  const parts = [];
  const pattern = /(\$\$[\s\S]+?\$\$|\$[^\$\n]+?\$|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\))/g;
  let lastIdx = 0, match;
  pattern.lastIndex = 0;
  while ((match = pattern.exec(str)) !== null) {
    if (match.index > lastIdx) parts.push({type: 'text', val: str.slice(lastIdx, match.index)});
    parts.push({type: 'math', val: match[0]});
    lastIdx = match.index + match[0].length;
  }
  if (lastIdx < str.length) parts.push({type: 'text', val: str.slice(lastIdx)});
  if (!parts.length) return escHTML(str);
  return parts.map(p => {
    if (p.type === 'text') return escHTML(p.val);
    const isDisplay = p.val.startsWith('$$') || p.val.startsWith('\\[');
    let inner = p.val;
    if (inner.startsWith('$$')) inner = inner.slice(2, -2);
    else if (inner.startsWith('$')) inner = inner.slice(1, -1);
    else if (inner.startsWith('\\[')) inner = inner.slice(2, -2);
    else if (inner.startsWith('\\(')) inner = inner.slice(2, -2);
    try {
      return katex.renderToString(inner.trim(), {
        throwOnError:false, displayMode:isDisplay, output:'html', trust:false, strict:false,
        macros:{'\\R':'\\mathbb{R}','\\N':'\\mathbb{N}','\\Z':'\\mathbb{Z}','\\vec':'\\overrightarrow'}
      });
    } catch { return escHTML(p.val); }
  }).join('');
}

function escHTML(s) {
  return String(s || '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

// Exam file mapping
const examFileMap = {
  'sample-hoa': 'sample-hoa.json',
  'toan-de-1': 'toan-de-1.json',
  'de-13': 'de-13.json',
  'de-14': 'de-14.json',
  'de-15': 'de-15.json',
  'de-can-tho-2025': 'de-can-tho-2025.json',
  'handout-1': 'HANDOUT ĐỀ SỐ 1.json',
  'handout-2': 'HANDOUT ĐỀ SỐ 2.json',
  'handout-6': 'HANDOUT ĐỀ SỐ 6.json',
  'lich-su-5': 'LICH SU - DE SO 5.json',
  'ngan-hang-mau': 'ngan-hang-mau.json',
  'vat-ly-0': 'VAT LY - DE SO 0.json'
};
