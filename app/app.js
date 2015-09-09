
import path from 'path'

import glob from 'glob'
import osenv from 'osenv'
import chalk from 'chalk'
import { Base } from 'yeoman-generator'
import yosay from 'yosay'



/**
 * generator-koa-api
 * @class
 * @extends Base <Yeoman-generator>
 */
export default class GeneratorKoaApi extends Base {

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
    }, {
        name: 'cors',
        type: 'confirm',
        message: 'Do you want to enable CORS?',
        default: true,
        store: true
    }]

    /**
     * Initial greeting app state
     */
    hello() {
        this.log( yosay([
            chalk.cyan( 'Koa RESTful Api' ),
            'Basic koa restful api server'
        ].join( '\n' ) ))
    }

    /**
     * Prompting for user config app state
     */
    prompting() {
        let done = this.async()

        this.prompt( GeneratorKoaApi.prompts, props => {
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
