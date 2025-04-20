import fs from "fs/promises";
import path from "path";

const POSTS_DIR = "./posts";
const OUTPUT_FILE = path.join(POSTS_DIR, "posts.json");

async function generateManifest() {
  const files = await fs.readdir(POSTS_DIR);
  const mdFiles = files
    .filter(f => f.endsWith(".md"))
    .sort()
    .reverse(); // newest first
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(mdFiles, null, 2));
  console.log(`✅ Wrote ${mdFiles.length} posts to ${OUTPUT_FILE}`);
}

generateManifest().catch(err => {
  console.error("❌ Error generating posts.json", err);
  process.exit(1);
});

