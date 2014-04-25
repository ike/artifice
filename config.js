{

  "host": "0.0.0.0",
  "port": 7777,

  "keyLength": 10,

  "staticMaxAge": 86400,

  "recompressStaticAssets": true,

  "logging": [
    {
      "level": "verbose",
      "type": "Console",
      "colorize": true
    }
  ],

  "keyGenerator": {
    "type": "phonetic"
  },

  "storage": {
    "type": "file",
    "path": "/var/local/artifices"
  },

  "documents": {
    "about": "./about.md"
  }

}
