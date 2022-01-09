module.exports =  {
    'env': {
        'es2021': true,
        'node': true,
        'cypress/globals': true
    },
    'extends': 'eslint:recommended',
    'plugins': [
        'cypress'
    ],
    'parserOptions': {
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ]
    }
};
