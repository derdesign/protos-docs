YAHOO.env.classMap = {"storage.MongoStorage": "storages", "Storage": "lib", "engine.Haml": "engines", "engine.Swig": "engines", "engine.HamlCoffee": "engines", "engine.Liquor": "engines", "engine.Whiskers": "engines", "engine.Jazz": "engines", "engine.Jade": "engines", "http.OutgoingMessage": "lib", "storage.RedisStorage": "storages", "engine.JsHtml": "engines", "engine.Dot": "engines", "engine.CoffeeKup": "engines", "http.IncomingMessage": "lib", "driver.MySQL": "drivers", "driver.PostgreSQL": "drivers", "engine.EJS": "engines", "Validator": "lib", "engine.Kernel": "engines", "engine.Handlebars": "engines", "Application": "lib", "engine.Hogan": "engines", "ModelObject": "lib", "driver.MongoDB": "drivers", "Protos": "lib", "engine.Eco": "engines", "engine.Plain": "engines", "engine.JqueryTemplate": "engines", "Utility": "lib"};

YAHOO.env.resolveClass = function(className) {
    var a=className.split('.'), ns=YAHOO.env.classMap;

    for (var i=0; i<a.length; i=i+1) {
        if (ns[a[i]]) {
            ns = ns[a[i]];
        } else {
            return null;
        }
    }

    return ns;
};
