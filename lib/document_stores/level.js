var levelup = require('level');
var ttl = require('level-ttl');
var winston = require('winston');

//For storing in level
// options[type] - level
// options[db] - The db name (default ./leveldb)
// options[expire] - The time to live for each key set (default never)

// Create a new store with options
var LevelDocumentStore = function (options, client) {
  this.expire = options.expire || 0;
  if (client) {
    winston.info('using predefined level client');
    LevelDocumentStore.client = client;
  } else if (!LevelDocumentStore.client) {
    winston.info('configuring level');
    LevelDocumentStore.connect(options);
  }
};

// This is painful the stores should be async
LevelDocumentStore.queue = [];

// Open the database according to the config
LevelDocumentStore.connect = function (options) {
  var db = options.db || './level.db';
  var q;
  var _this = this;
  levelup(db, function (err, c) {
    if (err) {
      winston.error(
        'error connecting to level db ' + db,
        { error: err }
      );
      process.exit(1);
    } else {
      LevelDocumentStore.client = ttl(c);
      winston.info('connected to level db ' + db, LevelDocumentStore.client);
    }
    while (LevelDocumentStore.queue.length > 0) { //Drain the queue
      q = LevelDocumentStore.queue.pop();
      LevelDocumentStore.prototype.set.apply(_this, q);
    }
  });
};

// Save file in a key
LevelDocumentStore.prototype.set = function (key, data, callback, skipExpire) {
  if (!LevelDocumentStore.client) { //Queue till connected
    return LevelDocumentStore.queue.push([key, data, callback, skipExpire]);
  }
  LevelDocumentStore.client.put(key, data, {ttl: ttl}, function (err) {
    callback(!err);
  });
};

//Expire a key in expire time if set
LevelDocumentStore.prototype.setExpiration = function(key) {
  if (this.expire) {
    LevelDocumentStore.client.ttl(key, this.expire, function (err) {
      if (err) {
        winston.error('failed to set expiry on key: ' + key);
      }
    });
  }
};

// Get a file from a key
LevelDocumentStore.prototype.get = function (key, callback, skipExpire) {
  var _this = this;
  if (!LevelDocumentStore.client) { //Not connected yet, just return nothing I guess ;(
    return callback(false);
  }
  LevelDocumentStore.client.get(key, function (err, reply) {
    if (!err && !skipExpire) {
      _this.setExpiration(key);
    }
    callback(err ? false : reply);
  });
};

module.exports = LevelDocumentStore;
