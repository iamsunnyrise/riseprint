import sharp from 'sharp';
import fs from 'fs';

async function processSealImage() {
  const inputPath = 'C:/Users/rise0/.gemini/antigravity/brain/2e5ae342-a6fd-428e-a5e2-2872ff4ef1f1/.user_uploaded/media_1789362538455.jpg';
  const outputPath = 'C:/Users/rise0/.gemini/antigravity/scratch/hindi-wedding-card-maker/src/assets/shubh-vivah-seal-hd.png';
  const publicOutputPath = 'C:/Users/rise0/.gemini/antigravity/scratch/hindi-wedding-card-maker/public/shubh-vivah-seal-hd.png';

  console.log('Loading image...');
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const width = metadata.width;
  const height = metadata.height;

  const rawBuffer = await image.raw().toBuffer();
  const numPixels = width * height;
  const alphaArray = new Uint8Array(numPixels).fill(255);

  // Background criteria:
  // Pure black seeds: any pixel where max(r, g, b) <= 15
  // Flood fill expand up to threshold 38
  const isSeed = (idx) => {
    const r = rawBuffer[idx * 3];
    const g = rawBuffer[idx * 3 + 1];
    const b = rawBuffer[idx * 3 + 2];
    return Math.max(r, g, b) <= 16;
  };

  const isBackgroundCandidate = (idx) => {
    const r = rawBuffer[idx * 3];
    const g = rawBuffer[idx * 3 + 1];
    const b = rawBuffer[idx * 3 + 2];
    return Math.max(r, g, b) <= 36;
  };

  const visited = new Uint8Array(numPixels).fill(0);
  const queue = new Int32Array(numPixels);
  let queueEnd = 0;
  let queueStart = 0;

  // Add all seeds (including pockets)
  for (let i = 0; i < numPixels; i++) {
    if (isSeed(i)) {
      visited[i] = 1;
      queue[queueEnd++] = i;
    }
  }

  console.log(`Found ${queueEnd} seed background pixels.`);

  // Expand seeds up to boundary
  while (queueStart < queueEnd) {
    const curr = queue[queueStart++];
    alphaArray[curr] = 0;

    const cx = curr % width;
    const cy = Math.floor(curr / width);

    const neighbors = [
      cx > 0 ? curr - 1 : -1,
      cx < width - 1 ? curr + 1 : -1,
      cy > 0 ? curr - width : -1,
      cy < height - 1 ? curr + width : -1
    ];

    for (const n of neighbors) {
      if (n !== -1 && !visited[n] && isBackgroundCandidate(n)) {
        visited[n] = 1;
        queue[queueEnd++] = n;
      }
    }
  }

  console.log(`Total background pixels identified: ${queueEnd} (${Math.round((queueEnd / numPixels) * 100)}%).`);

  // Create RGBA output buffer
  const rgbaBuffer = Buffer.alloc(numPixels * 4);

  // Soft edge anti-aliasing & de-fringing
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      let a = alphaArray[idx];
      let r = rawBuffer[idx * 3];
      let g = rawBuffer[idx * 3 + 1];
      let b = rawBuffer[idx * 3 + 2];

      if (a > 0) {
        let nearTrans = false;
        const maxBrightness = Math.max(r, g, b);

        if (maxBrightness < 65) {
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              const nx = x + dx;
              const ny = y + dy;
              if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                if (alphaArray[ny * width + nx] === 0) {
                  nearTrans = true;
                  break;
                }
              }
            }
            if (nearTrans) break;
          }
        }

        if (nearTrans && maxBrightness < 65) {
          const factor = Math.max(0, Math.min(1, (maxBrightness - 15) / 48));
          a = Math.round(255 * factor);
          if (factor > 0.05) {
            r = Math.min(255, Math.round(r / Math.max(0.3, factor)));
            g = Math.min(255, Math.round(g / Math.max(0.3, factor)));
            b = Math.min(255, Math.round(b / Math.max(0.3, factor)));
          }
        }
      }

      rgbaBuffer[idx * 4] = r;
      rgbaBuffer[idx * 4 + 1] = g;
      rgbaBuffer[idx * 4 + 2] = b;
      rgbaBuffer[idx * 4 + 3] = a;
    }
  }

  console.log('Trimming and saving transparent PNG...');
  const trimmed = await sharp(rgbaBuffer, {
    raw: {
      width,
      height,
      channels: 4
    }
  })
    .trim({
      threshold: 5
    })
    .png({
      quality: 100,
      compressionLevel: 9
    })
    .toBuffer();

  const finalMeta = await sharp(trimmed).metadata();
  console.log(`Trimmed size: ${finalMeta.width} × ${finalMeta.height}`);

  fs.writeFileSync(outputPath, trimmed);
  fs.writeFileSync(publicOutputPath, trimmed);
  console.log('Saved to:', outputPath, 'and', publicOutputPath);
}

processSealImage().catch(console.error);
