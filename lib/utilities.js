/**
 * @module lib/utilities
 */

const fs = require('fs')
const path = require('path')

const toCamelCase = f => f.split('-')
  .map(p => p[0].toUpperCase() + p.substring(1))
  .join('')

const load = ({
  dir = __dirname,
  sufix = '',
  extension = '',
  exclude = 'index.js'
}) => {
  return fs.readdirSync(dir)
    .filter(f => f !== exclude)
    .reduce((mods, file) => {
      // Get module name
      const mod = toCamelCase(path.basename(file, extension))
      // Add to modules
      mods[`${mod}${sufix}`] = require(path.join(dir, file))

      return mods
    }, {})
}

module.exports = {
  toCamelCase,
  load
}
