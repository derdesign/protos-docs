
var sanitizer = protos.require('sanitizer');

function init(app) {
  
  // Add shortcodes
  
  var shortcodes = {
    escape: sanitizer.escape,
    sanitize: sanitizer.sanitize,
    markdown: function(str) {
      return app.markdown.parse(str, 'content');
    }
  }
  
  app.addFilter('response_buffer', function(data) {
    data.buffer = app.shortcode.replace(data.buffer, shortcodes);
    return data;
  });

}

module.exports = init;