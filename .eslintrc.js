/*eslint-disable quote-props */
module.exports = {
	'parser': 'babel-eslint',
	'env': {
		'browser': true,
		'es6': true,
		'mocha': true,
		'node': true
	},
	'ecmaFeatures': {
		'jsx': true,
		'modules': true
	},
	'plugins': [
		'react'
	],
	'rules': {
		'brace-style': [ 1, '1tbs' ],
		// REST API objects include underscores
		'camelcase': 0,
		'comma-dangle': 0,
		'comma-spacing': 1,
		// Allows returning early as undefined
		'consistent-return': 0,
		'dot-notation': 1,
		'eqeqeq': [ 2, 'allow-null' ],
		'eol-last': 1,
		'indent': [ 1, 'tab', { 'SwitchCase': 1 } ],
		'key-spacing': 1,
		'keyword-spacing': [ 1 ],
		'new-cap': [ 1, { 'capIsNew': false, 'newIsCap': true } ],
		'no-cond-assign': 2,
		'no-dupe-keys': 2,
		'no-else-return': 1,
		'no-empty': 1,
		// Flux stores use switch case fallthrough
		'no-fallthrough': 0,
		'no-lonely-if': 1,
		'no-mixed-requires': 0,
		'no-mixed-spaces-and-tabs': 1,
		'no-multiple-empty-lines': [ 1, { max: 1 } ],
		'no-multi-spaces': 1,
		'no-nested-ternary': 1,
		'no-new': 1,
		'no-process-exit': 1,
		'no-redeclare': 1,
		'no-shadow': 1,
		'no-spaced-func': 1,
		'no-trailing-spaces': 1,
		'no-undef': 2,
		'no-underscore-dangle': 0,
		// Allows Chai `expect` expressions
		'no-unused-expressions': 0,
		'no-unused-vars': 1,
		// Teach eslint about React+JSX
		'react/jsx-uses-react': 1,
		'react/jsx-uses-vars': 1,
		'react/jsx-no-undef': 2,
		'react/jsx-no-duplicate-props': 1,
		'react/react-in-jsx-scope': 2,
		'react/no-danger': 2,
		'react/no-did-mount-set-state': 1,
		'react/no-did-update-set-state': 1,
		'jsx-quotes': [ 1, 'prefer-double' ],
		'react/jsx-no-bind': 1,
		'react/jsx-curly-spacing': [ 1, 'always' ],
		// Allows function use before declaration
		'no-use-before-define': [ 2, 'nofunc' ],
		// We split external, internal, module variables
		'one-var': 0,
		'operator-linebreak': [ 1, 'after', { 'overrides': {
			'?': 'before',
			':': 'before'
		} } ],
		'padded-blocks': [ 1, 'never' ],
		'quote-props': [ 1, 'as-needed' ],
		'quotes': [ 1, 'single', 'avoid-escape' ],
		'semi-spacing': 1,
		'space-before-blocks': [ 1, 'always' ],
		'space-before-function-paren': [ 1, 'never' ],
		// Our array literal index exception violates this rule
		'space-in-brackets': 0,
		'space-in-parens': [ 1, 'always' ],
		'space-infix-ops': [ 1, { 'int32Hint': false } ],
		// Ideal for '!' but not for '++'
		'space-unary-ops': 0,
		// Assumed by default with Babel
		'strict': [ 2, 'never' ],
		'valid-jsdoc': [ 1, { 'requireReturn': false } ],
		// Common top-of-file requires, expressions between external, interal
		'vars-on-top': 1,
		'yoda': [ 1, 'always' ]
	}
};
