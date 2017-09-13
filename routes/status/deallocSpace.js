const diskManager = require('../../utils/diskManager')

module.exports.handler = function (req, res) {
  if (!req.query.bytes)
    return res.status(400).send('No byte count given')
  res.send(run(req.query.bytes))
}

module.exports.run = run
function run (bytes) {
  diskManager.removePendingBytes(bytes)
  return true
}