import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(scriptDir, '..');
const inputPath = resolve(rootDir, 'public/og-default.svg');
const outputPath = resolve(rootDir, 'public/og-default.png');

const svg = await readFile(inputPath);
const image = sharp(svg);
const pngBuffer = await image.png({ compressionLevel: 9, adaptiveFiltering: true }).toBuffer();
const metadata = await sharp(pngBuffer).metadata();

if (metadata.width !== 1200 || metadata.height !== 630) {
  throw new Error(
    `Expected ${inputPath} to rasterize to 1200x630, got ${metadata.width ?? 'unknown'}x${metadata.height ?? 'unknown'}`
  );
}

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, pngBuffer);

console.log(`Generated ${outputPath} (${metadata.width}x${metadata.height})`);
