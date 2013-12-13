'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.cssurlrev = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/default.css');
    var expected = grunt.file.read('test/expected/default.css');
    test.equal(actual, expected, 'should update paths in css file based on grunt.filerev.summary.');

    test.done();
  },
  custom_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/custom.css');
    var expected = grunt.file.read('test/expected/custom.css');
    test.equal(actual, expected, 'should update paths in css file based on an assets json file.');

    test.done();
  },
  hashmap_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/hashmap.css');
    var expected = grunt.file.read('test/expected/hashmap.css');
    test.equal(actual, expected, 'should update paths in css file based on an assets json file and hashmap format');

    test.done();
  },
  prefix_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/prefix.css');
    var expected = grunt.file.read('test/expected/prefix.css');
    test.equal(actual, expected, 'should update paths in css file based on an assets json file and a prefix');

    test.done();
  },
};
