var levelup = require('levelup')
const metaDBName = 'metaDatabase'
const databaseDir = './'
const tablesKey = 'database'

module.exports = {
  getMetaDatabase: function (req, res, next){
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
      }else {
        if(!value || value === null) {
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
  deleteDatabaseMeta: function (req, res, next){
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
  }
}
