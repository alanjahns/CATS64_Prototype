import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const projectRoot = path.resolve(import.meta.dirname, "..");
const htmlPath = path.join(projectRoot, "index.html");
const spriteAssetsPath = path.join(projectRoot, "sprite_assets.js");

function runNodeCheck(filePath) {
  const result = spawnSync("node", ["--check", filePath], {
    cwd: projectRoot,
    encoding: "utf8"
  });

  if (result.status !== 0) {
    process.stderr.write(result.stderr || result.stdout || `Syntax check failed for ${filePath}\n`);
    process.exit(result.status ?? 1);
  }
}

function extractInlineScript(htmlSource) {
  const matches = [...htmlSource.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  const inline = matches.at(-1)?.[1];
  if (!inline) {
    throw new Error("Could not find inline game script in index.html");
  }
  return inline.trim();
}

const htmlSource = fs.readFileSync(htmlPath, "utf8");
const inlineScript = extractInlineScript(htmlSource);
const tempPath = path.join(os.tmpdir(), "cats64-inline-check.mjs");

fs.writeFileSync(tempPath, `${inlineScript}\n`, "utf8");

runNodeCheck(spriteAssetsPath);
runNodeCheck(tempPath);

console.log("Syntax check passed for sprite_assets.js and inline game script.");
