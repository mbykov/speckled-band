# speckled-band.js

"Oh, my God!  Helen! It was the band!  The speckled band!" (The Adventure of the Speckled Band (1892))

Speckled band breaks a string on chunks depending on code ranges

## Installation

````javascript
    npm install --save speckled-band
````

## API

````javascript
    let sband = require('speckled-band')
````

code ranges according ISO 639-3 code: https://iso639-3.sil.org/code_tables/639/data

````javascript
    let code = 'zh'
    let sentence = 'some text:\n 2017年上半年, other text'
    let pars = sband(text, 'tib')
````

````javascript
    $ node dist/run.js 年上半年  zho
    sband: 年上半年 --> [ [ { text: '年上半年', lang: 'zho' } ] ]
````

````javascript
    $ node dist/run.js ཤེས་རབ་སྙིང་པོ་  tib
    sband: ཤེས་རབ་སྙིང་པོ་ --> [ [ { text: 'ཤེས་རབ་སྙིང་པོ་', lang: 'tib' } ] ]
````



## License

  GNU GPL
