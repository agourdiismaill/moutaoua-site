#!/usr/bin/env node
/**
 * Audit réseau théorique homepage carousel Millennia (point 1).
 * Compare poids des assets susceptibles d'être chargés au first paint / section visible.
 */
import { readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const postersWebp = join(root, "public/realisations/millennia/posters");
const postersPng = join(root, "public/realisations/millennia");
const videos = join(root, "public/videos/millennia");

function sumFiles(dir, filter) {
  if (!existsSync(dir)) return { bytes: 0, files: [] };
  const files = readdirSync(dir).filter(filter);
  const listed = files.map((f) => {
    const p = join(dir, f);
    return { name: f, bytes: statSync(p).size };
  });
  return {
    bytes: listed.reduce((s, f) => s + f.bytes, 0),
    files: listed.sort((a, b) => b.bytes - a.bytes),
  };
}

const pngAll = sumFiles(postersPng, (f) => f.endsWith(".png") && f.startsWith("millennia-"));
const webpAll = sumFiles(postersWebp, (f) => f.endsWith(".webp"));
const mp4All = sumFiles(videos, (f) => f.endsWith(".mp4"));

// BEFORE: 61 <video poster=png> in DOM → browsers fetch unique posters (~19 PNG)
//         + risk of IO attaching src on scroll for ~4 visible videos
const beforePosters = pngAll.bytes;
const beforeRiskVideos = mp4All.files.slice(0, 4).reduce((s, f) => s + f.bytes, 0); // old avg was huge
// Approximate old top-4 by using current files is wrong — use recorded before sizes:
const BEFORE_VIDEO_TOTAL = 363.8 * 1024 * 1024;
const BEFORE_POSTERS = 2.86 * 1024 * 1024;
const BEFORE_SCROLL_RISK_AVG = (BEFORE_VIDEO_TOTAL / 61) * 4; // ~4 videos if IO fired

// AFTER: only ~8 WebP Image lazy (unique among first 8 cards)
const WINDOW = 8;
const afterPosterFiles = [];
for (let i = 0; i < WINDOW; i++) {
  const posterN = String((i % 19) + 1).padStart(2, "0");
  const name = `millennia-${posterN}.webp`;
  if (!afterPosterFiles.find((f) => f.name === name)) {
    const hit = webpAll.files.find((f) => f.name === name);
    if (hit) afterPosterFiles.push(hit);
  }
}
const afterPosters = afterPosterFiles.reduce((s, f) => s + f.bytes, 0);
const afterMp4OnLoad = 0; // play-on-click only

function mb(n) {
  return (n / 1024 / 1024).toFixed(2) + " MB";
}
function kb(n) {
  return Math.round(n / 1024) + " KB";
}

console.log("=== AUDIT PAYLOAD CAROUSEL MILLENNIA (homepage) ===\n");
console.log("AVANT (correctif précédent insuffisant):");
console.log(`  Posters PNG (19 uniques, tous référencés par 61 <video poster>): ${mb(BEFORE_POSTERS)}`);
console.log(`  Risque IO scroll (~4 MP4 × moyenne ${(BEFORE_VIDEO_TOTAL / 61 / 1024 / 1024).toFixed(1)} Mo): ${mb(BEFORE_SCROLL_RISK_AVG)}`);
console.log(`  TOTAL estimé section visible: ${mb(BEFORE_POSTERS + BEFORE_SCROLL_RISK_AVG)}`);
console.log(`  Stockage disque MP4: ${mb(BEFORE_VIDEO_TOTAL)}`);
console.log(`  video-09: 72.3 MB`);

console.log("\nAPRÈS (point 1):");
console.log(`  Posters WebP uniques pour fenêtre de ${WINDOW} cartes: ${kb(afterPosters)} (${afterPosterFiles.length} fichiers)`);
console.log(`  MP4 au chargement (play-on-click): ${afterMp4OnLoad} B`);
console.log(`  TOTAL estimé section visible (sans clic): ${kb(afterPosters)}`);
console.log(`  Stockage disque MP4: ${mb(mp4All.bytes)}`);
console.log(`  video-09: ${kb(mp4All.files.find((f) => f.name === "video-09.mp4")?.bytes ?? 0)}`);
console.log(`  DOM cartes vidéo montées: ${WINDOW} (virtualisé) vs 61 avant`);

const beforeTotal = BEFORE_POSTERS + BEFORE_SCROLL_RISK_AVG;
const afterTotal = afterPosters;
const reduction = (1 - afterTotal / beforeTotal) * 100;

console.log("\n=== RÉSUMÉ ===");
console.log(`  Payload section carousel: ${mb(beforeTotal)} → ${kb(afterTotal)} (−${reduction.toFixed(1)}%)`);
console.log(`  Disque vidéos: ${mb(BEFORE_VIDEO_TOTAL)} → ${mb(mp4All.bytes)}`);
console.log("\nFichiers WebP posters (tous):");
for (const f of webpAll.files) {
  console.log(`  ${f.name}: ${kb(f.bytes)}`);
}
