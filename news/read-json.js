import fs from "fs/promises";

async function readKeywords() {
  try {
    const data = await fs.readFile("input.json", "utf8");
    const json = JSON.parse(data);
    console.log("Keywords:", json.keywords);
    return json.keywords;
  } catch (error) {
    console.error("Error reading keywords:", error);
    return [];
  }
}

await readKeywords();
