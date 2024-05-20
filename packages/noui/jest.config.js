// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    verbose: true,
    transformIgnorePatterns: [
        //
        '<rootDir>/node_modules/(?!lodash-es)',
    ],
}

module.exports = config
