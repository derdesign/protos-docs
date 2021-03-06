
[markdown]

## asset_compiler

Provides asset compilation features to the application.

### References

- http://lesscss.org
- http://coffeescript.org
- http://learnboost.github.com/stylus
  
### Configuration options

- **minify** &nbsp; _Assets to be minified. {target: [sources]}_
- **watchOn** &nbsp; _Array containing environments in which the assets will be automatically compiled on change_
- **compile** &nbsp; _Extensions to compile and/or watch._
- **compileExts** &nbsp; _Object containing the target extensions of compiled assets. Contains {ext: outExt}_
- **compilers** &nbsp; _Object containing the functions that compile the target extensions._
- **ignore** &nbsp; _Array containing a list of patterns to ignore._
- **uglifyOpts** &nbsp; _UglifyJS options_

If the `compile` array is found in the middleware configuration object, then the default assets (such as
less, coffee & stylus) will be disabled and replaced with your own extensions. This allows to only watch
for `.coffee` files, for example.
  
### Adding Extensions & Compilers

New extensions and compilers can be defined to be used by the application. Protos provides a solid platform which can be
extended upon, and integrate new asset compilers.

The following example shows the procedure to follow:

1. Add the custom extension in the `compile` array
2. Add the target extension of the compiled file in the `compiledExts` object
3. Add the Compiler function, receiving `(source, callback)` into the `compilers` object. The function should invoke the callback with `(err, code)`

These are the steps required to register your new extensions to compile/watch. The files with the custom extensions will now
be watched and compiled.

The middleware will automatically block access to the asset sources (when the **static_server** middleware is used).

### Asset Minification &amp; Compression

Several assets can be compiled, merged and minified into a single CSS or JS file, as such:

    app.use('asset_compiler', {
      minify: {
        'client.min.css': ['css/blueprint.css', 'print.less', 'layout.less', 'sidebar.styl'],
        'client.min.js': ['js/client.js', 'js/responsive.coffee', 'js/events.coffee'],
        'compat.min.js': 'js/compat.js'
      }
    });
    
The paths specified are relative to the application's `public/` directory. The example above will output two files into the
application's `public/` directory:

    /public/client.min.css
    /public/client.min.js
    /public/compat.min.js
    
The target compilation assets (the ones being merged & minified) won't be served by the Static File Server, and an HTTP/404
response will be sent upon access to such resources.

This means that nobody will be able to access `print.less`, `js/client.js` or any of the files that are being merged. These 
files are automatically blocked, since their content is accessed via their minified/compiled counterparts.

### Using the "ignore" option

The ignore option receives an array of patterns to exclude from compilation. These patterns are very similar to regular 
expressions. Pattern Matching can be used, similar to the Bash shell.

Example patterns are:

    hello/world/asset-*.css
    files/with/extension.*
    css/(bootstrap|skeleton)/[a-z]{1}*.(css|js)
    
These patterns only exclude the files matched by the pattern path. To exclude **all** the files with a specific filename,
then a pattern like the following would be needed:

    *(/?)variables.less
    
The pattern above will ignore all the files named `variables.less` found on any directory.

The following example outlines the `ignore` option:

    app.use('asset_compiler', {
      ignore: ['variables/*.less', 'hello/world/asset-*.css', 'css/(bootstrap|skeleton)/[a-z]{1}*.(css|js)']
    });


### Debug Messages

To inspect the logs emitted by this middleware, Set `app.debugLog` to true on `boot.js`.


## body_parser

Parse request bodies and file uploads in POST/PUT requests.

The files uploaded will be stored in the app's `incoming/` directory.

