import path from 'path'

import koa from 'koa'
import logger from 'koa-logger'
import serve from 'koa-static'
import route from 'koa-route'

import render from './util/views'

/**
 * Main Koa Instance
 */
const app = koa()


/**
 * Apply middlewares
 */

// Log it
app.use( logger() )


// Custom 404
app.use( function *( next ) {
    yield next

    if ( this.body || !this.idempotent ) {
        return
    }

    this.status = 404
    this.body = yield render( '404' )
})


// Just serve it up
app.use( serve( path.join( __dirname, '../public' ) ) )


// Export composable app
export default app
