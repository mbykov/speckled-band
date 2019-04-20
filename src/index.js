let _ = require('lodash')
let log = console.log
let debug = require('debug')('app')
let d = debug

// https://iso639-3.sil.org/code_tables/639/data --> three letter codes

// punctuation \u002E\u002C\u0021\u003A\u003B\u00B7 - \u0020\u0027 - ... middle dot, - space, apostrophe
// U+1FBD - greek coronis: ᾽
// parens ()[]{-/
// \u0028\u0029\u005B\u005D\u007B\u007D\u002D\u002F
// greek 0370-03FF 1F00–1FFF
// diactitic 0300-036F
// tibetan shad - ། U+0F0D : TIBETAN MARK SHAD {shey} // punctuation
// right single quotation mark - ' - \u2019
// left single quotation mark - ' - \u2018
// general punctuations \u2000-\u206F

// common punctuation in this version of sband
let puncts = '([\u002E\u002C\u0021\u003A\u003B\u00B7\u0F0D\u2000-\u206F])'

// san - sansktit
let coderanges = {
  'zho': '([\u4E00-\u9FFF]+)',
  'tib': '([\u0F00-\u0FFF]+)',
  'grc': '([\u0370-\u03FF\u1F00-\u1FFF\u0300-\u036F\u1fbd]+)'
  // note: grc not includes space - \u0020,  apostrophe \u0027, right.quot.mark \u2019, but includes coronis \u1fbd
}

let spaces = ['\u0020']

export default (str, code) => {
  if (!coderanges[code]) return
  str = str.replace(/ +/g, ' ').trim()
  let re = new RegExp(coderanges[code])
  if (!re.test(str)) return
  let rep = new RegExp(puncts)
  let rows = str.replace(/\r?\n+/, '\n').split('\n')
  let spars = []
  rows.forEach(row => {
    let spns = []
    let rclauses = row.split(rep)
    rclauses.forEach(rclause => {
      rclause = rclause.trim()
      if (rep.test(rclause)) {
        let spn = {text: rclause, punct: true}
        spns.push(spn)
      } else {
        let clauses = rclause.split(re)
        clauses.forEach(clause => {
          // clause = clause.trim()
          if (!clause) return
          let lang = (re.test(clause)) ? true : false
          let span = {text: clause}
          if (clause == ' ') span.space = true
          else if (lang) span.lang = true
          else span.other = true
          spns.push(span)
        })
      }
    })
    spars.push(spns)
  })
  return spars.filter(function(sub) { return sub.length;  })
}

/*
  χαλκὸν

*/
