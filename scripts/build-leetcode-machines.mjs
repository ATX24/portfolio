import { readFileSync, writeFileSync } from 'node:fs';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

const source = JSON.parse(readFileSync(new URL('../content/leetcode-machines.json', import.meta.url), 'utf8'));
const escape = value => sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} });
let markdown = source.blocks.map(block => block.markdown).join('\n\n');
for (const [reference, asset] of Object.entries(source.assets ?? {})) {
  if (!/^assets\/leetcode-machines\/[\w./-]+$/.test(asset) || asset.includes('..')) throw new Error('Invalid asset path');
  markdown = markdown.replaceAll(reference, asset);
}
if (/(?:project-file:|library-file:|visualize:)/.test(markdown)) {
  throw new Error('Export source Page attachments and add their local paths to source.assets before publishing.');
}
const content = sanitizeHtml(marked.parse(markdown), {
  allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img'],
  allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, img: ['src', 'alt', 'title', 'width', 'height'] },
  allowedSchemes: ['https', 'http', 'mailto'],
});
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Notes and interactive machines for learning algorithms by Dhilan Shah.">
  <title>LeetCode Machines | Dhilan Shah</title>
  <link rel="stylesheet" href="style.css">
  <style>
    .machines { max-width: 800px; line-height: 1.75; padding: 32px 24px 80px; }
    .machines h1 { height: auto; overflow: visible; text-align: left; line-height: 1.15; font-size: clamp(2rem, 6vw, 3rem); }
    .machines article h1, .machines article h2 { font-size: 1.7rem; margin-top: 2em; }
    .machines a { color: #b9d8ff; overflow-wrap: anywhere; }
    .machines pre { overflow-x: auto; padding: 16px; background: #222; border-radius: 6px; }
    .machines img { max-width: 100%; height: auto; }
    .machines table { display: block; overflow-x: auto; border-collapse: collapse; }
    .machines td, .machines th { border: 1px solid #666; padding: 8px 12px; }
    .machines blockquote { margin-left: 0; padding-left: 20px; border-left: 3px solid #888; }
    .machines .eyebrow { color: #bbb; margin-bottom: 8px; }
  </style>
</head>
<body>
  <header><nav aria-label="Main navigation"><ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="blog.html">Blog</a></li>
    <li><a href="leetcode-machines.html" aria-current="page">LeetCode Machines</a></li>
  </ul></nav></header>
  <main class="machines">
    <p class="eyebrow">LEARNING / ALGORITHMS</p>
    <h1>${escape(source.title)}</h1>
    <article aria-label="LeetCode notes">${content}</article>
  </main>
  <footer><p>Dhilan Shah</p></footer>
</body>
</html>
`;
writeFileSync(new URL('../leetcode-machines.html', import.meta.url), html);
