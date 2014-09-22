{
  "host": "localhost",
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
    "type": "level",
    "db": "artifices"
  },
  "auth": {
    "type": "environment",
    "env": "ARTIFICERS",
    "realm": "Artifice"
  },
  "documents": {
    "about": "./about.md"
  }
}