The middleware can be used as follows:

    app.use('body_parser, options);


### Configuration Options

- **maxFieldSize** &nbsp; _Max amount of bytes to allow for each field_
- **maxUploadSize** &nbsp; _Max number of bytes to allow for uploads_
- **keepUploadExtensions** &nbsp; _If set to true (default) will keep extensions for uploaded files_

### Accessing POST/PUT Fields & Files

This is fully documented in the [Routes Section](http://localhost:8080/guide.html#routes_accessing-postput-fields-files).

### FileManager

The middleware provides the **FileManager** Class, which is used to manage uploaded files in several ways. 

For a full reference of the class, refer to the [source code](https://github.com/derdesign/protos/blob/master/middleware/body_parser/file_manager.js).

### FileManager::expect

Expects files to match arguments. Other files not matching the ones listed in the expect arguments, will be removed silently, 
logging any errors encountered removing the files.

The `expect` method receives a single object as argument. Each key represents a file (that is, the `name` attribute of the
HTML File Input).

Each file key receives a configuration object (overriding the instance defaults), accepting the following properties:

- **maxFileSize** _maximum file size to accept._
- **type** _mime type(s) to accept (string|array)_

The uploaded files must meet the conditions set by `expect` (that is: file size and mime type). Failure to meet such conditions will result in the files
being removed automatically.

The following example outlines the usage of the `expect` method:

    var files = new FileManager(uploadedFiles);

    fm.expect({
      alpha: {
        maxFilesize: 10
      },
      beta: {
        type: 'text/plain'
      }
    });
    
Any files that are not expected will be automatically removed as a security measure. Any empty files uploaded will be 
automatically removed as well (by default, althought this behavior can be modified as will be seen later).

> Any methods that configure the **FileManager** instance should be run **before** the `expect` method.

### FileManager::removeFile

This method removes a named file from the uploaded files. Usage is as follows:

    files.removeFile('thumbnail');
    
The file will be removed asynchronously, and any errors detected will be automatically logged.

### FileManager::removeAll

Removes all the files uploaded in the current request asynchronously. Any errors encountered will be automatically logged.
The method receives no arguments. It is invoked as such:

    files.removeAll();
    
### FileManager::forEach

Iterates over each of the uploaded files, providing a file object on each iteration. Usage is as follows:

    files.forEach(function(file) {
      ...
    });
    
### FileManager::get

Get a named file. Usage is as follows:

    var thumb = files.get('thumbnail');
    
If the file is not found, `null` is returned.

### FileManager::maxFileSize

Sets the FileManager configuration to use specific filesize limit (in bytes). Files exceeding such limit will be automatically removed when the
`expect` method is called.

Usage is as such:

    files.maxFileSize(10*1024*1024).expect({...});

### FileManager::allow

Sets the FileManager configuration to allow specific mime types. Usage is as follows:

    files.allow(['image/jpg', 'audio/mp3']).expect({...});

### FileManager::allowEmpty

Sets the FileManager configuration to allow empty files. The method takes no arguments, and it's used as follows:

    files.allowEmpty().expect({...});

## cookie_parser

Parses cookie headers, Integrates with Sessions & Authentication. It adds methods to the _OutgoingMessage_ objects (or better said,
the _request_ objects).

The following table contains the methods exposed by the middleware and their functionality:

<table>
<thead>
<tr>
<th> Method </th>
<th> Description </th>
</tr>
</thead>
<tbody>
<tr>
<td>req.getCookie(cookie)</td>
<td>Returns the cookie value</td>
</tr>
<tr>
<td>req.hasCookie(cookie)</td>
<td>Returns true if cookie exists. False otherwise.</td>
</tr>
<tr>
<td>res.setCookie(cookie, val)</td>
<td>Sets a cookie</td>
</tr>
<tr>
<td>res.removeCookie(cookie)</td>
<td>Removes a cookie</td>
</tr>
<tr>
<td>res.removeCookies(cookie1, cookie2, ...)</td>
<td>Removes the specified cookies</td>
</tr>
</tbody>
</table>

The middleware is used heavily by the [Sessions](#session) middleware to manage session cookies.

## csrf

Provides **Cross-Site Request Forgery** protection for applications.
 
### Configuration Options

- **tokenSuffix** &nbsp; _Suffix to append to csrf tokens_

### Usage example

The ideal usage is to create the csrf token before rendering the view,
this allows the token to be present in logicless templates (e.g. mustachioed
template engines, such as hogan):

    res.render('form', {
      myToken: req.csrfToken('protect')
    });
 
The token can also be accessed using the `getToken` method:

     res.render('form', {
       myToken: app.csrf.getToken(req, 'protect')
     });
 
Additionally, the token can also be rendered within views:

    <input type="hidden" name="protect_key" value="<%- req.csrfToken('protect') %>" />

The middleware integrates nicely with the [Session](#session) and [Body Parser](#body_parser) middleware.

### Validating GET Query Data

This is fully documented in the [Routes](/guide.html#routes_accessing-get-query-data) section.

### Validating POST/PUT Fields

This is fully documented in the [Routes](/guide.html#routes_accessing-postput-fields-files) section.


## logger

Application logger. Also provides request logging functionality, supporting custom logging formats.

The logging functions are exposed by the middleware object, and connected to the
`info_log` and `error_log` events of the application. Error logs are conveniently printed with a stack trace, 
for proper inspection.

The log events are emitted by `app.log()`. If an `Error` instance is passed to it,
the `error_log` event is automatically emitted with the error in question.

The middleware provides the following transports:

- [MongoDB](https://github.com/derdesign/protos/blob/master/middleware/logger/transport-mongodb.js)
- [Redis](https://github.com/derdesign/protos/blob/master/middleware/logger/transport-redis.js)
- [File](https://github.com/derdesign/protos/blob/master/middleware/logger/transport-file.js)
- [Console](https://github.com/derdesign/protos/blob/master/middleware/logger/transport-console.js)

### Configuration Options

- **accessLog** &nbsp; _Object to pass with transports and their respective configurations_
- **levels** &nbsp; _Object containing the level definitions and their respective configurations_

> To see the **transport configuration options**, refer to the source of each of the transports (links above).

### Log Levels

To set a log level, add it in the `levels` option:

    app.use('logger', {
      accessLog: {console: true},   // By default, print access log to the console
      levels: {
        info: {console: true},      // Set to {console: true, file: 'info.log'} to log on stdout + file
        error: {console: true}      // Set to {console: true, file: 'error.log'} to log on stdout + file
      }
    });

Each level adds its own methods, which can be used to log messages. For example, the levels set on the example
code above, will set the following methods in the app singleton:

    app.infoLog(log);
    app.errorLog(log);
  
Each method accepts printf-like arguments. Additionally, the middleware sets events for the levels you
specify in the config. For example, the following events will be set with the config used above:
  
    info_log
    error_log

Custom functions can be hooked to the log events to manage the log data sent to each level.

## response_cache

Caches views into a specific storage backend.

### Configuration Options

- **storage** &nbsp; Resource string pointing to the storage backend to use, or Storage instance.

### Examples

    app.use('response_cache', {
      storage: 'redis'
    });
  
In this example, the 'redis' resource string points to the storage configuration
specified in `config/storage.js`.
  
### Usage example

    res.useCache('faq_cache');
    res.render('faq');
    
### Invalidating Caches

Caches are automatically flushed every time the application is started. This ensures the latest version of the cache is always
available, just in case the view contents have changed.

The middleware attaches itself into `app.response_cache`. This object contains all the caches set in the views when 
using `res.useCache(cacheID)`. Once a cache is stored, its ID is added to the `app.response_cache` object. This will prevent the cache from being regenerated. 

The `app.response_cache` object can be used to purge caches, just by deleting the respective cache key from it.

## session

Provides complete session management for applications.
  
### Configuration Options

- **guestSessions** &nbsp; _If set to true, will enable sessions for guest users_
- **regenInterval** &nbsp; _Interval to regenerate the sessionId (seconds)_
- **permanentExpires** &nbsp; _Permanent sessions timeout (seconds)_
- **temporaryExpires** &nbsp; _Temporary (browser) sessions timeout (seconds)_
- **guestExpires** &nbsp; _Guest sessions timeout (seconds)_
- **typecastVars** &nbsp; _Session properties to automatically typecast when loading session data_
- **sessCookie** &nbsp; _Default session cookie name_
- **hashCookie** &nbsp; _Default session hash name_
- **defaultUserAgent** &nbsp; _Default user agent when not set_
- **salt** &nbsp; _Salt used to generate session hashes_
- **storage** &nbsp; _Resource Path pointing to the Storage to use_


### Session Conventions

Protos can automatically detect if a user is logged in or not, depending on the values stored in the session. 

  > If the `user` property is present in the session data, the user is assumed to be logged in

When creating guest sessions, the session data will automatically set its default to `{guest: 1}`. This means the session
belongs to a guest user.

### Controller Authentication

When the Session middleware is enabled, the controllers start interpreting the `authRequired` property.

The `authRequired` property acts as the _first layer_ of the Controller Filters. This means, any controller already
set, won't be executed if the user is not logged in. That is, as long as `authRequired` is set to **true**.

Even if sessions are enabled, if `authRequred` is set to false, it won't have any effect on the controller, and any controller
filters will work normally.

> Sessions are automatically loaded when `authRequired` is set to **true**.

### Loading Sessions

Sessions are not loaded by defaul. Sessions are created and/or loaded exactly where specified.
This improves performance on the underlying storage server. The middleware provides fine grained control on which sections of the site
sessions are loaded or created. 

> Make sure to load sessions **whenever needed**, such as when using CSRF Tokens in forms.

There are three ways to load sessions:

**&bull; Manually:** &nbsp; Within the route callback, sessions can be loaded as such:

    get('/login', function(req, res) {
      app.session.loadSession(req, res, function() {
        res.json(req.session);
      });
    });

**&bull; Using the Route Callback: ** &nbsp; This is the preferred method. Do this when defining your routes, as such:

    get('/login', app.session.load, function(req, res) {
      res.json(req.session);
    });


**&bull; Using Controller Authentication:** &nbsp; when using the _authRequired_ property of the controller, sessions are automatically
loaded whenever a request hits the application. The middleware takes the necessary action if the user is not logged in.



### Creating Sessions

To create a session, do the following:

    // Determines if session will be persistent
    var pers = true;

    app.session.create(req, res, {user: "ernie"}, pers, function(session, hashes, expires) {
      res.json([session, hashes, expires]);
    });
    
The _request_ and _response_ objects must be specified. That is in case the user has tampered the session cookies
in some way, or the session data is invalid. This allows the session middleware to use the request and response objects to
automatically set and remove cookies, as well as redirect the users and send error messages.

The session can be either **persistent** or **temporary**, depending on the boolean value specified. The persistent value is
specified after the **session data**.

> To log in a user make sure the **user** field is set on the session data.

### Creating Guest Sessions

To create a guest session:

    app.session.createGuestSession(req, res, function(session, hashes, expires) {
      res.json([session, hashes, expires]);
    });

To create a session with initial data:

    app.session.createGuestSession(req, res, {visits: 0, banned: false}, function(session, hashes, expires) {
      res.json([session, hashes, expires]);
    });
    
It uses `app.session.create` behind the scenes to create the session. It automatically adds the `guest` property
to the data set to 1.

### Destroying sessions

To destroy a session (regardless if it's a user or guest session), do the following:

    app.session.destroy(req, res, function() {
      app.home(res);
    });


## static_server

Fully featured static server for applications, supporting Partial Content requests and Conditional GET.

The middleware reads static content from the application's `public/` directory.

### Configuration options

- **eTags** &nbsp; _If set to true, will include the default eTag header. If you specify a function as the value, it will be used to generate the eTag header_
- **acceptRanges** &nbsp; _If set to true (default), responds to partial content requests_

### Forcing File Download

The Middleware extends the _request_ objects and adds a `download` method, which forces the download of a file.

Here's how it's done:

    res.download(app.fullPath('/robots.txt'), 'robots.txt');


## aws

Amazon Web Services middleware. Provides clients to all of Amazon's web services (ES3, EC2, etc).

### References:

- https://github.com/SaltwaterC/aws2js<br/>
- https://github.com/SaltwaterC/aws2js/wiki/S3-Client<br/>
- https://github.com/SaltwaterC/aws2js/wiki/EC2-Client
  
### Configuration Options

- **accessKey** &nbsp; _AWS access key_
- **secretKey** &nbsp; _AWS secret key_
- **clients** &nbsp; _Object containing the clients to configure_
  
### Example:

    app.use('aws', {
      accessKey: 'username',
      secretKey: 'password',
      clients: {
        thumbs: {
          type: 's3',
          setBucket: 'my.cool.bucket',
        },
        cloud: {
          type: 'ec2',
          setRegion: 'ap-southeast-1'
        }
      }
    });
  
### Client Configuration
  
In the example above, each client configuration receives a 'type' property, which
is the AWS Client to use. For more info on the supported clients, refer to the
aws2js module documentation (link in References section).

The rest of the properties of each client configuration are the specific methods
supported by the client in question. In the example above (on the s3 client, thumbs)
the 'setBucket' option is set to 'my.cool.bucket'.

This is the same as manually running `s3.setBucket('my.cool.bucket')` after loading 
the aws client. In other words, the methods and arguments for the aws client are exposed
as properties. If the argument is passed as an array, then `Function.prototype.apply` will
be used to pass the arguments to the aws client.

Upon instantiation, each defined client will be available in `app.aws.{client}`. The clients
are instances of aws2js clients. For more info, consult the References section above.

## mq

Provides support for RabbitMQ or any other server that implements the AMQP protocol.

### References:

- https://github.com/postwait/node-amqp
- http://www.rabbitmq.com/documentation.html
- http://www.rabbitmq.com/man/rabbitmqctl.1.man.html
- http://www.rabbitmq.com/tutorials/amqp-concepts.html

### Configuration Options

- **server** &nbsp; _URL to connect to the amqp server_
- **defaultExchange** &nbsp; _Default exchange to use (if any)_
- **queues** &nbsp; _Queues to load. Can be either object with options or array_
- **exchanges** &nbsp; _Exchanges to load. Can be either object with options or array_
- **onBeforeCreate** &nbsp; _Callback to run before creating queues/exchanges (provides multi arg)_
- **onInitialize** &nbsp; _Callback to run after all queues &amp; exchanges have been initialized_

### Example

    app.use('mq', {
      server: 'amqp://localhost:5672',
      queues: ['my_queue'],
      exchanges: {
        alpha: {type: 'fanout'}
      },
      onInitialize: function(err, queues, exchanges) {
        app.log("MQ Initialized...");
        app.mq.queue('', function(err, q) {
          var counter = 0;
          q.bind(exchanges.alpha, '');
          q.subscribe(function(msg) {
            app.log("mq: " + msg.data.toString('utf8'));
          });
          setInterval(function() {
            counter++;
            exchanges.alpha.publish('', "Hello World! " + counter);
          }, 1000);
        });
      }
    });


## bcrypt

Provides Blowfish encryption capabilities for the application.

### References:

- https://github.com/ncb000gt/node.bcrypt.js<br/>
- http://codahale.com/how-to-safely-store-a-password
  
### Configuration Options

- **rounds** &nbsp; _Number of rounds to process the data for_
- **seedLength** &nbsp; _Seed length to pass to rand bytes_

### Examples

Password hashing and comparison occurs asynchronously. The following example shows how to hash a password:

    app.bcrypt.hashPassword(pass, function(err, hash) {
      console.exit(err || hash);
    });
    
And here's how to check a hashed password:

    app.bcrypt.checkPassword(password, hash, function(err, valid) {
      promise.emit('success', [hash, valid]);
    });

## magick

Provides an interface with the imagemagick CLI commands to perform image processing on the application. The middleware takes no options,
and is accessible via `app.magick`.


## mailer

Provides mail functionality to the application, with full unicode support. Serrves as an interface to [nodemailer](https://github.com/andris9/nodemailer).

### References

- http://github.com/andris9/nodemailer

### Configuration

The middleware receives an object, which contains the several transports to be configured for **nodemailer**.

The `default` configuration is required, since this will be the main transport used when calling the `app.mailer.sendMail()` method.

The following example shows how to configure the mailer:

    app.use('mailer, {
      default: 'sendmail',
      amazon: {
        ...
      },
      smtp: {
        ...
      }
    });

    app.mailer.sendMail({
      from: "Sender <name@domain.com>",
      to: "receiver@example.com",
      subject: "Hello",
      text: "Hello World",
      html: "<p>Hello World</p>"
    }, function(err, res) {
      doSomething();
    });
    
Each configuration object received, is compatible with the **nodemailer** transport configuration. For more info, refer to the
[nodemailer documentation](https://github.com/andris9/nodemailer).


## markdown

Provides markdown support for applications &amp; views.

### References

- https://github.com/chjj/marked
- https://github.com/theSmaw/Caja-HTML-Sanitizer
- http://code.google.com/p/google-caja/source/browse/trunk/src/com/google/caja/plugin/html-sanitizer.js

### Configuration Options

- **gfm** &nbsp; _Enable github flavored markdown (enabled by default)_
- **pedantic** &nbsp; _Conform to obscure parts of markdown.pl as much as possible_
- **sanitize** &nbsp; _Sanitize the output_
- **highlight** &nbsp; _A callback to highlight code blocks_

### View Helpers

- **$markdown** &nbsp; _Parses a markdown string. Alias of `Markdown::parse`_

### Example

    app.use('markdown');

    app.markdown.parse("__Some Markdown__ to be **rendered**");

### Usage example (EJS):

    <%- $markdown('## This is a **heading** level 2') %>

## production_url

Removes the port suffix from the application's url. 

This is useful if the application is running under a proxy, 
or if there are kernel level redirection rules (iptables).

## repl

Provides a REPL to interact with the application's runtime.

Whenever the application starts, a `repl.sh` script will be created automatically, which will open
the REPL, ready to run commands on the application's environment. When the application stops, the script
and socket will be automatically removed.

> the `socat` command is required to connect. Make sure it's installed on your OS

### Configuration Options

Note: _the socket and port options are exclusive, there can only be one, not both_

- **socket** &nbsp; _Path to a UNIX socket, relative to the application. Defaults to tmp/repl.sock_
- **port** &nbsp; _Use a port to connect instead of a socket_
- **maxConnections** &nbsp; _Maximum number of connections to allow_

## redirect

Redirect all application requests to a specific URL. 

An HTTP/400 Response will be sent on requests other than GET/HEAD.

### Example

    app.use('redirect', 'http://google.com');



## shortcode

Allows applications to filter content using shortcodes.

Shortcodes can be defined and used in any template engine. Functions are bound to the shortcode labels to modify the content 
wrapped within such shortcode. Spaces and line feeds are preserved.

Shortcodes keep the view code clean, by delegating string processing operations to separate functions.

### Example:

    var buffer = "Lorem [uppercase]ipsum[/uppercase] dolor sit [base64]AMET[/base64] et sempis";

    buffer = app.shortcode.replace(buffer, {
      uppercase: function(str) {
        return str.toUpperCase();
      }, 
      base64: function(str) {
        return new Buffer(str).toString('base64');
      }
    });

    console.exit(buffer); // returns: "Lorem IPSUM dolor sit QU1FVA== et sempis"


## socket_io

Provides socket.io support for applications. The middleware acts as an automatic
and convenient configuration of socket.io, supporting namespaces.

### References

- https://github.com/learnboost/socket.io
- https://github.com/LearnBoost/socket.io-spec
- https://github.com/LearnBoost/Socket.IO/wiki/Configuring-Socket.IO

### Provides

- **app.io** &nbsp; _SocketIO server, listening on the application's port_
- **app.sockets** &nbsp; _Contains all the SocketIO namespaces, ready to use & configured_

### Configuration options

- **settings** &nbsp; _Settings to pass to the socket on initialization_
- **sockets** &nbsp; _Contains socket namespaces as {name: endpoint}_
- **environments** &nbsp; _Object containing callbacks that will run on each application environment_

### Example

    app.use('socket_io', {
      settings: {
        log: true,
        heartbeats: true,
        'log level': 1
      },
      sockets: {
        chat: '/chat',
        news: '/news'
      },
      environments: {
        development: function(io) {
          // Code to run on development
        },
        production: function(io) {
          // Code to run on production
        }
      }
    });

[/markdown]
