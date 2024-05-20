const cp = require('child_process')
const fs = require('fs')
const path = require('path')
const os = require('os')

husk()
// envs()

function husk() {
    cp.execSync(`husky install`)

    setTimeout(() => {
        const src = path.join(__dirname, '../.husky/pre-commit')
        if (!fs.existsSync(src)) {
            cp.execSync(` npx husky add .husky/pre-commit "npx lint-staged" `)
        }
    }, 1000)
}
