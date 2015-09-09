
require( 'babel-core/register' )({
    stage: 2,
    optional: [
        'es7.classProperties'
    ],
    loose: [
        'es6.modules',
        'es6.classes'
    ],
    ignore: /generator-koa-api\/node_modules/
})

module.exports = require( './app' )
