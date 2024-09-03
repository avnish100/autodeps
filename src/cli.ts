#!/usr/bin/env node
import { ImportManager } from './index';

function main() {
  console.log('Starting NPM Import Manager...');
  const importManager = new ImportManager();
  importManager.run();
}

main();