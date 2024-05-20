const cp = require('child_process')
const fs = require('fs')
const path = require('path')

cp.execSync(`yarn run prettier --write --config ./prettier.config.cjs "packages/**/*.{js,jsx,ts,tsx,css,scss}`, {
    windowsHide: true,
    cwd: path.resolve(__dirname, '..'),
})
