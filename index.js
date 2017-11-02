// morpheus-eastern segmenter

// const util = require('util')
// var debug = (process.env.debug == 'true') ? true : false;
const _ = require('lodash')

// CR U+000D; LF U+000A

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

// a = '吃药病才会好。 some words 你得按时吃药 Nǐ děi ànshí'
// a.split(/([\u4E00-\u9FFF\u3002]+)/)

let coderanges = {
  // 'zh': '([\u4E00-\u9FFF\u3002]+)'
  'zh': '([\u4E00-\u9FFF]+)'
}

function pars (str) {
  str = str.trim().replace(/\r?\n+/, '\n')
  return str.split('\n')
}

function zh (str) {
  let re = new RegExp(coderanges['zh'])
  if (!re.test(str)) return
  let ps = pars(str)
  return ps.map((p) => {
    let arr = p.split(re)
    let cls = arr.map((cl, idx) => {
      // if (!cl) return
      let type = (re.test(cl)) ? 'cl' : 'sp'
      return {text: cl, type: type, idx: idx}
    })
    return _.compact(cls)
  })
}

module.exports = zh

// function log () { console.log.apply(console, arguments) }
