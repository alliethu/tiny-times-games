const sharp = require('sharp');
const path = require('path');

async function generateAssets() {
  const assetsDir = path.join(__dirname, '..', 'assets');

  const iconSvg = `
    <svg width="1024" height="1024" xmlns="http://www.w3.org/2000/svg">
      <rect width="1024" height="1024" rx="200" fill="#6C63FF"/>
      <text x="512" y="440" text-anchor="middle" font-size="320" font-weight="800" fill="white" font-family="Arial, sans-serif">TT</text>
      <text x="512" y="700" text-anchor="middle" font-size="120" font-weight="600" fill="rgba(255,255,255,0.9)" font-family="Arial, sans-serif">GAMES</text>
      <text x="512" y="850" text-anchor="middle" font-size="100">🎮</text>
    </svg>
  `;

  await sharp(Buffer.from(iconSvg))
    .resize(1024, 1024)
    .png()
    .toFile(path.join(assetsDir, 'icon.png'));

  console.log('✅ Generated icon.png');

  const splashSvg = `
    <svg width="1284" height="2778" xmlns="http://www.w3.org/2000/svg">
      <rect width="1284" height="2778" fill="#FAFBFF"/>
      <text x="642" y="1100" text-anchor="middle" font-size="200" font-weight="800" fill="#6C63FF" font-family="Arial, sans-serif">Tiny Times</text>
      <text x="642" y="1350" text-anchor="middle" font-size="180" font-weight="800" fill="#6C63FF" font-family="Arial, sans-serif">Games</text>
      <text x="642" y="1600" text-anchor="middle" font-size="150">🎮</text>
      <text x="642" y="1850" text-anchor="middle" font-size="80" fill="#94A3B8" font-family="Arial, sans-serif">Made for Asher</text>
    </svg>
  `;

  await sharp(Buffer.from(splashSvg))
    .resize(1284, 2778)
    .png()
    .toFile(path.join(assetsDir, 'splash.png'));

  console.log('✅ Generated splash.png');

  const adaptiveSvg = `
    <svg width="1024" height="1024" xmlns="http://www.w3.org/2000/svg">
      <text x="512" y="440" text-anchor="middle" font-size="280" font-weight="800" fill="#6C63FF" font-family="Arial, sans-serif">TT</text>
      <text x="512" y="680" text-anchor="middle" font-size="100" font-weight="600" fill="#6C63FF" font-family="Arial, sans-serif">GAMES</text>
      <text x="512" y="830" text-anchor="middle" font-size="90">🎮</text>
    </svg>
  `;

  await sharp(Buffer.from(adaptiveSvg))
    .resize(1024, 1024)
    .png()
    .toFile(path.join(assetsDir, 'adaptive-icon.png'));

  console.log('✅ Generated adaptive-icon.png');
}

generateAssets().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
