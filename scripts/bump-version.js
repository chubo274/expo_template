#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const VERSION = "1.25.0";
const BUILD_NUMBER = 29;

const ROOT = path.resolve(__dirname, "..");

const version = process.argv[2] || VERSION;
const build = String(process.argv[3] || BUILD_NUMBER);

if (!/^\d+\.\d+\.\d+/.test(version)) {
  console.error(`Invalid version: "${version}" (expected e.g. 1.25.0)`);
  process.exit(1);
}
if (!/^\d+$/.test(build)) {
  console.error(`Invalid build number: "${build}" (expected an integer)`);
  process.exit(1);
}

const replace = (file, pattern, replacement, label) => {
  const fullPath = path.join(ROOT, file);
  const before = fs.readFileSync(fullPath, "utf8");
  const matches = before.match(pattern);
  if (!matches) {
    console.error(`  ✗ ${file} -> ${label} not found`);
    process.exit(1);
  }
  fs.writeFileSync(fullPath, before.replace(pattern, replacement));
  console.log(`  ✓ ${file} -> ${label}`);
};

console.log(`Bumping to version ${version} (build ${build})\n`);

const appJsonPath = path.join(ROOT, "app.json");
const appJsonRaw = fs.readFileSync(appJsonPath, "utf8");
const appJson = JSON.parse(appJsonRaw);
appJson.expo.version = version;
appJson.expo.ios.buildNumber = build;
appJson.expo.android.versionCode = Number(build);
fs.writeFileSync(
  appJsonPath,
  JSON.stringify(appJson, null, 2) + (appJsonRaw.endsWith("\n") ? "\n" : "")
);
console.log("  ✓ app.json -> version, ios.buildNumber, android.versionCode");

replace(
  "android/app/build.gradle",
  /versionCode\s+\d+/,
  `versionCode ${build}`,
  "versionCode"
);
replace(
  "android/app/build.gradle",
  /versionName\s+"[^"]*"/,
  `versionName "${version}"`,
  "versionName"
);

replace(
  "ios/WidgetLibrary.xcodeproj/project.pbxproj",
  /CURRENT_PROJECT_VERSION = \d+;/g,
  `CURRENT_PROJECT_VERSION = ${build};`,
  "CURRENT_PROJECT_VERSION (x2)"
);
replace(
  "ios/WidgetLibrary.xcodeproj/project.pbxproj",
  /MARKETING_VERSION\s*=\s*[^;]+;/g,
  `MARKETING_VERSION = ${version};`,
  "MARKETING_VERSION (x2)"
);

replace(
  "ios/WidgetLibrary/Info.plist",
  /(<key>CFBundleShortVersionString<\/key>\s*<string>)[^<]*(<\/string>)/,
  `$1${version}$2`,
  "CFBundleShortVersionString"
);
replace(
  "ios/WidgetLibrary/Info.plist",
  /(<key>CFBundleVersion<\/key>\s*<string>)[^<]*(<\/string>)/,
  `$1${build}$2`,
  "CFBundleVersion"
);

console.log("\nDone.");
