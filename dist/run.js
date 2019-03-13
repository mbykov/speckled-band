"use strict";

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
var debug = require('debug')('app');

var d = debug;
var log = console.log;
var str = process.argv.slice(2)[0] || 'μαθηταὶ'; // || 'བརྗོད་པ་'

var code = process.argv.slice(3)[0] || 'grc';
var result = (0, _index.default)(str.trim(), code);
d('sband:', str, '-->', result); // 14 Τότε προσέρχονται αὐτῷ οἱ μαθηταὶ Ἰωάννου λέγοντες· Διὰ τί ἡμεῖς καὶ οἱ Φαρισαῖοι νηστεύομεν πολλά, οἱ δὲ μαθηταί σου οὐ νηστεύουσι; 15 καὶ εἶπεν αὐτοῖς ὁ Ἰησοῦς· Μὴ δύνανται οἱ υἱοὶ τοῦ νυμφῶνος πενθεῖν ἐφ’ ὅσον μετ’ αὐτῶν ἐστιν ὁ νυμφίος; ἐλεύσονται δὲ ἡμέραι, ὅταν ἀπαρθῇ ἀπ’ αὐτῶν ὁ νυμφίος, καὶ τότε νηστεύσουσιν.