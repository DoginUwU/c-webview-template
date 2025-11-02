#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

if (process.argv.length !== 4) {
  console.error('Usage: tsx postbuild.ts <input.html> <output.h>');
  process.exit(1);
}

const inputPath = path.resolve(process.argv[2]);
const outputPath = path.resolve(process.argv[3]);

if (!fs.existsSync(inputPath)) {
  console.error(`Input file does not exist: ${inputPath}`);
  process.exit(1);
}

let html = fs.readFileSync(inputPath, 'utf-8');

html = html
  .replace(/\s+/g, ' ')
  .replace(/>\s+</g, '><')
  .trim();

const CHUNK_SIZE = 16000; // ~16KB literal
const chunks = [];

for (let i = 0; i < html.length; i += CHUNK_SIZE) {
  let chunk = html.slice(i, i + CHUNK_SIZE);
  chunk = chunk.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, "\\n\"\n\"");
  chunks.push(`"${chunk}"`);
}

const header = `#pragma once
// Auto-generated from ${path.basename(inputPath)}
// Do not edit manually.

constexpr const char* INDEX_HTML =
${chunks.join("\n")};
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, header);

console.log(`Generated header: ${outputPath}`);
