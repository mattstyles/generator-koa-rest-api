
import Router from 'koa-router'

let router = new Router()

router.get( '/status', require( './util/status' ) )

export default router
