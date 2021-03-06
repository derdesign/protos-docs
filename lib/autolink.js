
// https://github.com/bryanwoods/autolink-js

// Generated by CoffeeScript 1.3.3
(function() {
  var autoLink,
    __slice = [].slice;

  autoLink = function() {
    var callback, callbackOption, key, link_attributes, option, options, url_pattern, value;
    options = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    url_pattern = /(^|\s)(\b(https?):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|]\b)/ig;
    if (options.length > 0) {
      option = options[0];
      callbackOption = option.callback;
      if ((callbackOption != null) && typeof callbackOption === 'function') {
        callback = callbackOption;
        delete option.callback;
      }
      link_attributes = '';
      for (key in option) {
        value = option[key];
        link_attributes += " " + key + "='" + value + "'";
      }
      return this.replace(url_pattern, function(match, space, url) {
        var link, returnCallback;
        returnCallback = callback && callback(url);
        link = returnCallback || ("<a href='" + url + "'" + link_attributes + ">" + url + "</a>");
        return "" + space + link;
      });
    } else {
      return this.replace(url_pattern, "$1<a href='$2'>$2</a>");
    }
  };

  String.prototype['autoLink'] = autoLink;

}).call(this);