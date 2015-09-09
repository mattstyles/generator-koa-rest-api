import path from 'path'

import koa from 'koa'
import logger from 'koa-bunyan-logger'

/**
 * Main Koa Instance
 */
const app = koa()


/**
 * Apply middlewares
 */

app.use( logger() )
app.use( logger.requestIdContext() )
app.use( logger.requestLogger() )


// Export composable app
export default app
