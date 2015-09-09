
import connect from './lib/connect'
import app from './lib/server'
import pkg from './package.json'

let port = process.env.PORT || process.env.npm_package_config_port || 14320

connect
    .on( 'ready', () => {
        app.listen( port )
        console.log( '[', pkg.name, ']', 'listening on', port )
    })
    .on( 'error', err => {
        console.error( 'Error connecting to level-connect db instance' )
        console.error( err )
    })
