/**
 * Temporary - The lord of tmp.
 *
 * Author: Veselin Todorov <hi@vesln.com>
 * Licensed under the MIT License.
 */

/**
 * Dependencies.
 */
var fs = require('fs');
var path = require('path');
var generator = require('./generator');
var detector = require('./detector');
var Base = require('./base');

/**
 * File constructor.
 *
 * @param {String|null} name
 */
function File(name) {
  this.init(name);
};

/**
 * File extends from tmp.
 */
Object.setPrototypeOf(File.prototype, Base.prototype);

/**
 * Creates new file.
 *
 * @param {String} filename
 */
File.prototype.create = function(filename) {
  return fs.writeFileSync(path.normalize(filename), '',{mode:0600}); //Go use 0600 mode for file, see ref: https://golang.org/src/io/ioutil/tempfile.go
};

/**
 * Asynchronously reads the entire contents of a file.
 */
File.prototype.readFile = function() {
  fs.readFile.apply(fs, this.prepareArgs(arguments, [function(err) {throw Error(err)}]));
};

/**
 * Synchronous read.
 */
File.prototype.readFileSync = function() {
  return fs.readFileSync.apply(fs, this.prepareArgs(arguments));
};

/**
 * Asynchronously writes data to a file.
 */
File.prototype.writeFile = function() {
  fs.writeFile.apply(fs, this.prepareArgs(arguments, [{}, function(err) {throw Error(err)}]));
};

/**
 * Synchronous writes data to a file.
 */
File.prototype.writeFileSync = function() {
  return fs.writeFileSync.apply(fs, this.prepareArgs(arguments));
};

/**
 * Asynchronous file open.
 */
File.prototype.open = function() {
  fs.open.apply(fs, this.prepareArgs(arguments, [function(err) {throw Error(err)}]));
};

/**
 * Synchronous open.
 */
File.prototype.openSync = function() {
  return fs.openSync.apply(fs, this.prepareArgs(arguments));
};

/**
 * Asynchronous close.
 */
File.prototype.close = function() {
  fs.close.apply(fs, Array.prototype.slice.call(arguments, [function(err) {throw Error(err)}]));
};

/**
 * Synchronous close.
 */
File.prototype.closeSync = function() {
  return fs.closeSync.apply(fs, Array.prototype.slice.call(arguments));
};

/**
 * Asynchronous unlink.
 */
File.prototype.unlink = function() {
  fs.unlink.apply(fs, this.prepareArgs(arguments, [function(err) {throw Error(err)}]));
};

/**
 * Synchronous unlink.
 */
File.prototype.unlinkSync = function() {
  return fs.unlinkSync.apply(fs, this.prepareArgs(arguments));
};

/**
 * Exporting the lib.
 */
module.exports = File;
