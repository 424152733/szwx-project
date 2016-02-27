// Generated on 2015-12-14 using generator-angular 0.12.1

module.exports = function (grunt) {

  require('time-grunt')(grunt);
  require('grunt-task-loader')(grunt);

  grunt.registerTask('dev', ['clean', 'replace:dev', 'concurrent:dev']);
  grunt.registerTask('product', ['clean', 'replace:product', 'concurrent:product']);
  grunt.registerTask('test', ['clean', 'replace:test', 'concurrent:test']);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dist: 'dist',
    banner:'/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
    footer:'\n/*! <%= pkg.name %> 最后修改于： <%= grunt.template.today("yyyy-mm-dd") %> */',
    src: {
      js:['app/scripts'],
      html:['app/tpls'],
      styles: ['app/styles']
    },
    watch: {
      options: {
        livereload: '<%= connect.options.livereload %>'
      },
      js: {
        files: ['app/scripts/**/*.js']
      },
      less: {
        files: ['<%= src.styles %>/less/*.less'],
        tasks: ['less'],
        options:{
          spawn: false
        }
      }
    },
    uglify: {
      options: {
        mangle: false,
        banner: "<%= banner %>",
        preserveComments: 'all',
        footer: "<%= footer %>",
        report: "min"
      },
      js: {
        files: {
          '<%= dist %>/scripts/<%= pkg.name %>.js':['app/scripts/**/*.js', '!app/scripts/<%= pkg.name %>.js']
        }
      }
    },
    cssmin: {
      css: {
        files: [{
          expand: true,
          cwd: 'app/styles',
          src: '**/*.css',
          dest: '<%= dist %>/styles'
        }]
      }
    },
    htmlmin: {
      html: {
        files: [{
          expand: true,
          cwd: 'app',
          src: ['tpls/**/*.html'],
          dest: '<%= dist %>'
        }]
      }
    },
    copy: {
      image: {
        files: [{
          expand: true,
          cwd: 'app/images',
          src: ['**/*.png'],
          dest: '<%= dist %>/images'
        }]
      }
    },
    less: {
      dev:{
        files: {
          'app/styles/css/<%= pkg.name %>.css': ['<%= src.styles %>/less/*.less']
        }
      }
    },
    connect: {
      options: {
        port: 6888,
        hostname: 'localhost',
        keepalive: true,
        livereload: 35729
      },
      server: {
        options: {
          open: false
        }
      }
    },
    concat: {
      options: {
        process: true
      },
      dev: {
        files:{
          '<%= src.js %>/<%= pkg.name %>.js': '<%= src.js %>/**/*.js',
          'framework/bootstrap/bootstrap.js': ['framework/bootstrap-datetimepicker/**/*.js', 'framework/bootstrap/dist/js/bootstrap.min.js'],
          'app/index.html': 'app/index.html'
        }
      },
      product: {
        files:{
          '<%= src.js %>/<%= pkg.name %>.js': '<%= src.js %>/**/*.js',
          'framework/bootstrap/bootstrap.js': ['framework/bootstrap-datetimepicker/**/*.js', 'framework/bootstrap/dist/js/bootstrap.min.js'],
          '<%= dist %>/index.html': 'app/index.html'
        }
      }
    },
    html2js: {
      temp: {
        src: '<%= src.html %>/**/*.html',
        dest: 'temp/tpl/app.js',
        module: 'templates.app'
      }
    },
    jshint: {
      all: [
        'app/**/*.js'
      ],
      options: {
        eqeqeq: false,
        asi: true,
        globals: {
          $: false,
          jQuery: false
        },
        browser: true,            // browser environment
        devel: true
      }
    },
    replace: {
      dev: {
        options: {
          patterns: [{
            json: grunt.file.readJSON('./config/environments/development.json')
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['./config/config.js'],
          dest: 'app/scripts/services/'
        }]
      },
      product: {
        options: {
          patterns: [{
            json: grunt.file.readJSON('./config/environments/product.json')
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['./config/config.js'],
          dest: 'app/scripts/services/'
        }]
      },
      test: {
        options: {
          patterns: [{
            json: grunt.file.readJSON('./config/environments/test.json')
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['./config/config.js'],
          dest: 'app/scripts/services/'
        }]
      }
    },
    jasmine: {
      src: '<%= src.js %>/**/*.js',
      option: {
        specs: 'test/spec/**/*.js',
        keepRunner: true
      }
    },
    clean: {
      src: ['<%= dist %>', 'app/scripts/szwx-project.js', 'framework/bootstrap/bootstrap.js', 'temp']
    },
    concurrent:{
      options:{
        logConcurrentOutput:true
      },
      test: ['concat:dev', 'watch', 'less', 'jshint', 'connect'],
      dev: ['watch', 'less', 'connect'],
      product: ['concat:product', 'uglify:js', 'cssmin:css', 'connect', 'htmlmin:html', 'copy:image']
    }
  })
};
