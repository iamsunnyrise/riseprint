import sharp from 'sharp';

async function checkDarkPixels() {
  const inputPath = 'C:/Users/rise0/.gemini/antigravity/scratch/hindi-wedding-card-maker/src/assets/shubh-vivah-seal-hd.png';
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const width = metadata.width;
  const height = metadata.height;
  const raw = await image.raw().toBuffer(); // 4 channels: RGBA

  let darkOpaqueCount = 0;
  const darkPoints = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = raw[idx];
      const g = raw[idx + 1];
      const b = raw[idx + 2];
      const a = raw[idx + 3];

      if (a > 100 && Math.max(r, g, b) < 35) {
        darkOpaqueCount++;
        if (darkPoints.length < 20) {
          darkPoints.push({ x, y, r, g, b });
        }
      }
    }
  }

  console.log(`Total dark opaque pixels: ${darkOpaqueCount} (${(darkOpaqueCount / (width * height) * 100).toFixed(2)}%)`);
  console.log('Sample points:', darkPoints.slice(0, 5));
}

checkDarkPixels().catch(console.error);
