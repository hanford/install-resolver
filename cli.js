#! /usr/bin/env node

const chalk = require('chalk')
const program = require('commander')
const InstallResolver = require('./lib')
const pkg = require('./package.json')

program
  .version(pkg.version)
  .arguments('<action> [packages...]', { isDefault: true })
  .action(InstallResolver)

program.parse(process.argv);
