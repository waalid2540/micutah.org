const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF(inputPath, outputPath) {
  console.log(`Generating PDF: ${outputPath}`);
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Load the HTML file
  const htmlPath = `file://${inputPath}`;
  await page.goto(htmlPath, { waitUntil: 'networkidle0' });
  
  // Hide the print button for PDF
  await page.evaluate(() => {
    const btn = document.querySelector('.print-btn');
    if (btn) btn.style.display = 'none';
    const noPrint = document.querySelectorAll('.no-print');
    noPrint.forEach(el => el.style.display = 'none');
  });
  
  // Generate PDF
  await page.pdf({
    path: outputPath,
    format: 'Letter',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' }
  });
  
  await browser.close();
  console.log(`✓ Generated: ${outputPath}`);
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
