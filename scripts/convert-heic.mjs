import fs from 'node:fs/promises';
import heicConvert from 'heic-convert';

const [input, output] = process.argv.slice(2);

if (!input || !output) {
  console.error('usage: node scripts/convert-heic.mjs input.heic output.jpg');
  process.exit(2);
}

const inputBuffer = await fs.readFile(input);
const outputBuffer = await heicConvert({
  buffer: inputBuffer,
  format: 'JPEG',
  quality: 0.9,
});

await fs.writeFile(output, Buffer.from(outputBuffer));
