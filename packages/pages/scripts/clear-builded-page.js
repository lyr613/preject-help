const path = require('path')
const fs = require('fs-extra')

const s = path.join(__dirname, '..', '..', 'electron-main', 'build-page')
fs.emptyDirSync(s)
