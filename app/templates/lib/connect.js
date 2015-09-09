
/**
 * Simple wrapper to instantiate level-connect client
 */

import Client from 'level-connect-client'
import pkg from '../package.json'

const client = new Client({
    name: pkg.name,
    connectURL: process.env.CONNECT_URL
})

export default client
