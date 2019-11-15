'use strict';
module.exports = function(grunt) {

  grunt.initConfig({

    watch: {
      sass: {
        files: ['scss/**/*.scss'],
        tasks: ['sass','postcss'],
      },

    },

    sass: {
      dist: {
        options: {
          trace: true,
          //style: 'compressed'
        },
        files: {
          'css/style.css' : 'scss/style.scss',
          'css/ie9.css' : 'scss/ie9.scss'
        }
      }
    },

    postcss: {
      options: {
        map: true,

        processors: [
          require('postcss-flexibility'),
          require('autoprefixer')({browsers: 'last 2 versions, > 0.5%, ie >= 9'}), // add vendor prefixes
          require('cssnano')() // minify the result 
        ]
      },
      dist: {
        src: 'css/style.css',
        dest: 'css/style.min.css'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');


  grunt.registerTask('default', ['sass', 'postcss', 'watch']);

};