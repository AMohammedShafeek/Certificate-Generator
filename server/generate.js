const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const students = require('./data/students.json');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const templatePath = path.join(__dirname, 'template/certificate.html');
  const templateHTML = fs.readFileSync(templatePath, 'utf8');

  for (const student of students) {
    const html = templateHTML
      .replace('{{NAME}}', student.name)
      .replace('{{CATEGORY}}', student.category)
      .replace('{{POSITION}}', student.position)
      .replace('{{DATE}}', student.date);

    await page.setContent(html, { waitUntil: 'networkidle0' });

    const fileName = student.name.replace(/\s+/g, '_') + '.pdf';

    await page.pdf({
      path: path.join(__dirname, 'output/certificates', fileName),
      printBackground: true,
      landscape: true,
      width: '3579px',
      height: '2551px',
    });
  }

  await browser.close();
  console.log('✅ Certificates generated');
})();
