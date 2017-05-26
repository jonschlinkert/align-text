/*!
 * align-text <https://github.com/jonschlinkert/align-text>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var assert = require('assert');
var should = require('should');
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
  describe('when a number is passed:', function() {
    it('should indent lines by the number passed:', function() {
      align(fixture, 5).should.eql(integer);
    });
  });

  describe('when a number is passed:', function() {
    it('should auto-indent values in an array:', function() {
      align([7, 8, 9, 10]).should.eql([' 7', ' 8', ' 9', '10']);
      align(['a', '    b']).should.eql(['    a', '    b']);
    });
  });

  describe('when the callback returns a number:', function() {
    it('should indent lines in an array:', function() {
      align(fixture, function(len, max, line, lines) {
        return Math.floor((max - len) / 2);
      }).should.eql(expected);
    });

    it('should indent lines in a string:', function() {
      align(fixture.join('\n'), function(len, max, line, lines) {
        return Math.floor((max - len) / 2);
      }).should.eql(expected.join('\n'));
    });
  });

  describe('when the callback returns an object:', function() {
    it('should use the `indent` property:', function() {
      align(fixture, function(len, max, line, lines) {
        return { indent: Math.floor((max - len) / 2) };
      }).should.eql(expected);
    });

    it('should use the `prefix` property:', function() {
      align(fixture, function(len, max, line, lines) {
        return {prefix: '- '};
      }).should.eql(prefixed);
    });

    it('should use the `character` property:', function() {
      align(fixture, function(len, max, line, lines) {
        return { indent: Math.floor((max - len) / 2), character: '~', };
      }).should.eql(character);
    });
  });

  it('should throw an error on invalid args:', function() {
    (function() {
      align();
    }).should.throw('align-text expects a string or array.');
  });
});
