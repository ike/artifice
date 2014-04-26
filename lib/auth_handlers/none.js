var auth = require('basic-auth');

var winston = require('winston');

var NoneAuth = function () {
};

EnvironmentAuth.set = function(request, response, done) {
  done();
};

EnvironmentAuth.get = function (request, response, done) {
  done();
};

module.exports = NoneAuth;
