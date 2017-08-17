# speckled-band.js

"Oh, my God!  Helen! It was the band!  The speckled band!"

Speckled band breaks a string on chunks depending on code ranges

## Installation

````javascript
    npm install --save speckled-band
````

## API

````javascript
    var band = require('speckled-band');
````


````javascript
    let code = 'zh'
    let sentence = 'some text: 2017年上半年, other text'
    band(code, sentence, function(err, results) {
       // process results
    })
````

````javascript
[ { sp: 'some text: 2017' },
  { cl: '年上半年' },
  { sp: ', other text' } ]
````




## License

  GNU GPL
