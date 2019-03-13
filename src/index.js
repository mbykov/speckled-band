let _ = require('lodash')
let log = console.log
let debug = require('debug')('app')
let d = debug

// https://iso639-3.sil.org/code_tables/639/data --> three letter codes

// punctuation \u002E\u002C\u0021\u003A\u003B\u00B7 - \u0020\u0027 - ... middle dot, - space, apostrophe
// parens ()[]{-/
// \u0028\u0029\u005B\u005D\u007B\u007D\u002D\u002F
// greek 0370-03FF 1F00–1FFF
// diactitic 0300-036F
// tibetan shad - ། U+0F0D : TIBETAN MARK SHAD {shey} // punctuation

// common punctuation in this version of sband
let puncts = '([\u002E\u002C\u0021\u003A\u003B\u00B7\u0F0D])'

// san - sansktit
let coderanges = {
  'zho': '([\u4E00-\u9FFF]+)',
  'tib': '([\u0F00-\u0FFF]+)',
  'grc': '([\u0370-\u03FF\u1F00-\u1FFF\u0300-\u036F\u0027\u0020]+)' // note: grc includes space - \u0020
}

export default (str, code) => {
  let re = new RegExp(coderanges[code])
  if (!re.test(str)) return
  let clean = str.trim().replace(/᾽/g, "\'")
  let wopunct = clean.split("'").join('')
  if (!re.test(wopunct)) return
  let rep = new RegExp(puncts)
  let rows = clean.replace(/\r?\n+/, '\n').split('\n')
  let rclauses = rows.map(row => { return row.split(rep) })
  let spans = []
  rows.forEach(row => {
    let spns = []
    let rclauses = row.split(rep)
    rclauses.forEach(rclause => {
      if (rep.test(rclause)) {
        let spn = {text: rclause, punct: true}
        spns.push(spn)
      } else {
        let clauses = rclause.split(re)
        clauses = _.compact(clauses)
        clauses.forEach(clause => {
          clause = clause.trim()
          if (!clause) return
          let lang = (re.test(clause)) ? true : false
          let span = {text: clause}
          if (lang) span.lang = code
          // span[code] = true
          // if (lang) { }
          spns.push(span)
        })
      }
    })
    spans.push(spns)
  })
  return spans
}
