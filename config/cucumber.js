module.exports = {
  default: {
    paths: ['src/features/**/*.feature'],
    require: [
      'src/steps/**/*.ts',
      'src/steps/hooks.ts',
      'src/steps/world.ts'
    ],
    requireModule: ['ts-node/register'],
    format: [
      '@cucumber/pretty-formatter',
      'json:reports/cucumber-report.json',
      'html:reports/cucumber-report.html'
    ],
    formatOptions: { 
      snippetInterface: 'async-await' 
    },
    publishQuiet: true
  }
};