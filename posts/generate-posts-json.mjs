import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.resolve(__dirname);
const OUTPUT_FILE = path.join(POSTS_DIR, "posts.json");

async function generateManifest() {
  const files = await fs.readdir(POSTS_DIR);

  const mdFiles = files
    .filter(f => f.endsWith(".md"))
    .map(filename => {
      const datePart = filename.split("-").slice(0, 3).join("-");
      return { filename, date: new Date(datePart) };
    })
    .sort((a, b) => b.date - a.date) // newest to oldest
    .map(post => post.filename);     // only output filenames

  await fs.writeFile(OUTPUT_FILE, JSON.stringify(mdFiles, null, 2));
  console.log(`✅ Wrote ${mdFiles.length} posts to ${OUTPUT_FILE}`);
}

generateManifest().catch(err => {
  console.error("❌ Error generating posts.json", err);
  process.exit(1);
});

