import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Always resolve relative to project root
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.resolve(__dirname);
const OUTPUT_FILE = path.join(POSTS_DIR, "posts.json");

async function generateManifest() {
  const files = await fs.readdir(POSTS_DIR);
  const mdFiles = files
    .filter(f => f.endsWith(".md"))
    .sort()
    .reverse();
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(mdFiles, null, 2));
  console.log(`✅ Wrote ${mdFiles.length} posts to ${OUTPUT_FILE}`);
}

generateManifest().catch(err => {
  console.error("❌ Error generating posts.json", err);
  process.exit(1);
});

