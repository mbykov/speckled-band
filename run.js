/*
  imitate call from morpheus-eastern
  runner: node run.js chinese test; ex: node run.js 第三十各地区
*/

const path = require('path')
const util = require('util')
var _ = require('lodash');

var test = process.argv.slice(2)[0] || false;

var spband = require('./index');

if (!test) log('?');

console.time('_segmenter');

let code = 'zh'

spband(code, test, function(err, res) {
    log('BAND: ==============>>');
    console.log(util.inspect(res, {showHidden: false, depth: 3}))
    // console.log(util.inspect(res[0].segs[3], {showHidden: false, depth: 3}))
    console.timeEnd('_segmenter');
});

function log() { console.log.apply(console, arguments); }

function p(o) {
    console.log(util.inspect(o, false, null))
}
