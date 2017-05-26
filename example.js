var repeat = require('repeat-string');
var longest = require('longest');
var wrap = require('word-wrap');

var str = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis';

var text = wrap(str, {width: 50, indent: ' '});
var lines = text.split('\n');
var max = longest(lines).length;

lines = lines.map(function(line) {
  var diff = max - line.length;
  return '*' + line + repeat(' ', diff) + '*';
});

var stars = repeat('*', lines[0].length);
var res = stars + '\n'
  + lines.join('\n') + '\n'
  + stars;

console.log(res);
