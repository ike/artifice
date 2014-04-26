var auth = require('basic-auth');

var EnvironmentAuth = function (options) {
  this.env = options.env || 'HASTEBIN_USERS';
  this.handlers = options.handlers || {set: true};
  this.realm = options.realm || 'Hastebin';
  this.users = {};
  process.env[this.env].split(',').forEach(function (user) {
    this.users[user.split(':')[0]] = user.split(':')[1];
  }, this);
};

EnvironmentAuth.prototype._auth = function(request) {
  var credentials = auth(request);
  return credentials && this.users[credentials.name] === credentials.pass;
};

EnvironmentAuth.prototype.set = function(request, response, done) {
  if (!this.handlers.set || this._auth(request)) {
    return done();
  }
  response.writeHead(401, { 'content-type': 'application/json', 'WWW-Authenticate': 'Basic realm=' + this.realm });
  response.end(JSON.stringify({ message: 'Unauthorized' }));
};

EnvironmentAuth.prototype.get = function (request, response, done) {
  if (!this.handlers.set || this._auth(request)) {
    return done();
  }
  response.writeHead(401, { 'content-type': 'application/json', 'WWW-Authenticate': 'Basic realm=' + this.realm });
  response.end(JSON.stringify({ message: 'Unauthorized' }));
};

module.exports = EnvironmentAuth;
