

import client from '../../connect'

/**
 * Pings to check connection to the db
 */
export default function *status( next ) {
    try {
        yield client.ping()
    } catch ( err ) {
        this.status = 500
        this.body = {
            status: 500,
            body: err
        }
    }

    this.status = 200
    this.body = {
        status: 200,
        body: 'OK'
    }
}
