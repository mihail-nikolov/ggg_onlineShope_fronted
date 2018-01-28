module.exports = {
	root: true,
	parser: 'babel-eslint',
	env: {
		browser: true,
		node: true
	},
	"extends": "eslint:recommended",
	// required to lint *.vue files
	plugins: [
		'html'
	],
	// add your custom rules here
	rules: {
		"no-useless-escape": 0,
		"no-unused-vars": 0,
		"indent": ["error", "tab"],
		"semi": ["error", "always"],
		"comma-dangle": 1, // disallow trailing commas in object literals
		"no-cond-assign": 1, // disallow assignment in conditional expressions
		"no-dupe-keys": 1, // disallow duplicate keys when creating object literals
		"no-empty": 1, // disallow empty statements
		"no-console": 0
	},
	globals: {}
};