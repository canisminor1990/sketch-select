export default {
	entry             : './panel/index.js',
	disableCSSModules : false,
	hash              : false,
	ignoreMomentLocale: true,
	sass              : {
		includePaths: ['node_modules', 'panel/style']
	},
	theme             : {
		'@primary-color': '#32d1ff'
	},
	html              : {
		'template': './panel/index.ejs'
	},
	define            : {
		'$dirname': __dirname,
		'$isDev'  : process.env.NODE_ENV === 'development'
	},
	extraBabelPlugins : [
		'lodash',
		['import', {libraryName: 'antd', libraryDirectory: 'es', style: true}]
	],
	env               : {
		development: {
			extraBabelPlugins: ['dva-hmr']
		}
	}
};

