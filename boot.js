
var Protos = require('protos');

Protos.bootstrap(__dirname, {
  
  // Application configuration
  debugLog: false,
  
  // Server configuration
  server: {
    host: 'localhost',
    port: 8080,
    multiProcess: false,
    stayUp: 'production'
  },
  
  // Application environments
  environments: {
    default: 'development',
    production: function(app) {
      app.viewCaching = true;
    }
  },
  
  // Application events
  events: {
    components: function(protos) {
      
      // Load framework components
      protos.loadEngines('ejs');

    },
    pre_init: function(app) {
      
      // Lib extensions
      app.libExtensions('autolink');
      
    },
    init: function(app) {
      
      // Load Middleware
      app.use('markdown', {
        gfm: false,
        sanitize: false
      });
      app.use('shortcode');
      app.use('static_server');
      
      // Asset compiler
      if (app.environment === 'production') {
        app.use('asset_compiler', {
          minify: {
            'css/client.min.css': ['css/blueprint.css', 'css/print.less', 'css/main.less'],
            'js/client.min.js': 'js/client.js'
          }
        });
      } else {
        app.use('asset_compiler');
      }

    }
  
  }
  
});

module.exports = protos.app;
