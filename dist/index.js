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
  'grc': "([\u0370-\u03FF\u1F00-\u1FFF\u0300-\u036F' ]+)" // note: grc includes space - \u0020

};

var _default = function _default(str, code) {
  var re = new RegExp(coderanges[code]);
  if (!re.test(str)) return;
  var clean = str.trim().replace(/᾽/g, "\'");
  var wopunct = clean.split("'").join('');
  if (!re.test(wopunct)) return;
  var rep = new RegExp(puncts);
  var rows = clean.replace(/\r?\n+/, '\n').split('\n');
  var rclauses = rows.map(function (row) {
    return row.split(rep);
  });
  var spans = [];
  rows.forEach(function (row) {
    var spns = [];
    var rclauses = row.split(rep);
    rclauses.forEach(function (rclause) {
      if (rep.test(rclause)) {
        var spn = {
          text: rclause,
          punct: true
        };
        spns.push(spn);
      } else {
        var clauses = rclause.split(re);
        clauses = _.compact(clauses);
        clauses.forEach(function (clause) {
          clause = clause.trim();
          if (!clause) return;
          var lang = re.test(clause) ? true : false;
          var span = {
            text: clause
          };
          if (lang) span.lang = code; // span[code] = true
          // if (lang) { }

          spns.push(span);
        });
      }
    });
    spans.push(spns);
  });
  return spans;
};

exports.default = _default;