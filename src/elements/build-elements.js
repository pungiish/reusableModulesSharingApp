const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
  const files = [
    'src/elements/runtime.js',
    'src/elements/polyfills.js',
    'src/elements/scripts.js',
    'src/elements/main.js',
    // 'src/elements/styles.js',
    // 'src/elements/vendor.js'

  ]
  await fs.ensureDir('elements')
  await concat(files, './src/elements.js');
  // await fs.copyFile('./dist/styles.js', 'elements/styles.js')
  // await fs.copyFile('./dist/index.html', 'elements/index.html')

})()
