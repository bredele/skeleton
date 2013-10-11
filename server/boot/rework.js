
/**
 * Module dependencies.
 */

var Styl = require('Styl'),
    path = require('path'),
    fs = require('fs'),
    read = fs.readFileSync;


/**
 * Rework css plugin.
 *
 * @param {Builder} builder
 * @api public
 */

module.exports = function(builder){
  builder.hook('before styles', function(pkg){
    var styles = pkg.config.styles;
    if (!styles) return;

    for (var i = 0; i < styles.length; i++) {
      var file = styles[i];
      var ext = path.extname(file);
      if ('.styl' != ext) return;

      var css = compile(read(pkg.path(file), 'utf8').replace(/\r/g, ''));
      var newFile = path.basename(file, '.styl') + '.css';
      pkg.addFile('styles', newFile, css);
      pkg.removeFile('styles', file);
      --i;
    }
  });
};


/**
 * Compile `css`.
 */

function compile(css) {
  return Styl(css, { whitespace: true, compress:false }).toString();
}