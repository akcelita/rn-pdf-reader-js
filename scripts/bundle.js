#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const bundlePath = path.join(__dirname, '../react-pdf/dist/bundle.js')
const viewerPath = path.join(__dirname, '../react-pdf/dist/index.html')
const destinationPath = path.join(__dirname, '../src/viewer.ts')

const encoding = { encoding: 'utf8' }
const read = (path) => fs.readFileSync(path, encoding)

const bundleString = read(bundlePath)
const viewerString = read(viewerPath)

const viewerFileContent = `export const bundle = \`${bundleString}\`, viewer = \`${viewerString}\`;`

if (fs.existsSync(destinationPath)) {
  fs.unlinkSync(destinationPath)
}
fs.writeFileSync(destinationPath, viewerFileContent, encoding)