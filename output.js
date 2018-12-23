const { eraseLine } = require('ansi-escapes')
const chalk = require('chalk')
const ora = require('ora')
// const ms = require('ms')

exports.info = function(msg) {
  console.log(`${chalk.gray('>')} ${msg}`)
}

exports.error = function(msg) {
  if (msg instanceof Error) {
    msg = msg.message
  }

  console.error(`${chalk.red('> Error!')} ${msg}`)
}

exports.success = function(msg) {
  console.log(`${chalk.green('> Success!')} ${msg}`)
}

// exports.time = function() {
//   const start = new Date()
//   return chalk.gray(`[${ms(new Date() - start)}]`)
// }

exports.wait = function(msg) {
  const spinner = ora(chalk.green(msg))
  spinner.color = 'blue'
  spinner.start()

  return function() {
    spinner.stop()
    process.stdout.write(eraseLine)
  }
}
