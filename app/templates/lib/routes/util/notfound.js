
/**
 * Super basic 404
 */
export default function *notfound( next ) {
    yield next

    if ( this.body || !this.idempotent ) {
        return
    }

    this.status = 404
    this.body = {
        status: 'notfound'
    }
}
