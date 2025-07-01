#!/usr/bin/env node

const fs = require('fs/promises');
const path = require('path');
const glob = require('glob');

const LOCALES = [
  { lang: 'en', file: path.join(__dirname, '../public/locales/en/common.json') },
  { lang: 'ar', file: path.join(__dirname, '../public/locales/ar/common.json') },
];
const SRC_DIRS = [
  path.join(__dirname, '../components'),
  path.join(__dirname, '../pages'),
];

function flatten(obj, prefix = '') {
  return Object.keys(obj).reduce((acc, k) => {
    const pre = prefix ? prefix + '.' : '';
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      Object.assign(acc, flatten(obj[k], pre + k));
    } else {
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {});
}

function unflatten(data) {
  const result = {};
  for (const flatKey in data) {
    const keys = flatKey.split('.');
    keys.reduce((acc, k, i) => {
      if (i === keys.length - 1) {
        acc[k] = data[flatKey];
      } else {
        if (!acc[k]) acc[k] = {};
      }
      return acc[k];
    }, result);
  }
  return result;
}

function extractKeysFromContent(content) {
  // Matches t('key') or debugT('key') or t("key")
  const regex = /\b(?:t|debugT)\(['"]([a-zA-Z0-9_.]+)['"]/g;
  const keys = new Set();
  let match;
  while ((match = regex.exec(content))) {
    keys.add(match[1]);
  }
  return keys;
}

async function getAllUsedKeys() {
  const files = SRC_DIRS.flatMap(dir => glob.sync(`${dir}/**/*.js`));
  const allKeys = new Set();
  for (const file of files) {
    const content = await fs.readFile(file, 'utf8');
    extractKeysFromContent(content).forEach(k => allKeys.add(k));
  }
  return allKeys;
}

async function syncLocaleFile(localeFile, usedKeys) {
  const raw = await fs.readFile(localeFile, 'utf8');
  let json;
  try {
    json = JSON.parse(raw);
  } catch (e) {
    console.error(`Error parsing ${localeFile}`);
    throw e;
  }
  const flat = flatten(json);
  let changed = false;
  // Add missing keys
  for (const key of usedKeys) {
    if (!(key in flat)) {
      flat[key] = key;
      changed = true;
    }
  }
  // Remove unused keys
  for (const key of Object.keys(flat)) {
    if (!usedKeys.has(key)) {
      delete flat[key];
      changed = true;
    }
  }
  // Remove duplicates (Set ensures this)
  // Write back if changed
  if (changed) {
    const pretty = JSON.stringify(unflatten(flat), null, 2);
    await fs.writeFile(localeFile, pretty, 'utf8');
  }
  return changed;
}

(async () => {
  const usedKeys = await getAllUsedKeys();
  let summary = [];
  for (const { lang, file } of LOCALES) {
    const changed = await syncLocaleFile(file, usedKeys);
    summary.push(`${lang}: ${changed ? 'updated' : 'no changes'}`);
  }
  console.log('i18n-sync complete. Summary:', summary.join(', '));
})(); 