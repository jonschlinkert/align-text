

var repeat = require('repeat-string');
var longest = require('longest');
var wrap = require('word-wrap');

var str = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis';


var end = repeat('*', 54);
var txt = '';
txt += end;
txt += '\n';
txt += wrap(str, {
  width: 50,
  indent: '* ',
  newline: ' \n* '
});
txt += '\n';
txt += end;

var lines = txt.split('\n');
var max = longest(lines).length;
var len = lines.length;
var res = '', i = 0;

while (len--) {
  var line = lines[i++];
  var llen = line.length;
  res += line + repeat(' ', max - llen) + '*' + '\n';
}


console.log(res);
