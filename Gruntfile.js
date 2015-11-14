'use strict'

module.exports = function (grunt) {
  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        livereload: true
      },
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile', 'jscs:gruntfile']
      },
      less: {
        files: 'src/less/**/*.less',
        tasks: ['less']
      },
      scripts: {
        files: 'src/js/**/*.js',
        tasks: ['jshint:scripts', 'jscs:scripts', 'uglify:scripts']
      },
      entry: {
        files: 'src/index.html',
        tasks: ['htmlmin:entry']
      },
      partials: {
        files: 'src/partials/**/*.html',
        tasks: ['htmlmin:partials']
      },
      libs: {
        files: 'src/libs/**',
        tasks: ['copy:libs']
      },
      images: {
        files: 'src/images/**',
        tasks: ['imagemin']
      }
    },
    htmlmin: {
      options: {
        removeComments: true,
        removeCommentsFromCDATA: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true
      },
      entry: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: '*.html',
          dest: 'build/'
        }]
      },
      partials: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: 'partials/**/*.html',
          dest: 'build/'
        }]
      }
    },
    less: {
      app: {
        options: {
          compress: true,
          ieCompat: false
        },
        files: [{
          expand: true,
          src: 'app.less',
          cwd: 'src/less/',
          dest: 'build/css/',
          ext: '.css'
        }]
      }
    },
    uglify: {
      options: {},
      scripts: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: 'js/**/*.js',
          dest: 'build/'
        }]
      }
    },
    jshint: {
      options: {
        curly: true, // 花括号
        eqeqeq: true, // 全等
        forin: true, // for in遍历对象，属性过滤 if (obj.hasOwnProperty(key)) {...}
        freeze: true, // 禁止修改原生对象的原型，如Array...
        funcscope: false, // function scope变量定义警告
        futurehostile: true, // 保留字变量名警告，如class, let等
        latedef: 'nofunc', // 禁止变量先使用后定义，函数除外
        maxdepth: 3, // 最深嵌套三级
        maxerr: 30, // 最大警告数量为0,出现错误立即停止检查
        maxparams: 10, // 函数参数最多个数
        noarg: true, // 不允许使用arguments.caller等
        nocomma: true, // 禁止使用逗号运算符
        nonbsp: true, //
        nonew: true, // new对象必须赋值给一个变量，禁止new MyConstructor();
        strict: true, // es5 strict mode
        undef: true, // 未定义变量警告
        unused: true, // 未使用变量警告
        asi: true, // 不必使用分号
        boss: true, // 阻止在条件语句中赋值的警告if (a = 10) {}
        esnext: false, // es6
        evil: false, // eval使用警告
        eqnull: true, // 阻止==null警告
        reporter: require('jshint-stylish')
      },
      gruntfile: {
        options: {
          node: true,
          globals: {
            module: true,
            exports: true
          }
        },
        src: 'Gruntfile.js'
      },
      scripts: {
        options: {
          undef: false,
          browser: true,
          globals: {
            $: true,
            jQuery: true
          }
        },
        src: 'src/js/**/*.js'
      }
    },
    jscs: {
      options: {
        config: '.jscsrc',
        verbose: true
      },

      gruntfile: {
        src: 'Gruntfile.js'
      },
      scripts: {
        src: 'src/js/**/*.js'
      }
    },
    copy: {
      favicon: {
        expand: true,
        cwd: 'src/',
        src: 'favicon.ico',
        dest: 'build/'
      },
      libs: {
        expand: true,
        cwd: 'src/',
        src: 'libs/**',
        dest: 'build/'
      }
    },
    imagemin: {
      all: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: 'src/',
          src: 'images/**/*.{png,jpg,gif}',
          dest: 'build/'
        }]
      }
    },
    concurrent: {
      dev: {
        tasks: ['watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-jscs')
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-contrib-htmlmin')
  grunt.loadNpmTasks('grunt-contrib-imagemin')
  grunt.loadNpmTasks('grunt-concurrent')
  grunt.loadNpmTasks('grunt-contrib-watch')

  // Default task.
  grunt.registerTask('build', [
    'htmlmin',
    'less',
    'jshint',
    'jscs',
    'uglify',
    'copy',
    'imagemin'])

  grunt.registerTask('default', ['build', 'concurrent'])
}
