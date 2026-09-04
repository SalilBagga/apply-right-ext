import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { generateCoverLetterPDF } from "../index";
import { mockCoverLetterInput } from "./mock-data";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "output");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "sample-cover-letter.pdf");

async function main() {
  console.log("Generating cover letter PDF from mock data...");
  const buffer = await generateCoverLetterPDF(mockCoverLetterInput);

  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, buffer);

  console.log(`Wrote ${buffer.length} bytes to ${OUTPUT_FILE}`);
}

main().catch((error) => {
  console.error("Cover letter PDF generation failed:");
  console.error(error);
  process.exitCode = 1;
});
