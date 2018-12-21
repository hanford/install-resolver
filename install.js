const exec = require('await-exec')
const fs = require('fs-extra')

const { join } = require('path')
const output = require('./output')

module.exports = async function Install () {
  const cwd = process.cwd()

  process.chdir(cwd)

  const installCmd = await getInstallCmd(cwd)

  const stopInstallSpinner = output.wait('Installing modules')

  try {
    await exec(installCmd)
    stopInstallSpinner()
    output.success(`Installed dependencies in ${cwd}`)
  } catch (err) {
    stopInstallSpinner()
    output.error(`${installCmd} installation failed: ${err}`)
  }
}

let cmd

async function getInstallCmd(cwd) {
  if (cmd) {
    return cmd
  }

  try {
    await exec('yarnpkg --version')
    await fs.readFileSync(join(cwd, 'yarn.lock'))
    cmd = 'yarn'
  } catch (e) {
    cmd = 'npm install'
  }

    return cmd
}
