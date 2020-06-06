
var json2xls = require('json2xls');
var fs = require("fs");

var jsonArr = [[{
    foo: 'bar',
    qux: 'moo',
    poo: 123,
    stux: new Date()
},
{
    foo: 'bar',
    qux: 'moo',
    poo: 345,
    stux: new Date()
}],

[{
    foo: 'Sandeep',
    qux: 'moYadavo',
    poo: 123,
    stux: new Date()
},
{
    foo: 'Jagga',
    qux: 'moDaakuo',
    poo: 345,
    stux: new Date()
}],
[{
    foo: 'Rohit',
    qux: 'land',
    poo: 123,
    stux: new Date()
},
{
    foo: 'abc',
    qux: 'xyz',
    poo: 345,
    stux: new Date()
}]];

for(let i=0;i<jsonArr.length;i++){

    // console.log(jsonArr[i]);
    var xls = json2xls(jsonArr[i]);

}

fs.writeFileSync('data3.xlsx', xls, 'binary');
