
import path from 'path'
import views from 'co-views'

export default views( path.join( __dirname, '../tmpl' ), {
    map: {
        hjs: 'hogan'
    },
    ext: 'hjs'
})
