/**
 * @module lib/utilities
 */

const fs = require('fs')
const path = require('path')

/**
 * Convert dash names to camel case
 *
 * @param {String} val - The string to be converted
 */
const toCamelCase = val => val.split('-')
  .map(p => p[0].toUpperCase() + p.substring(1))
  .join('')

/**
 * Load files into map
 *
 * @param {String} [dir=__dirname] - The directory from where to load the files
 * @param {String} [sufix='''] - The sufix to add to the name in the map
 * @param {String} [extension=''] - The file extension
 * @param {String} [exlcude='index.js'] - File to be excluded from load
 * @returns {Object} - The object with loaded modules
 */
const load = ({
  dir = __dirname,
  sufix = '',
  extension = '',
  exclude = 'index.js'
}) => {
  return fs.readdirSync(dir)
    .filter(f => f !== exclude)
    .filter(f => fs.statSync(path.join(dir, f)).isFile())
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
