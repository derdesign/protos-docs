
var sanitizer = protos.require('sanitizer');

function init(app) {
  
  // Add shortcodes
  
  var shortcodes = {
    escape: sanitizer.escape,
    sanitize: sanitizer.sanitize,
    markdown: function(str) {
      return app.markdown.parse(str.autoLink(), 'content');
    }
  }
  
  app.addFilter('context', function(buffer) {
    return app.shortcode.replace(buffer, shortcodes);
  });

}

module.exports = init;