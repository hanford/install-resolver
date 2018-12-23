const exec = require('await-exec')
const fs = require('fs-extra')

const { join } = require('path')
const output = require('./output')

module.exports = async function InstallResolver(action, packages) {
  const cwd = process.cwd()
  process.chdir(cwd)

  const command = await getInstallCmd({ cwd, action, packages })

  const stopInstallSpinner = output.wait(`Running: "${command.trim()}"`)

  try {
    await exec(command)
    stopInstallSpinner()
    output.success('')
  } catch (err) {
    stopInstallSpinner()
    output.error(command)
  }
}

async function getInstallCmd({ cwd, action, packages = []}) {
  let canUseYarn = false

  try {
    await exec('yarnpkg --version')
    await fs.readFileSync(join(cwd, 'yarn.lock'))
    canUseYarn = true
  } catch (e) {
    canUseYarn = false
  }

  const cmd = canUseYarn ? 'yarn' : 'npm'
  const isInstall = action === 'add' || action === 'install'
  const isRemoval = !isInstall && action === 'remove'

  if (packages.length === 0) {
    if (isInstall) {
      return `${cmd} install`
    }
  }

  const actionFormatted =
    isInstall
      ? (canUseYarn ? 'add' : 'install')
      : isRemoval ? 'remove' : ''

  return `${cmd} ${actionFormatted} ${packages.length ? packages.join(' ') : ''}`
}
