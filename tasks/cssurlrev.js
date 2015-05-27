/*
 * grunt-cssurlrev
 * https://github.com/richardbolt/grunt-cssurlrev
 *
 * Copyright (c) 2013 Richard Bolt
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

var default_hashmap_rename_format = '#{= dirname}/#{= basename}_#{= hash}#{= extname}';

module.exports = function(grunt) {

  grunt.registerMultiTask('cssurlrev', 'Replace file urls in css files with urls that include revision hashes', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var self = this,
      options = self.options({
        assets: ''  // Assets file - false or empty to use grunt.filerev.summary
      });

    var url_map;
    if (options.assets && grunt.file.isFile(options.assets)) {
      url_map = grunt.file.readJSON(options.assets);
    } else {
      // We must have run filerev in some manner if we're not
      // passing in an assets json file to use.
      if (!grunt.filerev) {
        grunt.fail.fatal([
          'Could not find grunt.filerev.summary.',
          'Run "filerev" first or provide a options.assets JSON file.'
        ].join('\n'));
      }
      url_map = grunt.filerev.summary;
    }

    var hashmap_rename_format;
    if ( options.hashmap_rename ){
      grunt.template.addDelimiters('#{ }', '#{', '}');
      var tmpl_option = {
        delimiters: '#{ }',
      };
      // use the default renaming scheme if hashmapRename is just set to true
      hashmap_rename_format = typeof options.hashmap_rename === true ? default_hashmap_rename_format : options.hashmap_rename;
    }

    self.filesSrc.forEach(function(file) {
      var css = grunt.file.read(file);
      var original = css;
      // find urls, do not inlude inlined data URIs
      var matches = css.match(/url\(\s*['"]?(?!data:)([^'"\)]+)['"]?\s*\)/gm);

      if (!matches){
        return;
      }
      matches.forEach(function(original_url){

        // url matches need to be trimmed
        // possible example: "url('../fonts/iconfont/iconfont.eot?#iefix')"
        // trim the beginning and end, potentially leading slashes and ../
        original_url = original_url.replace(/url\(\s*['"]?(\.\.\/)*\/?([^'"\)?#]+)([^'"]*)?['"]?\s*\)/, '$2');

        if (original_url.substr(0, 2) === './') {
          original_url = original_url.substr(2);
        }

        if (original_url in url_map){
          var new_url = url_map[original_url];
          if (options.hashmap_rename){
            new_url = hashmapRename(original_url);
          }
          if (options.prefix){
            new_url = options.prefix + new_url;
          }
          css = css.replace(original_url, new_url);
        }

      });
      if (original !== css) {
        grunt.log.writeln('✔ '.green + file + (' was changed.').grey);
        grunt.file.write(file, css);
      }
    });



    function hashmapRename(filepath){
      if (hashmap_rename_format) {
        var hash = url_map[filepath];
        var extname = path.extname(filepath);
        tmpl_option['data'] = {
          // dest: dest,
          // cwd: cwd,
          hash: hash,
          extname: extname,
          dirname: path.dirname(filepath),
          basename: path.basename(filepath, extname),
        };
        filepath = grunt.template.process(hashmap_rename_format, tmpl_option);
      }
      return filepath;
    }

  });
};
