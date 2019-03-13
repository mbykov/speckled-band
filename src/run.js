//
let debug = require('debug')('app')
let d = debug
let log = console.log

let str = process.argv.slice(2)[0] || 'μαθηταὶ' // || 'བརྗོད་པ་'
let code = process.argv.slice(3)[0] || 'grc'

import sband from './index'

let result = sband(str.trim(), code)

d('sband:', str, '-->', result)


// 14 Τότε προσέρχονται αὐτῷ οἱ μαθηταὶ Ἰωάννου λέγοντες· Διὰ τί ἡμεῖς καὶ οἱ Φαρισαῖοι νηστεύομεν πολλά, οἱ δὲ μαθηταί σου οὐ νηστεύουσι; 15 καὶ εἶπεν αὐτοῖς ὁ Ἰησοῦς· Μὴ δύνανται οἱ υἱοὶ τοῦ νυμφῶνος πενθεῖν ἐφ’ ὅσον μετ’ αὐτῶν ἐστιν ὁ νυμφίος; ἐλεύσονται δὲ ἡμέραι, ὅταν ἀπαρθῇ ἀπ’ αὐτῶν ὁ νυμφίος, καὶ τότε νηστεύσουσιν.
