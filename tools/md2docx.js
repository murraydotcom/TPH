// Markdown -> DOCX converter tailored to the CharmEd Minds training guide.
const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, TableOfContents,
  Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType,
  AlignmentType, PageBreak, LevelFormat, ExternalHyperlink,
} = require('docx');

const SRC = process.argv[2];
const OUT = process.argv[3];
const lines = fs.readFileSync(SRC, 'utf8').split('\n');

const NAVY = '1F3864';
const ACCENT = '2E74B5';
const HEADER_BG = '1F3864';
const ZEBRA = 'EAF0F8';

// ---- inline formatting ----
function runs(text, base = {}) {
  const out = [];
  // tokenize on `code`, **bold**, *italic*
  const re = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)/g;
  let last = 0, m;
  const push = (t, extra) => { if (t) out.push(new TextRun({ text: t, ...base, ...extra })); };
  while ((m = re.exec(text)) !== null) {
    push(text.slice(last, m.index));
    if (m[1]) push(m[1].slice(1, -1), { font: 'Consolas', bold: true, color: '9C2D2D' });
    else if (m[2]) push(m[2].slice(2, -2), { bold: true });
    else if (m[3]) push(m[3].slice(1, -1), { italics: true });
    last = re.lastIndex;
  }
  push(text.slice(last));
  return out.length ? out : [new TextRun({ text: '', ...base })];
}

function splitCells(row) {
  return row.replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());
}

function makeTable(header, rows) {
  const ncol = header.length;
  const totalW = 9360; // ~6.5in usable at DXA
  const colW = Math.floor(totalW / ncol);
  const colWidths = Array(ncol).fill(colW);
  colWidths[ncol - 1] = totalW - colW * (ncol - 1);

  const border = { style: BorderStyle.SINGLE, size: 4, color: 'B7C4DC' };
  const borders = { top: border, bottom: border, left: border, right: border,
    insideHorizontal: border, insideVertical: border };

  const mkCell = (text, i, opts = {}) => new TableCell({
    width: { size: colWidths[i], type: WidthType.DXA },
    shading: opts.shading ? { type: ShadingType.CLEAR, fill: opts.shading, color: 'auto' } : undefined,
    margins: { top: 40, bottom: 40, left: 80, right: 80 },
    children: [new Paragraph({
      spacing: { before: 20, after: 20 },
      children: runs(text, opts.header ? { bold: true, color: 'FFFFFF', size: 19 } : { size: 19 }),
    })],
  });

  const headerRow = new TableRow({
    tableHeader: true,
    children: header.map((h, i) => mkCell(h, i, { header: true, shading: HEADER_BG })),
  });
  const bodyRows = rows.map((r, ri) => new TableRow({
    children: r.map((c, i) => mkCell(c, i, { shading: ri % 2 ? ZEBRA : undefined })),
  }));

  return new Table({
    columnWidths: colWidths,
    width: { size: totalW, type: WidthType.DXA },
    borders,
    rows: [headerRow, ...bodyRows],
  });
}

const children = [];

// ---- Title page ----
children.push(
  new Paragraph({ spacing: { before: 2400, after: 0 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'CharmEd Minds™', bold: true, size: 60, color: NAVY })] }),
  new Paragraph({ spacing: { before: 120, after: 0 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'Employee Training Guide', bold: true, size: 40, color: ACCENT })] }),
  new Paragraph({ spacing: { before: 240, after: 0 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'Confidence Through Cognition and Education', italics: true, size: 26, color: '555555' })] }),
  new Paragraph({ spacing: { before: 480, after: 0 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'BHW Medical Group', bold: true, size: 24 })] }),
  new Paragraph({ spacing: { before: 60, after: 0 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'Lifespan Cognitive Health & Executive Functioning · Ages 5–90', size: 22, color: '555555' })] }),
  new Paragraph({ children: [new PageBreak()] }),
);

// ---- TOC ----
children.push(
  new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { after: 120 },
    children: [new TextRun({ text: 'Contents', bold: true, color: NAVY })] }),
  new TableOfContents('Contents', { hyperlink: true, headingStyleRange: '1-2' }),
  new Paragraph({ children: [new PageBreak()] }),
);

// ---- Body parsing ----
let i = 0;
const skipTop = () => {
  // skip the guide's own H1 title block + first HR (already on title page)
};

