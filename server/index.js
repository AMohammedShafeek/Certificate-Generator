const express = require("express");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const archiver = require("archiver");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.post("/generate-certificates", async (req, res) => {
  const generationId = `generation_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  const generationOutputDir = path.join(__dirname, "output", generationId);
  const tempHtmlPath = path.join(
    __dirname,
    "template",
    `temp_${generationId}.html`,
  );
  const zipPath = path.join(__dirname, "output", `${generationId}.zip`);

  try {
    const students = req.body.students;
    if (!students?.length) {
      return res
        .status(400)
        .json({ error: true, success: false, message: "No students provided" });
    }

    fs.mkdirSync(generationOutputDir, { recursive: true });

    const templatePath = path.join(__dirname, "template", "certificate.html");
    const template = fs.readFileSync(templatePath, "utf8");

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    for (const s of students) {
      const html = template
        .replace(/{{NAME}}/g, s.name)
        .replace(/{{CATEGORY}}/g, s.category)
        .replace(/{{POSITION}}/g, s.position);

      fs.writeFileSync(tempHtmlPath, html);

      await page.goto("file://" + tempHtmlPath, { waitUntil: "load" });

      const safeName = s.name.replace(/[^\w]/g, "_");

      await page.pdf({
        path: path.join(generationOutputDir, `${safeName}.pdf`),
        printBackground: true,
        preferCSSPageSize: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
      });
    }

    await browser.close();

    // ZIP generation folder
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip");

    archive.pipe(output);
    archive.directory(generationOutputDir, false);
    await archive.finalize();

    output.on("close", () => {
      res.download(zipPath, `${generationId}.zip`, () => {
        fs.rmSync(generationOutputDir, { recursive: true, force: true });
        fs.unlinkSync(tempHtmlPath);
        fs.unlinkSync(zipPath);
      });
    });
  } catch (err) {
    console.error("failed:", generationId, err);

    if (fs.existsSync(generationOutputDir))
      fs.rmSync(generationOutputDir, { recursive: true, force: true });
    if (fs.existsSync(tempHtmlPath)) fs.unlinkSync(tempHtmlPath);
    if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);

    res.status(500).json({ message: "PDF generation failed" });
  }
});

app.listen(5000, () => console.log("server running on port 5000"));
