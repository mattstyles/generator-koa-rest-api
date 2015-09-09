
import path from 'path'

import glob from 'glob'
import osenv from 'osenv'
import chalk from 'chalk'
import { Base } from 'yeoman-generator'
import yosay from 'yosay'



/**
 * generator-koa-static
 * @class
 * @extends Base <Yeoman-generator>
 */
export default class GeneratorKoaStatic extends Base {

    /**
     * @constructs
     */
    constructor( ...args ) {
        super( ...args )

        if ( process.env.DEBUG ) {
            this.destinationRoot( path.join( __dirname, '../debug' ) )
        }
    }

    /**
     * Package, info used in templates
     */
    pkg = require( '../package.json' )

    /**
     * Prompts for user config
     * @static
     */
    static prompts = [{
        name: 'projectName',
        message: 'What is the name of your project?',
        validate: str => {
            return !/\s/.test( str )
        }
    }, {
        name: 'projectDescription',
        message: 'What is the project description?'
    }, {
        name: 'authorName',
        message: 'What is the author name?',
        default: osenv.user(),
        store: true
    }, {
        name: 'userName',
        message: 'What is your github username?',
        default: osenv.user().toLowerCase().replace( /\s/g, '' ),
        store: true
    }, {
        type: 'list',
        name: 'license',
        message: 'What is the project license?',
        choices: [ 'WTFPL', 'ISC', 'MIT' ]
    }]

    /**
     * Initial greeting app state
     */
    hello() {
        this.log( yosay([
            chalk.cyan( 'Koa Static' ),
            'Basic koa static server'
        ].join( '\n' ) ))
    }

    /**
     * Prompting for user config app state
     */
    prompting() {
        let done = this.async()

        this.prompt( GeneratorKoaStatic.prompts, props => {
            this.props = props
            done()
        })
    }

    /**
     * Main scaffold app state
     */
    app() {
        let done = this.async()

        this.log( 'Copying templates' )

        glob( path.join( this.sourceRoot(), '**/*' ), {
            dot: true
        }, ( err, files ) => {
            if ( err ) {
                throw new Error( err )
            }

            files
                .map( file => {
                    return file.replace( this.sourceRoot(), '' )
                })
                .map( file => {
                    return file.replace( /^\//, '' )
                })
                .forEach( file => {
                    this.fs.copyTpl(
                        this.templatePath( file ),
                        this.destinationPath( file ),
                        this.props
                    )
                })

            done()
        })
    }

    /**
     * Install app state
     */
    install() {
        if ( this.options[ 'skip-install' ] ) {
            this.log( 'Skipping install' )
            return
        }

        this.installDependencies({
            bower: false
        })
    }

}


/*
init: function () {
    this.pkg = require( '../package.json' )

    this.on( 'end', function() {
        if ( !this.options[ 'skip-install' ] ) {
            this.installDependencies()
        }
    })
},
askFor: function () {
    var done = this.async()

    // Have Yeoman greet the user.
    if ( !this.options[ 'skip-install-message' ] ) {
        this.log( yosay(
            'Welcome to the Koa-Static generator!'
        ))
    }

    var prompts = [
        {
            type: 'input',
            name: 'projectName',
            message: 'What would you like to call this awesome project?',
            validate: function( str ) {
                return !/\s/.test( str )
            }
        },
        {
            type: 'input',
            name: 'ghUser',
            message: 'What is your Github username?'
        },
        {
            type: 'list',
            name: 'license',
            message: 'What is the project license?',
            choices: [ 'WTFPL', 'ISC', 'MIT' ]
        }
    ]

    this.prompt( prompts, function( props ) {
        Object.keys( props ).forEach( function( prop ) {
            this[ prop ] = props[ prop ]
        }.bind( this ))

        done()
    }.bind( this ) )
},

writing: {
    app: function () {
        this.template( '_package.json', 'package.json' )
        this.template( '_bower.json', 'bower.json' )
        this.src.copy( '.bowerrc', '.bowerrc' )
        this.template( '_README.md', 'README.md' )
        this.src.copy( 'index.js', 'index.js' )

        this.dest.mkdir( 'bin' )
        this.dest.mkdir( 'lib' )
        this.dest.mkdir( 'public' )

        this.src.copy( 'bin/start', 'bin/start' )
        this.src.copy( 'lib/tmpl/404.hjs', 'lib/tmpl/404.hjs' )
        this.src.copy( 'lib/util/views.js', 'lib/util/views.js' )
        this.src.copy( 'lib/server.js', 'lib/server.js' )
        this.template( 'public/_index.html', 'public/index.html' )

        // Add extra empty dirs
        this.dest.mkdir( 'lib/routes' )
        this.dest.mkdir( 'lib/middleware' )
        this.dest.mkdir( 'public/vendor' )
    }
}
*/
