import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.resolve(__dirname);
const OUTPUT_FILE = path.join(POSTS_DIR, "posts.json");

async function generateManifest() {
  const files = await fs.readdir(POSTS_DIR);

  const validMdFiles = files
    .filter(f => f.endsWith(".md"))
    .map(filename => {
      const datePart = filename.split("-").slice(0, 3).join("-");
      const timestamp = Date.parse(datePart);
      return {
        filename,
        timestamp: isNaN(timestamp) ? 0 : timestamp // fallback for invalid date
      };
    })
    .sort((a, b) => b.timestamp - a.timestamp)
    .map(post => post.filename);

  await fs.writeFile(OUTPUT_FILE, JSON.stringify(validMdFiles, null, 2));
  console.log(`✅ Wrote ${validMdFiles.length} posts to ${OUTPUT_FILE}`);
}

generateManifest().catch(err => {
  console.error("❌ Error generating posts.json", err);
  process.exit(1);
});

