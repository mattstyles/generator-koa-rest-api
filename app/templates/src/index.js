
import connect from './connect'
import app from './server'
import pkg from '../package.json'

let port = process.env.PORT || process.env.npm_package_config_port || 14320

connect
    .on( 'ready', () => {
        app.listen( port )
        logger.debug( '%s app listening on port %s', pkg.name, port )
    })
    .on( 'error', err => {
        logger.error({
            field: 'connect',
            msg: 'Error connecting to db instance',
            err: err
        })
    })


export default app
