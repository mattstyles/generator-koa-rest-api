/*global describe, beforeEach, it*/
'use strict'

var path = require('path')
var assert = require('yeoman-generator').assert
var helpers = require('yeoman-generator').test
var os = require('os')

describe( 'generator-koa-api:app', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../app'))
            .inDir(path.join(os.tmpdir(), './temp-test'))
            .withOptions({ 'skip-install': true })
            .withPrompts({
                projectName: 'test-project',
                projectDescription: 'test-description',
                authorName: 'test-author',
                userName: 'test-user',
                license: 'WTFPL'
            })
            .on('end', done)
    })

    it('creates files', function( done ) {
        assert.file([
            'package.json',
            'README.md',
            'index.js'
        ])
        done()
    })

    it( 'should add an author to the readme', function( done ) {
        assert.fileContent( 'package.json', /"author": "test-author"/ )
        done()
    })
})
