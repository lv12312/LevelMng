var levelup = require('levelup')
var leveldown = require('leveldown')
var memdown = require('memdown')
const metaDBName = 'metaDatabase'
const databaseDir = './'
const DATA_DIR = './databases/'
const tablesKey = 'database'


module.exports = {
  getMetaDatabase: function (req, res, next) {
    var db = levelup(databaseDir + metaDBName, {valueEncoding: 'json'})
    db.get(tablesKey, function (err, value) {
      if (err) {
        if (err.notFound) {
          db.close()
          res.json([])
          return
        }

      }
      db.close()
      res.json(value)
    })
  },
  addDatabase: function (req, res, next) {
    let name = req.body['name']
    let type = req.body['type']
    let description = req.body['description']

    var db = levelup(databaseDir + metaDBName, {valueEncoding: 'json'})
    db.get(tablesKey, function (err, value) {
      if (err) {
        if (err.notFound) {
          // handle a 'NotFoundError' here
          var saveData = []
          saveData.push({
            name,
            type,
            description
          })

          db.put(tablesKey, saveData, function (err) {
            if (err) {
              next(err)
              return
            }
            db.close()
            res.json({
              success: true,
              msg: 'Create success.'
            })
            return
          })
        }
      } else {
        if (!value || value === null) {
          value = []
        }
        value.push({
          name,
          type,
          description
        })

        db.put(tablesKey, value, function (err) {
          if (err) {
            next(err)
            return
          }
          db.close()
          res.json({
            success: true,
            msg: 'Create success.'
          })
        })
      }
    })
  },
  deleteDatabaseMeta: function (req, res, next) {
    var db = levelup(databaseDir + metaDBName, {valueEncoding: 'json'})
    db.del(tablesKey, function (err) {
      if (err) {
        db.close()
        next(err)
        return
      }
      db.close()
      res.json({
        success: true,
        msg: 'Delete success.'
      })
    })
  },
  deleteDatabase: function (req, res, next) {
    const name = req.body['name']
    const db = levelup(databaseDir + metaDBName, {valueEncoding: 'json'})
    db.get(tablesKey, function (err, value) {
      if (err) {
        if (err.notFound) {
          db.close()
          res.json({
            success: true,
            msg: 'Delete success.'
          })
        }
      } else {
        if (!value || value === null) {
          value = []
        }
        for (var i = 0; i < value.length; i++) {
          if (value[i]['name'] == name) {
            value.splice(i, 1);
            break;
          }
        }
        db.put(tablesKey, value, function (err) {
          if (err) {
            next(err)
            return
          }
          db.close()
          res.json({
            success: true,
            msg: 'Delete success.'
          })
        })
      }
    })
  },
  addData: function (req, res, next) {
    const name = req.query['databaseName']
    const key = req.query['key']
    const inputValue = req.query['value']
    const db = levelup(databaseDir + metaDBName, {valueEncoding: 'json'})
    db.get(tablesKey, function (err, value) {
      db.close()
      if (err) {
        if (err.notFound) {
          res.json({
            success: false,
            msg: 'Meta Database error.'
          })
        }
      } else {
        if (!value || value === null) {
          value = []
        }
        let hasDatabase = false
        let opsDatabase = {}
        for (var i = 0; i < value.length; i++) {
          if (value[i]['name'] == name) {
            hasDatabase = true
            opsDatabase = value[i]
            break;
          }
        }

        if (!hasDatabase) {
          res.json({
            success: false,
            msg: 'No database.' + name
          })
        } else {
          const database = opsDatabase['type'] == 'LevelDOWN' ? levelup(DATA_DIR + name, {
            valueEncoding: 'json',
            'db': leveldown
          }) :
            levelup(DATA_DIR + dataDir, {
              valueEncoding: 'json',
              'db': memdown})

          database.put(key, inputValue, function (error) {
            database.close()
            if (error) {
              next(error)
              return
            }
            res.json({
              success: true,
              msg: 'put success.'
            })
          })
        }
      }
    })
  }
}
