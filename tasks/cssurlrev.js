/*
 * grunt-cssurlrev
 * https://github.com/richardbolt/grunt-cssurlrev
 *
 * Copyright (c) 2013 Richard Bolt
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('cssurlrev', 'Your task description goes here.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var self = this,
      options = self.options({
        assets: ''  // Assets file - false or empty to use grunt.filerev.summary
      });

    if (options.assets && grunt.file.isFile(options.assets)) {
      assets = grunt.file.readJSON(options.assets);
    } else {
      // We must have run filerev in some manner if we're not
      // passing in an assets json file to use.
      if (!grunt.filerev) {
        grunt.fail.fatal([
          'Could not find grunt.filerev.summary.',
          'Run "filerev" first or provide a options.assets JSON file.'
        ].join('\n'));
      }
      assets = grunt.filerev.summary;
    }

    self.filesSrc.forEach(function (file) {
      var css = grunt.file.read(file);
      var original = css;
      var matches = css.match(/url\(\s*['"]?([^'"\)]+)['"]?\s*\)/gm);

      if (!matches){
        return;
      }
      
      matches.forEach(function(item){
        for (var key in assets) {
            css = css.replace(key, assets[key]);
        }
      });
      if (original !== css) {
        grunt.log.writeln('✔ '.green + file + (' was changed.').grey);
        grunt.file.write(file, css);
      }
    });
  });
};