while (i < lines.length) {
  let line = lines[i];

  // Table detection
  if (/^\s*\|/.test(line) && i + 1 < lines.length && /^\s*\|?\s*:?-{2,}/.test(lines[i + 1])) {
    const header = splitCells(line);
    i += 2;
    const rows = [];
    while (i < lines.length && /^\s*\|/.test(lines[i])) { rows.push(splitCells(lines[i])); i++; }
    children.push(makeTable(header, rows));
    children.push(new Paragraph({ spacing: { after: 120 }, children: [] }));
    continue;
  }

  const trimmed = line.trim();

  // Horizontal rule -> subtle spacing (skip literal rule lines)
  if (/^---+$/.test(trimmed)) {
    children.push(new Paragraph({
      spacing: { before: 60, after: 120 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'C9D3E6', space: 1 } },
      children: [],
    }));
    i++; continue;
  }

  // Headings
  let hm = /^(#{1,6})\s+(.*)$/.exec(line);
  if (hm) {
    const level = hm[1].length;
    let text = hm[2].replace(/\s*#*\s*$/, '');
    // Skip the document's own top title (# CharmEd Minds Employee Training Guide) — on title page
    if (level === 1 && /Employee Training Guide/.test(text)) { i++; continue; }
    if (/^Table of Contents$/i.test(text)) {
      // skip the markdown TOC block entirely
      i++;
      while (i < lines.length && !/^#{1,6}\s/.test(lines[i]) && !/^---+$/.test(lines[i].trim())) i++;
      continue;
    }
    const map = { 1: HeadingLevel.HEADING_1, 2: HeadingLevel.HEADING_2, 3: HeadingLevel.HEADING_3,
      4: HeadingLevel.HEADING_4, 5: HeadingLevel.HEADING_5, 6: HeadingLevel.HEADING_6 };
    const color = level === 1 ? NAVY : level === 2 ? ACCENT : '2A2A2A';
    const size = level === 1 ? 30 : level === 2 ? 26 : level === 3 ? 23 : 21;
    if (level === 1) children.push(new Paragraph({ children: [new PageBreak()] }));
    children.push(new Paragraph({
      heading: map[level],
      spacing: { before: level <= 2 ? 200 : 140, after: 80 },
      children: [new TextRun({ text, bold: true, color, size })],
    }));
    i++; continue;
  }

  // Blockquote
  if (/^>\s?/.test(line)) {
    const buf = [];
    while (i < lines.length && /^>\s?/.test(lines[i])) { buf.push(lines[i].replace(/^>\s?/, '')); i++; }
    children.push(new Paragraph({
      spacing: { before: 60, after: 120 },
      indent: { left: 360 },
      border: { left: { style: BorderStyle.SINGLE, size: 18, color: ACCENT, space: 12 } },
      shading: { type: ShadingType.CLEAR, fill: 'F2F6FC', color: 'auto' },
      children: runs(buf.join(' ').trim(), { italics: true, color: '333333' }),
    }));
    continue;
  }

  // Bullet list
  let bm = /^(\s*)[-*]\s+(.*)$/.exec(line);
  if (bm) {
    const indent = Math.floor(bm[1].length / 2);
    children.push(new Paragraph({
      numbering: { reference: 'bullets', level: Math.min(indent, 2) },
      spacing: { after: 40 },
      children: runs(bm[2]),
    }));
    i++; continue;
  }

  // Numbered list
  let nm = /^(\s*)\d+\.\s+(.*)$/.exec(line);
  if (nm) {
    children.push(new Paragraph({
      numbering: { reference: 'numbers', level: 0 },
      spacing: { after: 40 },
      children: runs(nm[2]),
    }));
    i++; continue;
  }

  // Blank
  if (trimmed === '') { i++; continue; }

  // Normal paragraph
  children.push(new Paragraph({ spacing: { after: 120 }, children: runs(trimmed) }));
  i++;
}

const doc = new Document({
  creator: 'BHW Medical Group',
  title: 'CharmEd Minds Employee Training Guide',
  styles: {
    default: { document: { run: { font: 'Calibri', size: 21 } } },
  },
  numbering: {
    config: [
      { reference: 'bullets', levels: [
        { level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 360, hanging: 200 } } } },
        { level: 1, format: LevelFormat.BULLET, text: '◦', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 200 } } } },
        { level: 2, format: LevelFormat.BULLET, text: '▪', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 1080, hanging: 200 } } } },
      ] },
      { reference: 'numbers', levels: [
        { level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 360, hanging: 220 } } } },
      ] },
    ],
  },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 },
      margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } },
    children,
  }],
});

Packer.toBuffer(doc).then(buf => { fs.writeFileSync(OUT, buf); console.log('wrote', OUT); });
