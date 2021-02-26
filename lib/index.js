if (typeof window === 'undefined') {
    // Export as a Node.js module
    module.exports = require('./junk.cjs.js')
} else {
    // Export as a Browser module
    module.exports = require('./junk.umd.js')
}