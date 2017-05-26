/*!
 * align-text <https://github.com/jonschlinkert/align-text>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var assert = require('assert');
var align = require('./');

var fixture = [
  'Lorem ipsum dolor sit amet,',
  'consectetur adipiscing',
  'elit, sed do eiusmod tempor incididunt',
  'ut labore et dolore',
  'magna aliqua. Ut enim ad minim',
  'veniam, quis'
];

var expected = [
  '     Lorem ipsum dolor sit amet,',
  '        consectetur adipiscing',
  'elit, sed do eiusmod tempor incididunt',
  '         ut labore et dolore',
  '    magna aliqua. Ut enim ad minim',
  '             veniam, quis'
];

var integer = [
  '     Lorem ipsum dolor sit amet,',
  '     consectetur adipiscing',
  '     elit, sed do eiusmod tempor incididunt',
  '     ut labore et dolore',
  '     magna aliqua. Ut enim ad minim',
  '     veniam, quis'
];

var prefixed = [
  '- Lorem ipsum dolor sit amet,',
  '- consectetur adipiscing',
  '- elit, sed do eiusmod tempor incididunt',
  '- ut labore et dolore',
  '- magna aliqua. Ut enim ad minim',
  '- veniam, quis'
];

var character = [
  '~~~~~Lorem ipsum dolor sit amet,',
  '~~~~~~~~consectetur adipiscing',
  'elit, sed do eiusmod tempor incididunt',
  '~~~~~~~~~ut labore et dolore',
  '~~~~magna aliqua. Ut enim ad minim',
  '~~~~~~~~~~~~~veniam, quis'
];

describe('align', function() {
  describe('indent', function() {
    it('should indent lines to the given value', function() {
      assert.deepEqual(align(fixture, 5), integer);
    });

    it('should indent values to the longest length in an array', function() {
      assert.deepEqual(align([7, 8, 9, 10]), [' 7', ' 8', ' 9', '10']);
      assert.deepEqual(align(['a', '    b']), ['    a', '    b']);
    });
  });

  describe('function', function() {
    it('should indent a string to the returned number', function() {
      var actual = align(fixture, function(len, max, line, lines) {
        return Math.floor((max - len) / 2);
      });
      assert.deepEqual(actual, expected);
    });

    it('should indent lines in an array to the returned number', function() {
      var actual = align(fixture.join('\n'), function(len, max, line, lines) {
        return Math.floor((max - len) / 2);
      });
      assert.deepEqual(actual, expected.join('\n'));
    });
  });

  describe('object', function() {
    it('should use the `indent` property', function() {
      var actual = align(fixture, function(len, max, line, lines) {
        return { indent: Math.floor((max - len) / 2) };
      });
      assert.deepEqual(actual, expected);
    });

    it('should use the `prefix` property', function() {
      var actual = align(fixture, function(len, max, line, lines) {
        return { prefix: '- ' };
      });
      assert.deepEqual(actual, prefixed);
    });

    it('should use the `character` property', function() {
      var actual = align(fixture, function(len, max, line, lines) {
        return { indent: Math.floor((max - len) / 2), character: '~', };
      });
      assert.deepEqual(actual, character);
    });
  });

  it('should throw an error on invalid args', function() {
    assert.throws(function() {
      align();
    });
  });
});
