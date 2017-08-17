// morpheus-eastern segmenter

const path = require('path')
const util = require('util')
var debug = (process.env.debug == 'true') ? true : false;

module.exports = spband;

// https://stackoverflow.com/questions/1366068/whats-the-complete-range-for-chinese-characters-in-unicode
// ck                                   Range       Comment
// CJK Unified Ideographs                  4E00-9FFF   Common
// CJK Unified Ideographs Extension A      3400-4DBF   Rare
// CJK Unified Ideographs Extension B      20000-2A6DF Rare, historic // test 'a' = true ??? wtf ???
// CJK Unified Ideographs Extension C      2A700–2B73F Rare, historic
// CJK Unified Ideographs Extension D      2B740–2B81F Uncommon, some in current use
// CJK Unified Ideographs Extension E      2B820–2CEAF Rare, historic
// CJK Compatibility Ideographs            F900-FAFF   Duplicates, unifiable variants, corporate characters
// CJK Compatibility Ideographs Supplement 2F800-2FA1F Unifiable variants

let coderange = {
    'zh': ['4E00-9FFF']
}

function spband (code, str, cb) {
    let ranges = coderange[code]
    let rstr = ranges.map(r => { return r.split('-').map(r => { return ['\\u', r].join('')}).join('-') }).join('')
    rstr = ['[', rstr, ']'].join('')
    let re = new RegExp(rstr)
    let mess = parseClause(re, str)
    cb(null, mess)
}

function parseClause(re, str) {
    let clauses = []
    let syms = str.split('')
    let clause, space
    syms.forEach(sym => {
        if (re.test(sym)) {
            if (!clause) clause = []
            clause.push(sym)
            if (space) {
                let str = space.join('')
                clauses.push({sp:str})
                space = null
            }
        } else {
            if (!space) space = []
            space.push(sym)
            if (clause) {
                let str = clause.join('')
                clauses.push({cl: str})
                clause = null
            }
        }
    })
    if (clause) {
        let str = clause.join('')
        clauses.push({cl: str})
    }
    if (space) {
        let str = space.join('')
        clauses.push({sp: str})
    }
    return clauses
}

function log() { console.log.apply(console, arguments); }

function p(o) {
    console.log(util.inspect(o, false, null))
}
