"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ = require('lodash');

var log = console.log;

var debug = require('debug')('app');

var d = debug; // https://iso639-3.sil.org/code_tables/639/data --> three letter codes
// punctuation \u002E\u002C\u0021\u003A\u003B\u00B7 - \u0020\u0027 - ... middle dot, - space, apostrophe
// U+1FBD - greek coronis: ᾽
// parens ()[]{-/
// \u0028\u0029\u005B\u005D\u007B\u007D\u002D\u002F
// greek 0370-03FF 1F00–1FFF
// diactitic 0300-036F
// tibetan shad - ། U+0F0D : TIBETAN MARK SHAD {shey} // punctuation
// common punctuation in this version of sband

var puncts = "([.,!:;\xB7\u0F0D])"; // san - sansktit

var coderanges = {
  'zho': "([\u4E00-\u9FFF]+)",
  'tib': "([\u0F00-\u0FFF]+)",
  'grc': "([\u0370-\u03FF\u1F00-\u1FFF\u0300-\u036F\u1FBD']+)" // note: grc not includes space - \u0020, but includes apostrophe \u0027

};
var spaces = [" "];

var _default = function _default(str, code) {
  if (!coderanges[code]) return;
  str = str.replace(/ +/g, ' ').trim();
  var re = new RegExp(coderanges[code]);
  if (!re.test(str)) return;
  var rep = new RegExp(puncts);
  var rows = str.replace(/\r?\n+/, '\n').split('\n');
  var spars = [];
  rows.forEach(function (row) {
    var spns = [];
    var rclauses = row.split(rep);
    rclauses.forEach(function (rclause) {
      rclause = rclause.trim();

      if (rep.test(rclause)) {
        var spn = {
          text: rclause,
          punct: true
        };
        spns.push(spn);
      } else {
        var clauses = rclause.split(re);
        clauses.forEach(function (clause) {
          // clause = clause.trim()
          if (!clause) return;
          var lang = re.test(clause) ? true : false;
          var span = {
            text: clause
          };
          if (clause == ' ') span.space = true;else if (lang) span.lang = true;else span.other = true;
          spns.push(span);
        });
      }
    });
    spars.push(spns);
  });
  return spars.filter(function (sub) {
    return sub.length;
  });
};
/*
  χαλκὸν

*/


exports.default = _default;