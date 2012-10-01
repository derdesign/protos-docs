/*jshint undef: false */

/**
  Main Controller
  
  The controller used as a namespace for the application's root path.
  
  Other controllers will use their alias as a namespace for the routes. For
  example, the route /admin on BlogController, will be accessed via
  http://localhost:8080/blog/admin.
  
  Routes defined in controllers take precedence over the static file routes. 
  This means you can control access to any of the static files available
  in the public/ directory.
 */

function MainController(app) {
  
  // var production = (app.environment == 'production');
  
  get('/:index', {index: /^(|index\.html)$/}, function(req, res) {
    res.render('features', {
      activePage: 'features'
    });
  });
  
  get('/:page', {page: 'sitePages'}, function(req, res, params) {
    var page = params.page.replace(/\.html$/, '');
    req.setPageTitle(page);
    res.render(page, {
      activePage: page
    });
  });

}

module.exports = MainController;