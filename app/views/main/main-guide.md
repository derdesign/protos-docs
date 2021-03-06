[markdown]

## Installation

    $ npm install protos

To have global access to the protos(1) executable, the framework can be installed globally:

    $ sudo npm install -g protos
    
If protos was installed locally, the protos(1) command can be run as such:

    $ ./node_modules/.bin/protos
    
> Protos runs on UNIX-like systems such as **Linux** & **Mac OSX**. Windows support might be added in the future.
    
## Creating an Application

To quickly create an application and get started:

    $ protos create myapp
    
More options can be specified to the create command:

    $ protos create myapp --domain protos.org --js jquery prototype --css bootstrap
    
An application will be created in the *myapp/* directory. Protos will automatically download the jQuery and Prototype JavaScript 
libraries, storing them *myapp/public/js* and the Bootstrap CSS framework into *myapp/public/css/bootstrap/*.

The `--domain` switch will automatically set the domain in the application's config.

To create an application with some initial models & controllers:

    $ protos create myapp --model users accounts --controller blog admin profile
    
For a full list of protos commands, run `protos --help`.

## Installing Dependencies

When installing protos, only the core dependencies are installed. Middleware dependencies are not installed. The 
`protos install` command is used to install the required middleware dependencies.

If protos detects the dependencies of a middleware are not installed, it will throw an exception including the install command
needed to get the modules installed in the application.

The application's `package.json` file is automatically updated when `protos install` is used.

To see the dependencies each middleware requires, refer to the 
[dependencies.json](https://github.com/derdesign/protos/blob/master/dependencies.json) file.

## Creating Application Resources

The protos command also allows the creation of [Controllers](#controllers), [Helpers](#view-helpers), 
[Models](#models), [Views](#views) and [Partials](#view-partials).

> In order to generate components, the commands should be run within the application's path.

### Creating Controllers

Controllers are created with the `protos controller` command. This will also create the **Helpers** and **Views**:

    $ protos controller blog admin
    
To prevent helpers from being automatically created, use the `--nohelper` switch.

The generated controllers are stored in the `app/controllers` directory.

### Creating Models

Models are created with the `protos model` command.

    $ protos model posts comments
    
The model names specified will automatically be converted to their plural form.

The generated models are stored in the `app/models/` directory.
    
### Creating Helpers

Helpers are created with the `protos helper` command:

    $ protos helper navigation sidebar

The generated helpers are stored in the `app/helpers/` directory.

### Creating Views

Views are created with the `protos view` command:

    $ protos view main/info admin/accounts blog/posts,comments
    
The view command accepts several formats:

- `controller/view`
- `controller/view1,view2,view3`
- `controller/view.ext`
    
The `--ext` option can be used to create views with specific extensions:

    $ protos view main/user,test --ext jade
    
The default view extensions created by `protos view` can be specified in the following configuration option:

- `app.config.cli.viewExt`

The configuration option can be found on `config/base.js`.

The generated views are stored in the `app/views/<controler>/` directory.
  
> The view formats, configuration and options also apply to the other view generation commands.
  
### Creating View Partials

View Partials are created with the `protos partial` command, using the same format and options of views:

    $ protos partial blog/post,widget admin/sidebar
    
The generated partials are stored in the `app/views/<controller>/partials/` directory.

### Creating Static Views

Static Views are created with the `protos static` command, using the same format and options of views:

    $ protos static about contact portfolio
    
A relative path can be specified, automatically creating the necessary directories to satisfy the provided path:

    $ protos static company/info/about,pricing,support
    
The generated static views are stored in the `app/views/__static/` directory.

### Creating Restricted Views

Restricted views are created with the `protos restricted` command, using the same format and options of views:

    $ protos restricted account/login,registration
    
A relative path can be specified, automatically creating the necessary directories to satisfy the provided path.
    
The generated restricted views are stored in the `app/views/__restricted/` directory.

### Creating Layout Partials

Layout partials are created with the `protos layout` command, using the same format and options of views:

    $ protos layout site/widgets/info,popular,comments

A relative path can be specified, automatically creating the necessary directories to satisfy the provided path.

The generated layout partials are stored in the `app/views/__layout` directory.

### Downloading Client-Side Libraries

Using the `protos fetch` command, client-side assets can be downloaded, as such:

    $ protos fetch --js prototype jquery

The jQuery & Prototype.js libraries will be downloaded into the application's `public/js` directory.

CSS Libraries and Frameworks can be also be downloaded automatically, as such:

    $ protos fetch --css bootstrap blueprint
    
The Blueprint and Bootstrap CSS frameworks into the application's `public/css` directory.

The `--css` and `--js` options can be used in the same command, they are not exclusive.

For a full list of the client-side libraries provided, refer to the supported
[JavaScript Libraries](https://github.com/derdesign/protos/blob/master/client/javascript.json) and 
[CSS Frameworks](https://github.com/derdesign/protos/blob/master/client/css.json).

## Running the Application Server

Applications can be run either by calling node directly with the application's directory (or boot file) as input,
or by using the protos executable to start the server.

### Using the node executable

To quickly start an application's server, call node with the application's directory as parameter:

    $ node myapp/
    
If located within the application's path, call the boot file directly:

    $ node boot.js
    
The application can also be launched on a specific environment:

    $ NODE_ENV=production node myapp/

### Using the protos executable

Applications can also be started using the protos command:

    $ protos server myapp/
    
If located within the application's path:

    $ protos server

Additionally, a specific environment can be specified:

    $ protos server --env production
    
The server can be run by forking into a new node process:

    $ protos server myapp/ --fork --logpath server.log
    
The server's stdout will be redirected into the log file specified.

## Protos Executable

If protos was installed globally with `npm -g install protos`, the `protos` executable is available:

    $ protos
    Usage: protos [action] [arguments]

    Actions: 

    Usage: [create, install, server, deploy, fetch, inspector, lint] 

    Components: [controller, helper, model, view, partial, layout, static, restricted]

      --domain        Domain to attach the application to (create)
      --css           Bundle client side CSS frameworks (create)
      --js            Bundle client side JavaScript libraries/frameworks (create)
      --model         Include models on application (create)
      --controller    Include controllers on application (create)
      --mustache      Use the .mustache extension for generated views (create)
      --fork          Creates a new node process when starting servers (server)
      --port          Port to use when proxying multiple servers (server)
      --env           Environment to use when running server (server)
      --logpath       File to save output when forking a new process (server)
      --nohelper      Don't create helpers when generating controllers (controller)
      --ext           Extension to use for generated normal/static/partial views (view)
      --driver        Driver to use by the model (model)
      --context       Model context to set (model)

    Example:

     $ protos create myapp --css bootstrap --js jquery backbone --model users --controller admin user

     Generate an application skeleton in the current directory, with the assets,
     models and controllers specified in the command.

     $ protos server myapp --fork --logpath server.log

     Starts the application's server and forks a new node process.

     protos@0.2.0 /usr/local/lib/node_modules/protos
     
## Deploying a Cluster Server

Protos provides a built-in proxy that will automatically direct requests for all applications. Behind the scenes,
it uses [Bouncy](https://github.com/substack/bouncy) to handle the redirection.

Applications can be deployed using the **command line** or a **JSON file**.


### Using the commmand line

Each application runs in a separate node process (or processes), isolated from other applications. Applications can specify 
how many **node processes** will be used in their respective `multiProcess` bootstrap option. 

To run a cluster server from the command line using the `app:port` convention:

    $ protos server mysite:8081 yoursite:8082 --port 80 --fork --logpath server.log --env production
    
This will run a proxy server on port 80, redirecting all requests to applications/ports specified.

### Using a JSON file

To deploy applications using JSON, create a JSON file (preferably where the application directories live).

The **cluster.json** file has the following structure:

    {
      "fork": "true",
      "env": "production",
      "port": "80",
      "logpath": "server.log",
      "routes": {
        "mysite": "8081",
        "yoursite": "8082"
      }
    }

These settings are analogous to the command line options.

To run a cluster server using a JSON deployment file, run the following:

    $ protos deploy cluster.json
    
The JSON file can be saved with any filename.

## Running the Node Inspector

Applications can easily be debugged using [node-inspector](https://github.com/dannycoates/node-inspector).

  > Starting the application in the debug environment will automatically launch the Node Debugger.
  
To start the inspector:

    protos inspector start
    
To stop the inspector:

    protos inspector stop
    
The Node Inspector listens on http://localhost:3000

To enable debug mode in any environment, use `protos.enableDebugger()`.

## Application Structure

The following tree contains the skeletal application structure, just after running `protos create myapp`.

    myapp/
    ├── app
    │   ├── controllers
    │   │   └── main.js
    │   ├── helpers
    │   │   └── main.js
    │   ├── models
    │   │   └── users.js
    │   └── views
    │       ├── __layout
    │       │   ├── footer.html
    │       │   └── header.html
    │       ├── __restricted
    │       │   ├── 404.html
    │       │   ├── 500.html
    │       │   └── msg.html
    │       ├── __static
    │       │   └── readme.md
    │       └── main
    │           └── main-index.html
    ├── boot.js
    ├── config
    │   ├── base.js
    │   ├── drivers.js
    │   ├── env
    │   │   ├── debug.js
    │   │   ├── development.js
    │   │   └── production.js
    │   ├── regex.js
    │   └── storages.js
    ├── data
    │   └── readme.md
    ├── hooks
    │   ├── init.js
    │   └── ready.js
    ├── incoming
    │   └── readme.md
    ├── lib
    │   └── application.js
    ├── log
    ├── middleware
    │   └── readme.md
    ├── package.json
    ├── public
    │   ├── favicon.ico
    │   └── robots.txt
    ├── scripts
    │   └── sample.js
    └── test
        └── readme.md

### boot.js

The Application's [bootstrap](#the-bootstrap-file-bootjs) file. It is used to specify the 
initial configuration, and many other important options.

### package.json

Package & Dependency information for the application.

### app/

Stores the application logic:

- **controllers**: controller files
- **helpers**: helper files
- **models**: model files
- **views**: view & layout files

### app/views

Directory where all the views are stored

- **__layout**: layout partials
- **__restricted**: restricted views
- **__static**: static views

Any other directories not mentioned (and present in the directory) are reserved for controller views.

### app/views/<controller>

Directory in which the views for <controller> are stored.

### config/

Application's configuration files. For more information, refer to [Application Configuration](#application-configuration).

### config/env/

Directory containing the environment-specific init scripts.

### data/

Any kind of data used by the application. Included for convenience purposes.

### hooks/

Directory used to store the application hooks (event handlers).

### incoming/

Directory to store file uploads. This is the upload location for the [Body Parser Middleware](middleware.html#body_parser).

### lib/

Application library files. Included for convenience purposes.

### log/

Directory used to store log files. This is the storage location for the [Logger Middleware](middleware.html#logger).

### middleware/

Application-specific middleware.

### public/

Public directory used to serve static content.

### scripts/

Miscellaneous scripts.

### test/

Application test files. Included for convenience purposes.


## Application Configuration

The application can be configured by editing the **bootstrap** file (boot.js), or by modifying the **configuration files**.

### Configuration Files

The configuration files are stored in the config/ directory. Here's an explanation on what each file contains:

- **base.js**: Base application configuration, directly accessed via `app.config`
- **drivers.js**: Driver configuration settings.
- **regex.js**: Regular Expressions to be used by the application
- **storages.js**: Storage configuration settings
- **env/**: Holds scripts for each environment

> Each file added into the config/ directory, will be added as a property of the `app.config` object.

### Driver & Storage Configuration

Each property in the configuration object belongs to the driver being configured:

    {
      default: 'mongodb',
      mongodb: {
        host: 'localhost',
        port: 27017
      }
    }
    
This approach assumes that the driver has only one configuration.  A driver can also have multiple configurations:

    {
      default: 'mongodb:users',
      mongodb: {
        users: {
          host: 'users.host.com',
          port: 27017
        },
        clients: {
          host: 'clients.host.com,
          port: 27017
        }
      }
    }
    
## Resource Paths

There are some situations in which there is a need to specify a _resource path_. Resource Paths only apply to Drivers and Storages, and 
is a method to access a specific driver or storage with a specific configuration.

If the driver has only one configuration, it can be used by just specifying its name, such as `mongodb` or `postgres`. The 
driver name is a driver provided by protos in `lib/drivers`.

If there are multiple configurations for the driver, it can be used by specifying the driver name, and the respective configuration,
separated by a colon, as such: `mongodb:users` or `postgres:accounts`.

> **Resource Paths** are used by models to detect the underlying driver configuration.

## The Bootstrap File (boot.js)

This file is used to start the application. It is provided by the application skeleton:

    var Protos = require('../');

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
        development: function(app) { 
          // Development environment code
        }
      },
  
      // Application events
      events: {
        components: function(protos) {
          // Load framework components
          protos.loadDrivers();
          protos.loadStorages();
          protos.loadEngines('ejs');
        },
        pre_init: function(app) {
          // Pre-initialization code
        },
        init: function(app) {
          // Load middleware
          app.use('logger');
        }
      }
  
    });

    module.exports = protos.app;

### Application Configuration

- **debugLog** &nbsp; _If set to true, will print debugging messages to stdout._

### Server Configuration

- **host** &nbsp; _Hostname to bind the application to._
- **port** &nbsp; *Port the app will listen. Might get overidden on deployment or by the `PORT_OVERRIDE` env.*
- **multiProcess** &nbsp; *Node processes the application will use. If `true` will use all available cores.*
- **stayUp** &nbsp; *Whether or not the server should exit on exceptions. If `true` will enable for all environments. An environment
name will enable the feature on that environment. An array of environments can also be used.*

### Environments

- **default** &nbsp; *Environment to use when running the application without specifying an environment.*
- **development** &nbsp; *Function to call when running on the `development` environment.*
- **production** &nbsp; *Function to call when running on the `production` environment.*
- **&lt;environment&gt;** &nbsp; *Run code for any environment by specifying a function and its name.*

### Events

- **init** &nbsp; *Function to call when the application initializes*
- **&lt;event&gt;** &nbsp; *Run code for an event by specifying a function and the event name*

## Controllers

Each controller groups routes for specific _namespaces_. For example:

- **BlogController**: _groups routes for the blog/ namespace_
- **AdminController**: _groups routes for the admin/ namespace_
- **UserController** _groups routes for the user/ namespace_
- **UserGroupController** _groups routes for the user-group/ namespace_

Each controller can have filters, which are functions run before each request is run. Are also used to encapsulate 
authentication for the contained routes.

> The namespace refers to the first section of the request URL, for example: `myapp.com/namespace/action/arg`


### MainController

This is a special controller, and is used to group all general routes not belonging to a specific namespace. By default, it
is the only controller included in the application skeleton, since it is required.

## Routes

Routes define the application's URL structure. Each route is defined **relative** to the its namespace.

### Route Functions

Routes map directly to HTTP Methods, such as GET, POST, PUT, DELETE, OPTIONS, TRACE. 

The functions are exposed as **pseudo-globals** (can be accessed without being defined inside the controller, but are not global), and are
defined as the method name, in lowercase.

### Route Function Arguments

The route functions can receive various types of arguments:

    get(route, validation, callback1, callback2, method1, method2);

- **route (string)** _the route to bind, including named parameters (prefixed with colons)_
- **validation (object)** _an object containing route parameters and their validation (regex, alias or function)._
- **callback (function)** _route callback(s) used to handle the request. Multiple can be specified sequentially._
- **method (string)** _additional method(s) to be handled by the route. Multiple can be specified sequentially._

The `validation` and `method` arguments are optional. Multiple callbacks can also be specified (additionally supporting an 
array of callbacks). At least one route `callback` is required.

### Simple Routes

A simple route is one that only has _(route, callback)_, such as:

    get('/hello', function(req, res) {
      res.render('index');
    });
    
If the route is placed in **MainController**, it will be bound to the global `/hello` URL. If it's
bound in any other controller, then it will be bound to the `/<namespace>/hello` URL.
    
### Multiple Route Callbacks

Multiple callbacks can be assigned to a specific route. Each will be executed in turn, passing control to the next
callback in the queue. All callbacks are invoked with `(req, res, params)` as arguments:

To pass control to the next callback, use `req.next()`.

Any callback in the queue can send a response (in this case, passing control to the next callback is not necessary).

### Route Validation

Protos implements a **RouteValidator**, which uses Regular Expressions and functions to validate the routes.

Routes can use named parameters, which in turn require specific validation in order for the route to match:

    get('/user/:name/:action' {name: 'alpha_underscores', action: /^(manage|show|delete)$/}, function(req, res) {
      ...
    });
    
The route has the `:name` and `:action` paramters, which are validated by the validation object.

The validation object can receive the following:

- **Regular Expression Literal**: _any regular expression._
- **Regular Expression Alias (string)** _any named regular expression provided by the app or protos._
- **Function**: _A validation function, invoked with the value to be validated. Returns boolean._

> The route validator applies the validation to each **chunk** (separated by the slashes) individually, providing the
> flexibility to match specific portions of the route with functions and/or individual RegExps.

If a URL matches the route, the `req.params` object will contain the named route parameters with their respective values.

### Accessing GET Query Data

The Query String data from the URL can be accessed via the `req.queryData` object.

Additionally, the Query String data can be obtained using the `req.getQueryData` method. If the [CSRF Middleware](/middleware.html#csrf)
is enabled, The CSRF token can be validated, and only accept the data if a valid token has been provided:

    req.getQueryData('secure', function(fields) {
      ...
    });
    
In this case, the query data will only be accessed if a valid token was specified. If not, an HTTP/400 response will be sent.

The 'secure' token has been generated with `req.csrfToken('secure')` in a template. For more info about tokens and CSRF in
general, consult the [CSRF Middleware](/middleware.html#csrf) documentation.

Using `req.getQueryData` without a CSRF token will invoke the callback with the `req.queryData` object, as if it had been
accessed directly.


### Accessing POST/PUT Fields & Files

To be able to parse the POST/PUT Request Bodies, the [Body Parser](/middleware.html#body_parser) middleware is required.

The middleware provides the `req.getRequestData` method, which is used to obtain the request fields and any uploaded files in
the request:

    req.getRequestData(function(fields, files) {
      ...
    });

The `files` argument is a [FileManager](/middleware.html#body_parser_filemanager) instance, which is used to manipulate
any uploaded files. If not expecting any files, use `files.removeAll()` to remove any uploaded files in the request.

If the [CSRF Middleware](/middleware.html#csrf) is enabled, the CSRF token can be provided. In this case, the callback will only 
be invoked if the token provided is valid. Otherwise, an HTTP/400 response is sent.
    
    req.getRequestData('secure', function(fields, files) {
      ...
    });

### Using the Validator Class

Protos implements a powerful **Validator** class, used to perfom all sorts of validation. A validator object groups several
validation rules and can be reused to validate data several times.

A new Validator instance can be obtained as such:

    var validator = app.validator();
  
The validator object accepts the following validation mechanisms:

- **RegExp Literal** any regular expression
- **RegExp Alias** any regular expression alias defined in the application
- **Function** a function invoked with the value to validate, which returns true if valid

> The job of the Validator is to receive an object to validate. Returns an **error message** on failure, and `null`
> on success.

The Validator allows **optional values**, which don't raise an error if not present on the object to validate.

The example below shows how to add validation rules to the Validator object:

    var validator = app.validator()
      .add({name: 'alpha'}, "Invalid name: %s")
      .add({email: 'email'}, "Invalid email: %s")
      .addOptional({password: 'password', password_confirm: 'password'}, "The password is invalid")
    
In this case, the `name`, `email`, `password` and `password_confirm` fields will be validated. The last two being optional.

As can be seen, the Validator methods can be chained, since each return the Validator instance. Also, multiple validation
fields can be defined in a single rule (as is the case with the password), sharing the same error message.

The validation error message can include the `%s` placeholder, which will be replaced with the invalid string.

To use the newly created validator:

    var err = validator.validate({
      name: "Ernie",
      email: "email@domain.com",
      password: "abc" // too short
    });
    
In this case, the validator will return the error message defined for password:

    "The password is invalid"
    
If the validation object contains fields that are determined to be valid, the validator will return `null`. Additionally, it
will **remove** any fields not defined in the validation rules from the _object being validated_.

The validator can also filter values after they have been validated. This is useful in case the data needs to be processed after
it has been validated. This is done using the `filter` method of the Validator:

    var validator = app.validator().
      .add({value: 'alpha'}, "Invalid value")
      .filter({
        value: function(val) {
          return new Buffer(val.trim().toUpperCase()).toString('base64');
        }
      });
      
In this case, whenever the `value` field is validated, it will be automatically processed by the filter, returning a base64
encoded string of its uppercase & trimmed contents.

The object being validated is automatically modified by the Validator. This way (if the validation is successful) when accessing
the object again, it will only contain the validated (and filtered, if any filters are present) fields. Any other fields not present
in the validation rules will be deleted from the object.

> The **Validator** can be used to validate both **GET Query Data** and **POST/PUT fields** after these have been obtained.


## Controller Filters

The Controller Filters are callbacks that are executed for all routes defined in the controller's namespace. A Controller 
can have multiple filters assigned. Each filter callback is invoked with `(req, res, promise)` as arguments.

The filter callbacks pass control to the next filter by emitting the `success` event of the promise emitter object:

    promise.emit('success')
    
After all filters have been processed, the controller will then proceed to run all the **callbacks** defined for the route.
    
If the filter callback determines that the request should not be processed, then it will send the response itself (and won't
emit the `success` event of the promise).

The example below shows how to add a Controller Filter:

    function MainController(app) {
      
      this.filter(function(req, res, promise) {
        var found = getUser(req.params.username);
        if (found) {
          promise.emit('success');
        } else {
          app.notFound(res);
        }
      });
      
      get('/user/:username', function(req, res) {
        ...
      });
      
    }
    
> Filters apply to **all routes** defined within a Controller. Using filters requires some discretion, to avoid side effects.


## Controller Authentication

Controller Authentication requires the [Session Middleware](/middleware.html#session).

> A user is assumed to be **logged in** when the `user` property of the session data is set.

As seen in the [Route Functions](#routes_route-functions) section, route functions are mapped to the HTTP Methods. These functions
will inherit the authentication mode for the controller.

Controller Authentication is defined by setting the `authRequired` property of a controller:

    function UsersController(app) {
      
      this.authRequired = true;
      
      get('/', function(req, res) {
        res.render('index');
      });
      
      private_get('/logout', function(req, res) {
        app.session.destroy(req, res, function() {
          app.login(res); // Redirect to login after logging out
        });
      });
      
      public_get('/login', function(req, res) {
        if (req.session.user) {
          app.home(res); // Redirect to homepage if logged in
        } else {
          res.render('login'); // Render login page if not logged in
        }
      });
      
    }

As seen above, the `get` route function is automatically set to **private**, since the controller has `authRequired` set 
to `true`. Route functions inherit the **private** requirement from the controller.

The **private** requirement can be overridden by adding the `public_` prefix to the route functions. There are public variants
of all the route functions available.

If the controller doesn't have `authRequired` set, the **private** requirement can be manually triggered for a route by adding
the `private_` prefix to the route functions. There are private variants of all the route functions available.

In the controller example above, `public_get` is set to override the private state inherited from the controller. In this case,
the `authRequired` setting will be ignored for that particular route.

> When using `authRequired`, filters will be executed after the authentication filter has been executed.



## Views

Views are rendered by calling `res.render` from the route callbacks. The view paths will be resolved depending on the _view_ 
specified, as well as the running controller.

### View Lookup

The table below shows the  argument passed to `res.render`, and the corresponding resolved path. 

In the table below: 

- The controller is assumed to be _MainController_. View paths are relative to _app/views/_.
- The view extensions are automatically detected, unless manually specified.

<table>
<thead>
<tr>
<th> View </th>
<th> Resolved Path </th>
</tr>
</thead>
<tbody>
<tr>
<td>res.render('index')</td>
<td>main/main-index.html</td>
</tr>
<tr>
<td>res.render('index.html')</td>
<td>main/index.html</td>
</tr>
<tr>
<td>res.render('blog/posts')</td>
<td>blog/blog-posts.html</td>
</tr>
<tr>
<td>res.render('blog/posts.jade')</td>
<td>blog/posts.jade</td>
</tr>
<tr>
<td>res.render('@layout')</td>
<td>\_\_layout/layout.html</td>
</tr>
<tr>
<td>res.render('#msg')</td>
<td>\_\_restricted/msg.html</td>
</tr>
<tr>
<td>res.render('#accounts/login')</td>
<td>\_\_restricted/accounts/login.html</td>
</tr>
<tr>
<td>res.render('#accounts/registration.mustache')</td>
<td>\_\_restricted/accounts/registration.mustache</td>
</tr>
</tbody>
</table>

### View Parameters

When rendering views with `res.render`, an optional object with view locals can be passed:

    res.render('index', {
      activePage: 'features',
      message: "Hello World!"
    });
    
Additionally, the `raw` flag can be set, to render the view in **raw mode**. This means the view will be rendered as is,
without including the header and footer templates located in `__layout`:

    res.render('index', {name: "Ernie"}, true);
    
The **view locals** object can also be omitted:

    res.render('index', true);
    
The `raw` flag can be configured on a global basis, by adjusting `app.config.rawViews`, found on `config/base.js`.

### View Locals

When rendering views, there are several view locals exposed by default:

<table>
<thead>
<tr>
<th> View Local </th>
<th> Description </th>
</tr>
</thead>
<tbody>
<tr><td>protos</td><td>Protos instance</td></tr>
<tr><td>app</td><td>Application instance</td></tr>
<tr><td>req</td><td>Current Request object</td></tr>
<tr><td>res</td><td>Current Response object</td></tr>
<tr><td>params</td><td>Route Parameters</td></tr>
<tr><td>session</td><td>Session object</td></tr>
<tr><td>cookies</td><td>Request cookies</td></tr>
<tr><td>locals</td><td>View Locals object (circular reference)</td></tr>
</tbody>
</table>

There are extra view locals that are included automatically:

- **Application Globals** _&rarr; Any properties stored in the `app.globals` object_
- **Request Data** _&rarr; Any properties set using `req.set(key, val)`_
- **View Partials** _&rarr; All view partials are accessible as view locals_
- **View Helpers** _&rarr; All view helpers are accessible as view locals_

### View Extensions

The following table shows the view extensions for each Template Engine supported by Protos:

<table>
<thead>
<tr>
<th></th>
<th> Template Engine </th>
<th>  Engine Alias </th>
<th> View Extensions </th>
</tr>
</thead>
<tbody>
<tr>
<td></td>
<td> CoffeeKup </td>
<td> coffeekup </td>
<td> coffeekup, ck.html</td>
</tr>
<tr>
<td></td>
<td> DoT </td>
<td> dot </td>
<td> dot, dot.html</td>
</tr>
<tr>
<td></td>
<td> Eco </td>
<td> eco </td>
<td> eco, eco.html</td>
</tr>
<tr>
<td></td>
<td> EJS </td>
<td> ejs </td>
<td> ejs, ejs.html</td>
</tr>
<tr>
<td></td>
<td> Haml </td>
<td> haml </td>
<td> haml, haml.html</td>
</tr>
<tr>
<td></td>
<td> Haml-Coffee </td>
<td> hamlcoffee </td>
<td> hamlc, haml.coffee, hamlc.html</td>
</tr>
<tr>
<td></td>
<td> Handlebars </td>
<td> handlebars </td>
<td> handlebars, handlebars.html, hb.html</td>
</tr>
<tr>
<td></td>
<td> Hogan.js </td>
<td> hogan </td>
<td> hogan, hogan.html, hg.html</td>
</tr>
<tr>
<td></td>
<td> Jade </td>
<td> jade </td>
<td> jade, jade.html</td>
</tr>
<tr>
<td></td>
<td> Jazz </td>
<td> jazz </td>
<td> jazz, jazz.html</td>
</tr>
<tr>
<td></td>
<td> jQuery Templates </td>
<td> jqtpl </td>
<td> jqtpl, jqtpl.html, jq.html</td>
</tr>
<tr>
<td></td>
<td> JSHtml </td>
<td> jshtml </td>
<td> jshtml</td>
</tr>
<tr>
<td></td>
<td> Kernel </td>
<td> kernel </td>
<td> kernel, kernel.html, k.html, khtml</td>
</tr>
<tr>
<td></td>
<td> Liquor </td>
<td> liquor </td>
<td> liquor, liquor.html, lq.html</td>
</tr>
<tr>
<td></td>
<td> Swig </td>
<td> swig </td>
<td> swig, swig.html, sw.html</td>
</tr>
<tr>
<td></td>
<td> Whiskers </td>
<td> whiskers </td>
<td> whiskers, whiskers.html, wk.html</td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

> View Extensions can be added or modified by adjusting the `app.config.viewExtensions`, found in `config/base.js`. Each property
> will refer to the **view extension**, and the value to the **engine alias**.


## Static Views

Static views are mapped directly to the URLs of the application, without requiring any route to be defined. The directory containing 
the static views is `app/views/__static`.

Any view files located within the `app/views/__static` directory, will be automatically bound to the URL matching the view's
relative path to the `__static` directory.

The following table should be enough to understand how static views work:

<table>
<thead>
<tr>
<th> Static View </th>
<th> Mapped URL </th>
</tr>
</thead>
<tbody>
<tr>
  <td>app/views/\_\_static/about-us.html</td>
  <td>http://myapp.local/about-us</td>
</tr>
<tr>
  <td>app/views/\_\_static/posts/technology/display.html</td>
  <td>http://myapp.local/posts/technology/display</td>
</tr>
<tr>
  <td>app/views/\_\_static/widget/test.mustache</td>
  <td>http://myapp.local/widget/test</td>
</tr>
<tr>
  <td>app/views/\_\_static/some/cool/file.jade</td>
  <td>http://myapp.local/some/cool/file</td>
</tr>
</tbody>
</table>

> Sessions are **loaded automatically** when rendering static views.

## View Partials

View partials are rendered templates exposed as functions within a view.

The following table should be enough to understand how view partials are mapped into the local view functions:

<table>
<thead>
<tr>
<th> Path </th>
<th> Exposed View Partial </th>
</tr>
</thead>
<tbody>
<tr>
  <td>main/partials/user.html</td>
  <td>main_user()</td>
</tr>
<tr>
  <td>main/partials/admin-widget.html</td>
  <td>main_admin_widget()</td>
</tr>
<tr>
  <td>blog/partials/posts_display.html</td>
  <td>blog_posts_display()</td>
</tr>
<tr>
  <td>layout/sidebar.html</td>
  <td>sidebar()</td>
</tr>
<tr>
  <td>layout/sidebar/widget.jade</td>
  <td>sidebar_widget()</td>
</tr>
<tr>
  <td>layout/sidebar/admin/component.mustache</td>
  <td>sidebar_admin_component()</td>
</tr>
</tbody>
</table>

The `locals` object should be passed to the view partial, in order to access the view locals from the current view:

    blog_posts_display(locals)
    
There are situations in which custom locals need to be set, but still the current view locals need to be accessed. This
is achieved by using the `$wrap` view helper, available exactly for this purpose:

    blog_posts_display($wrap({
      count: 25,
      category: 'news',
      cache: true
    }, locals));
    
Using the `$wrap` view helper, a new object is created, having the locals object as prototype, exposing the new locals
into the partial, as well as the view locals from the current view (the `locals` object).

On all environments except **production**, the view partial functions are re-compiled whenever any changes are detected in 
the template files.


## View Helpers

View Helpers are additional functions exposed as view locals that provide specific functionality within views.

Helpers are located in the `app/helpers/` directory. Each helper is implemented in its own file. Helpers are implemented
as classes, and their methods are exposed within views.

Helper instances can be accessed via the `app.helper` object.

The following example shows how to extend the `CommonHelper` with a new method:

    function CommonHelper(app) {
      
    }
    
    CommonHelper.prototype.base64_encode = function(str) {
      return new Buffer(str).toString('base64');
    }

In this example, the helper method will be exposed within views as `$common_base64_encode`. The helper's name will be prefixed
to the function's name.

There may be a situation in which the helper prefix is not desired. In this case, the method can be added to the
`MainHelper` helper, available by default when an application is created.

Any methods added to `MainHelper` will not have the Helper's name prefixed to the function's name.

The following table should be enough to understand how helper methods are mapped to view helpers:

<table>
<thead>
<tr>
<th> Helper Class </th>
<th> Helper Method </th>
<th> Exposed View Helper </th>
</tr>
</thead>
<tbody>
<tr>
  <td>MainHelper</td>
  <td>app.helpers.main.base64_encode</td>
  <td>$base64_encode()</td>
</tr>
<tr>
  <td>UtilHelper</td>
  <td>app.helpers.util.format_date</td>
  <td>$util_format_date()</td>
</tr>
<tr>
  <td>UserAccountsHelper</td>
  <td>app.helpers.user_accounts.manage</td>
  <td>$user_accounts_manage()</td>
</tr>
</tbody>
</table>

### Default View Helpers

The following table outlines the default view helpers.

<table>
<thead>
<tr>
<th> View Helper </th>
<th> Description </th>
</tr>
</thead>
<tbody>
<tr>
  <td>$sanitize(str)</td>
  <td>Sanitizes input</td>
</tr>
<tr>
  <td>$escape(str)</td>
  <td>Escapes input</td>
</tr>
<tr>
  <td>$safe_str(str)</td>
  <td>Sanitizes and Escapes input</td>
</tr>
<tr>
  <td>$wrap(object, locals)</td>
  <td>Extends object with locals</td>
</tr>
</tbody>
</table>


## Drivers

Drivers provide a set of methods to operate with the underlying database, as well as a _Model API Implementation_, which allows
the driver to be used with a Model.
  
Besides handling model internal operations, Drivers can be used by themselves. Drivers are obtained by using the resource path,
prefixed by `drivers/`, as in the following example:

    app.getResource('drivers/mongodb:users', function(driver) {
      console.exit(driver);
    });
    
Driver instances are also available via the `app.drivers` object.

Protos implements the following Drivers:

- [MongoDB](https://github.com/derdesign/protos/blob/master/drivers/mongodb.js)
- [MySQL](https://github.com/derdesign/protos/blob/master/drivers/mysql.js)
- [PostgreSQL](https://github.com/derdesign/protos/blob/master/drivers/postgres.js)
    
> Drivers are loaded on demand, based on the configuration specified in `config/drivers.js`


### Query Caching

Drivers can have a **Storage** attached, which is used to cache specific queries, improving performance.

The Storage defined in the Driver's configuration will be inherited by the Model that uses it.
  
To enable query caching in a driver, specify the _Resource Path_ pointing to the storage to be used
as the caching layer, on the database configuration in `config/database.js`:

    postgres: {
      host: 'localhost',
      port: 5432,
      user: 'user',
      password: 'password',
      database: 'testdb',
      storage: 'redis:cache'
    }

### Cache Keywords

The following extra properties can be specified to trigger cache operations:

- **cacheID** &nbsp; This will set the ID for the current cache. If the cache is not stored, the retrieved query will then be cached. 
Any subsequent queries will return the cached result. This will happen until the cache is _invalidated_.
- **cacheInvalidate** &nbsp; This will invalidate a cacheID, and will force any subsequent queries to regenerate the cache for the specified ID.
- **cacheTimeout** &nbsp; Amount of seconds in which the cacheID will be invalidated. The effect will be the same as cacheInvalidate. This only works if the storage
backend supports TTL Expiration.

Caching operations are performed by the driver's `queryCached` method. The arguments are as follow:

    driver.queryCached(<cdata:object>, <method:string>, [<arguments> ...])
    
The `cdata` argument contains the cache data object. The second argument is the `method` to execute from the driver (or model)
in question. Any arguments that follow will be passed to the method specified.

### Cache storage

The following example shows Cache Storage in action:
    
    postgres.queryCached({
      cacheID: 'users_cache'
    }, 'queryAll', {
      columns: 'id',
      table: 'users'
    }, function(err, found) {
      ...
    });

Any subsequent queries performed with the `users_cache` cacheID, will return the cached content. Otherwise it will query the 
records and cache the results.

If the `users_cache` is invalidated, the next time it is queried it will store the cache again.

### Cache Invalidation

A Cache is invalidated when it is removed from the storage backend, causing the it to be regenerated.

The following example shows Cache Invalidation in action:

    postgres.queryCached({
      cacheInvalidate: 'users_cache'
    }, 'deleteWhere', {
      condition: 
    }, function(err) {
      ...
    });
    
This query will invalidate the `users_cache` cache, and will force any subsequent queries to regenerate.

### Cache Timeout

Caches can live for a specific amount of time. This defines their Time to Live (TTL).

This feature only works if the underlying storage backend supports key expiration. Of the storages supported by Protos, only
**RedisStorage** supports key expiration.

Expiring a cache is exactly the same as invalidating the cache after a specific amount of time.

The following example shows the Cache Timeout feature:

    postgres.queryCached({
      cacheID: 'users_cache',
      cacheTimeout: 3600
    }, 'queryAll', {
      columns: 'id',
      table: 'users'
    }, function(err, found) {
      ...
    });

The `cacheTimeout` value is specified in seconds.

## Models

Models provide an abstraction of data operations. Protos Models have _ORM_ built-in. They are _database-agnostic_ by nature, which
means the data structure can be defined in the model, without caring about the underlying database.

Each driver provides its own model bindings, which allow the driver to work as the Model's storage backend. Models perform part
of the job, while the driver does the heavy lifting under the hood.

If the Driver has a Storage assigned, the Model automatically inherits its caching capabilities.

### Defining the Driver

Each model needs a driver. Models by default inherit the _default_ driver, configured in _config/database.js_.

To connect the model with a Driver, the driver's _resource path_ is required:

    this.driver = 'mongodb:users'
    
For more info on _resource paths_, please refer to the [Resource Paths](#resource-paths) section.

### Defining Properties

The model's properties defines is structure and data types. These are used for _automatic typecasting_ and _validation_.

The `properties` property defines the model's information:

    this.properties = {
      user    : {type: 'string', required: true, validates: 'alnum_underscores'},
      pass    : {type: 'string', required: true, validates: 'password'},
      friends : {type: 'integer', validates: 'integer', default: 0},
      valid   : {type: 'boolean', default: true},
      date    : {type: 'timestamp', validates: 'timestamp', default: function() { return new Date(); }},
      object  : {type: 'object', default: {a: 1, b: 2, c: 3}},
      array   : {type: 'array', default: [1,2,3,4]}
    }
    
The following table explains the different keywords:

<table>
<thead>
<tr>
<th></th>
<th> Property </th>
<th> Description </th>
</tr>
</thead>
<tbody>
<tr>
<td></td>
<td> <strong>type</strong>     </td>
<td> Type of data. Available types are: (string|integer|boolean|timestamp|object|array)</td>
</tr>
<tr>
<td></td>
<td> <strong>required</strong> </td>
<td> Whether or not  the field is required</td>
</tr>
<tr>
<td></td>
<td> <strong>validates</strong> </td>
<td> Regular Expression or Alias used to validate the property</td>
</tr>
<tr>
<td></td>
<td> <strong>default</strong> </td>
<td> Sets the default value for the property. Accepts both values & functions</td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

  > The model will automatically typecast values to their respective JavasCript Native Objects.
  
One of the most powerful things about Protos's model implementation, are the _Object Types_. _JavaSript
Hashes_ and _Arrays_ can be saved into model properties.

The _type_ keyword will define how the data will be typecasted.

Protos accepts the following objects as validation:

1. **RegExp Literal**
2. **Model-Specific Validation**
3. **RegExp Alias**

### Defining Validation

The Model Validation uses the same approach as [Route Validation](#routes_route-validation). It will use the Regular Expressions defined 
by the application. Any _Regular Expression Alias_ can be used to validate fields.

There is an extra layer of validation provided by models: the `validation` property, which defines
model-specific validation rules. These are _Regular Expression Aliases_ that are only avaliable to the model.

Here's how validation is defined inside a Model:

    this.validation = {
      'username': 'alpha'
      'account': function(str) { return checkAccount(str); },
      'username: /^(ernie|james)$/
    }

These validation aliases can be used freely to validate the model's properties. Defining validation for the model is optional,
RegExp Literals can be used, or the Applications' Regular Expressions.

### The Model API

The table below shows the Methods provided by all Model instances:

<table>
<thead>
<tr>
<th></th>
<th> Method </th>
<th> Parameters </th>
<th> Function </th>
</tr>
</thead>
<tbody>
<tr>
<td></td>
<td> new &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </td>
<td> o, cdata, callback &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </td>
<td> Creates a new model object. Saves into the database, then creates the model with the provided data.</td>
</tr>
<tr>
<td></td>
<td> create </td>
<td> o, cdata, callback </td>
<td> Alias of <em>new</em></td>
</tr>
<tr>
<td></td>
<td> insert </td>
<td> o, cdata, callback </td>
<td> Same behavior as new, but instead of returning a new object, returns the ID for the new database entry.</td>
</tr>
<tr>
<td></td>
<td> add </td>
<td> o, cdata, callback </td>
<td> Alias of <em>insert</em></td>
</tr>
<tr>
<td></td>
<td> get </td>
<td> o, cdata, callback </td>
<td> Gets an new model object.</td>
</tr>
<tr>
<td></td>
<td> find </td>
<td> o, cdata, callback </td>
<td> Alias of <em>get</em></td>
</tr>
<tr>
<td></td>
<td> getAll </td>
<td> o, cdata, callback </td>
<td> Gets all records from the database</td>
</tr>
<tr>
<td></td>
<td> findAll </td>
<td> o, cdata, callback </td>
<td> Alias of <em>getAll</em></td>
</tr>
<tr>
<td></td>
<td> save </td>
<td> o, cdata, callback </td>
<td> Saves the model data into the Database.</td>
</tr>
<tr>
<td></td>
<td> update </td>
<td> o, cdata, callback </td>
<td> Alias of <em>save</em></td>
</tr>
<tr>
<td></td>
<td> delete </td>
<td> o, cdata, callback </td>
<td> Deletes the model data from the database.</td>
</tr>
<tr>
<td></td>
<td> destroy </td>
<td> o, cdata, callback </td>
<td> Alias of <em>delete</em></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

Here's the meaning of the Parameters:

- **o** &nbsp; _Object containing the model properties to query._
- **cdata** &nbsp; _[Cache Data](#drivers_cache-keywords) to pass to the driver._
- **callback** &nbsp; _Callback to call upon completion._

### Application's Model Methods

Models can be accessed in several ways. All models expose things in a similar way, so explaining with a single model would
be enough to understand the concept. For the sake of this example, we'll assume _UsersModel_.

The _UsersModel_ instance can be accessed via `app.usersModel` and `app.models.usersModel`. Each model instance has the methods
documented in the previous section.

The table below shows the model methods and their equivalent:

<table>
<thead>
<tr>
<th></th>
<th> Method </th>
<th>  Equivalent </th>
</tr>
</thead>
<tbody>
<tr>
<td></td>
<td> app.model.newUser </td>
<td> app.usersModel.new</td>
</tr>
<tr>
<td></td>
<td> app.model.createUser </td>
<td> app.usersModel.create</td>
</tr>
<tr>
<td></td>
<td> app.model.insertUser </td>
<td> app.usersModel.insert</td>
</tr>
<tr>
<td></td>
<td> app.model.addUser </td>
<td> app.usersModel.add</td>
</tr>
<tr>
<td></td>
<td> app.model.getUser </td>
<td> app.usersModel.get</td>
</tr>
<tr>
<td></td>
<td> app.model.findUser </td>
<td> app.usersModel.find</td>
</tr>
<tr>
<td></td>
<td> app.model.findAllUsers </td>
<td> app.usersModel.findAll</td>
</tr>
<tr>
<td></td>
<td> app.model.saveUser </td>
<td> app.usersModel.save</td>
</tr>
<tr>
<td></td>
<td> app.model.updateUser </td>
<td> app.usersModel.update</td>
</tr>
<tr>
<td></td>
<td> app.model.deleteUser </td>
<td> app.usersModel.delete</td>
</tr>
<tr>
<td></td>
<td> app.model.destroyUser </td>
<td> app.usersModel.destroy</td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>


### The Model Generator Concept

Protos introduces the _"Model Generator"_ concept. Node uses non-blocking asynchronous callbacks. This makes the
usual ORM approach to create an object and _then_ synchronously saving its settings not that intuitive with most database 
modules running asynchronously.

Each _Model Instance_ is itself a _Model Generator_. The term can also be interchangeable with _Model Factory_.

The Model Object does not operate directly on model objects. _Model Objects_ (introduced on the next section) use the methods
provided by the Model API, to perform the CRUD operations.

  > **Model Generators** are used to retrieve a group of **ModelObjects**. The returned objects will be directly related to the parameters
  > passed to the Model Generator's method.

The term exists to make a _distinction_ between the object that _generates_, and the object that is _generated_.

### The Model Object Concept

Model Objects are individually retrieved by _Model Generators_. They contain a set of methods totally different from the ones
found in the _Model Generator_.

  > Relationships defined in Models expose their own methods into the Model Objects created by the Models
  
The sections below will explain in detail which methods are exposed by each relationship. If multiple relationships are set 
on the model (either _Inbound_ or _Outbound_), their specific methods will end up in the Model Object.

The Model Object's prototype can be accessed via the `modelObjectProto` on the Model Instance. In this case, the term "Model" refers
to the _Model Generator_. The object is itself bound to the `__proto__` property of all model instances. The real prototype is 
found on `modelObjectProto.constructor.prototype`.

Each Model Object as a `generator` property, which points to the _Model Generator_ that created it.

Model Objects are analogous to the models seen in other Application Frameworks or ORM Implementations. The following table
shows the Methods provided by the Model Object's _Prototype_:

<table>
<thead>
<tr>
<th></th>
<th> Method </th>
<th> Arguments </th>
<th> Description </th>
</tr>
</thead>
<tbody>
<tr>
<td></td>
<td> save </td>
<td> cdata, callback </td>
<td> Saves the model data</td>
</tr>
<tr>
<td></td>
<td> update </td>
<td> cdata, callback </td>
<td> Alias of <em>save</em></td>
</tr>
<tr>
<td></td>
<td> sync </td>
<td> cdata, callback </td>
<td> Alias of <em>save</em> </td>
</tr>
<tr>
<td></td>
<td> delete </td>
<td> cdata, callback </td>
<td> Removes model</td>
</tr>
<tr>
<td></td>
<td> remove </td>
<td> cdata, callback </td>
<td> Alias of <em>delete</em></td>
</tr>
<tr>
<td></td>
<td> destroy </td>
<td> cdata, callback </td>
<td> Alias of <em>delete</em></td>
</tr>
<tr>
<td></td>
<td> createMulti </td>
<td> options </td>
<td> Creates a multi-wrapped object from Model Object</td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

Here's the meaning of the Parameters:

- **cdata** &nbsp; _[Cache Data](#drivers_cache-keywords) to pass to the driver._
- **callback** &nbsp; _Callback to call upon completion._
- **options** &nbsp; _Options to pass to the Multi constructor._

### Extending Model Objects

Each Model Object can be extended by adding methods that work on the model data. The methods added to a Model Generator will 
be passed to the Model Object's prototype. To add new methods, a `methods` object (containing the methods to add) should be
added to the Model Generator's Constructor.

The example that follows explains how to extend Model Objects:

    function UsersModel() {
      
      ...
      
    }
    
    UsersModel.methods = {
      
      getFullName: function() {
        return this.firstname + ' ' + this.lastname;
      }
      
      getBalance: function() {
        return this.balance;
      }
      
    }
    
The methods added to `UsersModel.methods` will be passed to the <em>Model Object Constructor's Prototype</em>. More specifically,
they will be available in `app.usersModel.modelObject.constructor.prototype`.

All models created by the Model Generator (or manually) will inherit the same methods, which work directly on the Model 
Object's data. This allows maximum flexibility by extending models with additional functionality.


### Manually creating models

There might be a situation in which the model methods might not be enough to get models from the database. In this case, models
can manually be created for the raw query results, automatically wrapping within a ModelObject, bound to the model itself.

Any object resulted from querying the database can be used to generate a model. The data will be validated using the defined
model validation, as if it was retrieved by the model itself.

The only requirement to create a model is that the ID should be present in the object used to create the model. This is going
to be used to be able to sync the data into the database.

The example below explains the manual creation of models:

    var usersModel = app.model.usersModel,
        usersDriver = usersModel.driver;
    
    usersDriver.queryWhere({
      condition: 'user IN (1,2,3,4) AND confirmed=true',
      table: usersModel.context
    }, function(err, found) {
      var models = found.map(function(data) {
        // Create a model object from objects found
        return usersModel.createModel(data);
      });
      ...
    });

In the example above, the `models` array contains the Model Objects. Each of the model objects has the necessary methods to
abstract all database operations internally.

### Query Caching

If the Model's Driver has a Storage attached, the model supports caching. Caching operations in Models have exactly the same
interface as with Drivers.

The `queryCached` method is used to perform queries with extra caching capabilities.

The only thing to have in mind when using the `queryCached` meethod in models, is that the `method` name should be an existing
method of the model object itself. For example:

    usersModel.queryCached({
      cacheID: 'users_cache',
      cacheTimeout: 3600
    }, 'findAll', function(err, found) {
      ...
    });

For more information, refer to the [Driver Query Caching](#drivers_query-caching) section.
    
### Model Relationships

Protos implements relationships between models. Relationships allow _Model Objects_ to connect with other model objects, adding
the additional ability to perform actions on such relationships.

Relationships only affect _Model Objects_. Each relationship, depending if it is _Inbound_ or _Outbound_, will modify either
the source or the destination model.

  > The Relationships implementation makes use of **Linguistic Inflection**, so the names should be specified in a specific form, either
  > _plural_ or _singular_ depending on the relationship being established.

An **Inbound** Relationship is where the _source_ model is the target receiving the link to the _destination_ model.

An **Outbound** Relationship is where the _destination_ model is the target receiving the link to the _source_ model.

The sections below explain the relationships, and their specific requirements and exposed methods.
 
### hasOne Relationship

This is an _Inbound_ relationship, affecting the model which establishes the connection. This relationship consists on the following:

  > The model establishing a connection, receives a one-to-one connection with the target model. A _string_ property will be assigned into the
  > Model Generator, which will define the link to the destination model.

The _hasOne_ relationship is set as follows:

    this.hasOne = 'user';
    
The target model _must_ be specified in _singular form_. This relationship will set a `user` property into the _Model Generator_, which
links to a _Model Object_ of _UsersModel_.

Additionally, the relationship can be set to an _alias_ of the target model. This allows the use of a different property other
than the singular form of the target model:

    this.hasOne = 'buddy(user)';
    
This will set a `buddy` property into the _Model Generator_, which links to a _Model Object_ of _UsersModel_.

Based on the property assigned, the _Model Object_'s prototype will be extended with new methods. The following table outlines
the inherited methods on the _Model Object_ establishing the relationship. A property of `user` is assumed to be added:

<table>
<thead>
<tr>
<th></th>
<th> Method </th>
<th> Arguments&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </th>
<th> Provides </th>
<th> Description </th>
<th>  </th>
</tr>
</thead>
<tbody>
<tr>
<td></td>
<td> getUser </td>
<td> callback </td>
<td> err, model </td>
<td> Gets the linked model</td>
<td></td>
</tr>
<tr>
<td></td>
<td> setUser </td>
<td> model/id, callback </td>
<td> err </td>
<td> Links model to self</td>
<td></td>
</tr>
<tr>
<td></td>
<td> removeUser </td>
<td> callback </td>
<td> err </td>
<td> Breaks the relationship with model</td>
<td></td>
</tr>
<tr>
<td></td>
<td> deepRemoveUser </td>
<td> callback </td>
<td> err </td>
<td> Breaks relationship with model and deletes the unlinked model from database</td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

Assuming _AccountsModel_ has set the relationship, the following example shows how to use the relationship:

    app.model.getAccount({id: 99}, function(err, account) {
      account.deepRemoveUser(function(err) {
        if (err) throw err;
        else console.exit("Successfully unlinked & removed user from account"); // Account now has no user linked
      });
    });

### hasMany Relationship

This is an _Inbound_ relationship, affecting the model which establishes the connection. This relationship consists on the following:

> The model establishing the connection receives a one-to-many connection with the target model. An _array_ property will be assigned
> into the Model Generator, which will define the links to the destination model.

The _hasMany_ relationship is set as follows:

    this.hasMany = 'users';
    
An array of target models can also be specified:

    this.hasMany = ['groups', 'buddies(users)']
    
Aliases work exactly the same for this relationship as well. The only difference is that _plural form_ must be used to define the target models.

The example above will set a `groups` array property into the _Model Generator_, which contains links to _Model Objects_ of _GroupsModel_. Additionally,
a `users` property will be added, containing links to _Model Objects_ of _UsersModel_.

Based on the property assigned, the _Model Object_'s prototype will be extended with new methods. The following table outlines
the inherited methods on the _Model Object_ establishing the relationship. A property of `buddies` is assumed to be added:

<table>
<thead>
<tr>
<th></th>
<th> Method </th>
<th> Arguments&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </th>
<th> Provides&nbsp;&nbsp;&nbsp;&nbsp; </th>
<th> Description </th>
<th>  </th>
</tr>
</thead>
<tbody>
<tr>
<td></td>
<td> addBuddy </td>
<td> model/id, callback </td>
<td> err </td>
<td> Appends a link to model in self. Restricts to a single item.</td>
<td></td>
</tr>
<tr>
<td></td>
<td> addBuddies </td>
<td> array, callback </td>
<td> err </td>
<td> Connects Models or ID’s connected in array with self</td>
<td></td>
</tr>
<tr>
<td></td>
<td> getBuddy </td>
<td> model/id, callback </td>
<td> err, model </td>
<td> Gets a linked model</td>
<td></td>
</tr>
<tr>
<td></td>
<td> getBuddies </td>
<td> array, callback </td>
<td> err, models </td>
<td> Retrieves the specified models (as long as a connection exists)</td>
<td></td>
</tr>
<tr>
<td></td>
<td> removeBuddy </td>
<td> model/id, callback </td>
<td> err </td>
<td> Unlinks the model from self. Restricts to a single item.</td>
<td></td>
</tr>
<tr>
<td></td>
<td> removeBuddies </td>
<td> array, callback </td>
<td> err </td>
<td> Breaks the relationsip with the specifeid models/ids (as long as a connection exists)</td>
<td></td>
</tr>
<tr>
<td></td>
<td> deepRemoveBuddy </td>
<td> model/id, callback </td>
<td> err </td>
<td> Breaks relationship with model and deletes the unlinked model from database. Restricts to a single item.</td>
<td></td>
</tr>
<tr>
<td></td>
<td> deepRemoveBuddies </td>
<td> array, callback </td>
<td> err </td>
<td> Breaks relationship with models and deletes the unlinked models from database.</td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

Assuming _UsersModel_ set the relationship, the following example shows how to use the relationship:

    // we got buddy earlier
    
    app.model.getUser({name: 'ernie'}, function(err, user) {
      if (err) throw err;
      else user.addBuddy(buddy, function(err) {
         if (err) throw err;
         else console.exit("Buddy and User are now pals");
      });
    });

### belongsTo Relationship

This is an _Outbound_ relationship. Setting this relationship is exactly the same as setting a _hasOne_ relationship, but swapping
source and destination models. 

For example:

    // Relationship being set from UsersModel

    this.belongsTo = 'company.boss'
    
Assuming the relationship is being set by _UsersModel_, this would translate to:

    // Relationship as translated into CompaniesModel
    
    this.hasOne = 'boss(user)';
    
The same rules for _hasOne_ apply. Additionally, `{target-model}.{target-property}` can be specified. Both the _target model_ and _target property_
should be specified in _Singular Form_.

### belongsToMany Relationship

This is an _Outbound_ relationship. Setting this relationship is exactly the same as setting a _hasMany_ relationship, but swapping
the source and destination models.

For example:

    // Relationship as being set from UsersModel
    
    this.belongsToMany = 'company.employees'
    
Assuming the relationship is being set from _UsersModel_, this would translate to:

    // Relationship as translated into CompaniesModel
    
    this.hasMany = 'employees(users)';
    
The same rules for _hasMany_ apply. Additionally, `{target-model}.{target-property}` can be specified. The _target model_ is specified in 
_Singular Form_, and the _target property_ should be specified in _plural form_.

## Storages

Storages provide a common transport which can be used as a caching layer, or as a storage layer for the Application, 
Drivers and Models. Storages are configured in _config/storage.js_. 

A Storage can be obtained with `app.getResource`, using its resource path prefixed with `storages/`, as follows:

    app.getResource('storages/redis:session', function(storage) {
      console.exit(storage);
    });
    
All storages implement a common API, that provide a layer of abstraction between two endpoints. The following table explains
the Storage API Methods:

<table>
<thead>
<tr>
<th></th>
<th> Method </th>
<th> Arguments&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </th>
<th> Provides&nbsp;&nbsp;&nbsp;&nbsp; </th>
<th> Description </th>
</tr>
</thead>
<tbody>
<tr>
<td></td>
<td> get </td>
<td> key, callback </td>
<td> err, results </td>
<td> Retrieves one or more records from the storage backend (key accepts string/array)</td>
</tr>
<tr>
<td></td>
<td> getHash </td>
<td> key, callback </td>
<td> err, hash </td>
<td> Retrieves a hash from the storage backend</td>
</tr>
<tr>
<td></td>
<td> set </td>
<td> key, value, callback </td>
<td> err </td>
<td> Inserts one or more records into the storage backend. Key can also be an object with keys/values (skip value)</td>
</tr>
<tr>
<td></td>
<td> setHash </td>
<td> key, hash, callback </td>
<td> err </td>
<td> Inserts a hash (object) into the storage backend</td>
</tr>
<tr>
<td></td>
<td> updateHash </td>
<td>  key, object, callback </td>
<td> err </td>
<td> Updates a hash with new values in object</td>
</tr>
<tr>
<td></td>
<td> deleteFromHash </td>
<td> hash, key, callback </td>
<td> err  </td>
<td> Deletes one or more keys from a specific hash</td>
</tr>
<tr>
<td></td>
<td> delete </td>
<td> key, callback </td>
<td> err </td>
<td> Deletes one or more records from the storage backend</td>
</tr>
<tr>
<td></td>
<td> rename </td>
<td> oldkey, newkey </td>
<td> err </td>
<td> Renames a key</td>
</tr>
<tr>
<td></td>
<td> expire </td>
<td> key, timeout, callback </td>
<td> err  </td>
<td>  Makes a specific key expire in a certain amount of time (only on backends that support TTL)</td>
</tr>
<tr>
<td></td>
<td> multi </td>
<td> config </td>
<td> N/A </td>
<td> Allows execution of multiple storage operations</td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

All the methods have the same effect, regardless of which storage backend used.

### Available Storages

Protos provides the following Storages:

- [MongoDB](https://github.com/derdesign/protos/blob/master/storages/mongodb.js)
- [Redis](https://github.com/derdesign/protos/blob/master/storages/redis.js)

For more information about the Storage API, refer to the [lib/storage.js](https://github.com/derdesign/protos/blob/master/lib/storage.js) source code.

[/markdown]
