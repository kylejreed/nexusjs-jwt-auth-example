const { join } = require('path')

module.exports = {
  preset: 'ts-jest',
  testEnvironment: join(__dirname, 'nexus-test-environment.js'),
}
