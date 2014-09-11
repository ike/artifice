var NoneAuth = function () {
};

NoneAuth.prototype.set = function(request, response, done) {
  done();
};

NoneAuth.prototype.get = function (request, response, done) {
  done();
};

module.exports = NoneAuth;
