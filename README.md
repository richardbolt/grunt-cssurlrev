# grunt-cssurlrev [![Build Status](https://travis-ci.org/richardbolt/grunt-cssurlrev.png?branch=master)](https://travis-ci.org/richardbolt/grunt-cssurelrev)

> Change asset paths inside css files based on output from grunt-filerev

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-cssurlrev --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-cssurlrev');
```

## The "cssurlrev" task

### Overview
This plugin will take css files and modify url links inside them (in place) that point to versioned assets versioned either with [`grunt.filerev`](https://github.com/yeoman/grunt-filerev) or from a specified json file. Please note that it modifies files in place at present.

In your project's Gruntfile, add a section named `cssurlrev` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  cssurlrev: {
    options: {
      assets: 'path/to/assets.json'
    },
    your_target: {
      src: ['public/css/*.css']
    },
  },
})
```

### Options

#### options.assets
Type: `String`
Default value: `''`

A file path that is used to load a json object from. If empty (default), then `grunt.filerev.summary` is used to modify url paths.

### Usage Examples

#### Default Options
In this example, files matching `public/css/*.css` are modified to have any links to assets modified with `grunt.filerev.summary` updated.

```js
grunt.initConfig({
  cssurlrev: {
    options: {
      separator: ': ',
      punctuation: ' !!!',
    },
    files: {
      src: ['public/css/*.css'],
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
