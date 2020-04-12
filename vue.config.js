const path = require('path')

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                A: path.resolve('./src/assets'),
                P: path.resolve('./src/pages'),
                '@': path.resolve('./src/pages/article')
            }
        }
    }
}
