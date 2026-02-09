const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF(inputPath, outputPath) {
  console.log(`Generating PDF: ${outputPath}`);
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none']
  });
  
  const page = await browser.newPage();
  
  // Set higher resolution for better quality
  await page.setViewport({
    width: 816,  // 8.5 inches at 96 DPI
    height: 1056, // 11 inches at 96 DPI
    deviceScaleFactor: 2  // 2x for crisp text
  });
  
  // Load the HTML file
  const htmlPath = `file://${inputPath}`;
  await page.goto(htmlPath, { 
    waitUntil: 'networkidle0',
    timeout: 30000 
  });
  
  // Wait for fonts to load
  await page.evaluateHandle('document.fonts.ready');
  
  // Hide the print button and fix any layout issues
  await page.evaluate(() => {
    // Hide print button
    const btn = document.querySelector('.print-btn');
    if (btn) btn.style.display = 'none';
    const noPrint = document.querySelectorAll('.no-print');
    noPrint.forEach(el => el.style.display = 'none');
    
    // Remove any empty pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
      if (page.textContent.trim() === '') {
        page.style.display = 'none';
      }
    });
  });
  
  // Generate high-quality PDF
  await page.pdf({
    path: outputPath,
    format: 'Letter',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { 
      top: '0.25in', 
      right: '0.25in', 
      bottom: '0.25in', 
      left: '0.25in' 
    },
    scale: 0.98, // Slight scale to avoid clipping
  });
  
  await browser.close();
  
  const stats = fs.statSync(outputPath);
  console.log(`✓ Generated: ${outputPath} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
}

async function main() {
  const publicDir = path.join(__dirname, '..', 'public', 'downloads');
  
  // Ensure directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Generate main planner PDF
  await generatePDF(
    path.join(publicDir, 'ramadan-planner-2026.html'),
    path.join(publicDir, 'ramadan-planner-2026.pdf')
  );
  
  // Generate duas PDF
  await generatePDF(
    path.join(publicDir, '30-duas-complete.html'),
    path.join(publicDir, '30-duas-complete.pdf')
  );
  
  console.log('\n✅ All PDFs generated successfully!');
}

main().catch(console.error);
