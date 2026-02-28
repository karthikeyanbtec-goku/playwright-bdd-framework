const common = {
    requireModule: [
        'ts-node/register',
        'tsconfig-paths/register'
    ],
    require: [
        'src/support/**/*.ts',
        'src/steps/**/*.ts'
    ],
    formatOptions: {
        snippetInterface: 'async-await',
        resultsDir: 'allure-results'
    },
    format: [
        'progress',
        'html:reports/cucumber-report.html',
        'allure-cucumberjs/reporter'
    ],
    paths: ['src/features/**/*.feature'],
    publishQuiet: true
};

module.exports = {
    default: {
        ...common
    },
    ci: {
        ...common,
        format: [
            'summary',
            'allure-cucumberjs/reporter'
        ]
    }
};
