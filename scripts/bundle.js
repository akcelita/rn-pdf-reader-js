#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const bundlePath = path.join(__dirname, '../react-pdf/dist/bundle.js')
const viewerPath = path.join(__dirname, '../react-pdf/dist/index.html')
const destinationPath = path.join(__dirname, '../src/viewer.js')

const encoding = { encoding: 'utf8' }
const read = (path) => fs.readFileSync(path, encoding)

const bundle = read(bundlePath)
const viewerHtmlTemplate = read(viewerPath)

const viewerHtml = (base64, customStyle, withScroll = false, withPinchZoom = false, maximumPinchZoomScale = 5) => {
  return viewerHtmlTemplate
    .replace('@{maximum_scale}', String(maximumPinchZoomScale))
    .replace('@{user_scalable}', withPinchZoom ? 'yes' : 'no')
    .replace('@{custom_style}', JSON.stringify(
      customStyle ?? {},
    ))
    .replace('@{with_scroll}', JSON.stringify(withScroll))
    .replace('@{base64}', base64)
  ;
};


const viewerFileContent = `
export const viewerHtmlTemplate = \`${viewerHtmlTemplate}\`;
export const getViewerHtml = ${viewerHtml.toString()};
export const getBundle = () => \`${bundle}\`;
`

if (fs.existsSync(destinationPath)) {
  fs.unlinkSync(destinationPath)
}
fs.writeFileSync(destinationPath, viewerFileContent, encoding)