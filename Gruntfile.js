var path = require('path');

module.exports = function(grunt)
{
	grunt.initConfig(
	{
		pkg: grunt.file.readJSON('package.json'),

		meta:
		{
			source: '_source',
			assets: '<%= meta.source %>/assets',
			css: '<%= meta.assets %>/css',
			js: '<%= meta.assets %>/js'
		},

		uglify:
		{
			options:
			{
				mangle: true
			},
			dist:
			{
				files:
				{
					'<%= meta.assets %>/all.min.js':
					[
						'<%= meta.js %>/jquery.js',
						'<%= meta.js %>/jquery.ui.js',
						'<%= meta.js %>/jquery.cookie.js',
						'<%= meta.js %>/jquery.dynatree.js',
						'<%= meta.js %>/bootstrap.js',
						'<%= meta.js %>/underscore.js'
					]
				}
			}
		},

		sass:
		{
			dist:
			{
				options:
				{
				    style: 'compressed'/*,
				    quiet: false,
				    trace: true,
				    debugInfo: true*/
				},
				files:
				{
					'<%= meta.css %>/print.css' : '<%= meta.css %>/print.scss',
					'<%= meta.css %>/site.css' : '<%= meta.css %>/site.scss'
				}
			}
		},

		cssmin:
		{
			compress:
			{
				files:
				{
					'<%= meta.assets %>/all.min.css': 
					[
						'<%= meta.css %>/bootstrap.css',
						'<%= meta.css %>/dynatree.css',
						'<%= meta.css %>/site.css'
					]
				}
			}
		},

		watch:
		{
			all:
			{
				files: ['<%= meta.source %>/**/*'],
				tasks: ['sass', 'cssmin', 'uglify', 'jekyll'],
				options:
				{
					interrupt: false
				}
			}	
		},

		jekyll:
		{
			build:
			{
				options:
				{
					serve: false,
					watch: false
				}
			}
		},

		connect:
		{
		    server:
		    {
		    	options:
		    	{
		        	port: 5000,
		        	base: 'gemini'
		      	}
		    }
		}

		/*shell:
		{
        	build:
        	{
            	command: 'jekyll serve --watch'
        	}
    	}*/
	});

	grunt.event.on('watch', function(action, filepath)
	{
		grunt.log.writeln(filepath + ' has ' + action);
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jekyll');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('docs', ['sass', 'cssmin', 'uglify', 'jekyll', 'connect', 'watch']);
};
