const path = require('path')
const cp = require('child_process')
const root = path.join(__dirname, '..')

const src1 = path.join(root, 'build-final/win-ia32-unpacked/resources')

const src2 = path.join(src1, 'app.asar')
const asarbin = path.join(root, 'node_modules/.bin/asar')

cp.exec(` ${asarbin} extract ${src2} ${src1} `)
