const diskManager = require('../../utils/diskManager')

module.exports.handler = async function (req, res) {
  if (!req.query.bytes)
    return res.status(400).send('No byte count given')
  res.send(await run(req.query.bytes))
}

module.exports.run = run
async function run (bytes) {
  const space = await diskManager.getAvailableSpace()
  if (space >= bytes) {
    diskManager.addPendingBytes(bytes)
    return true
  }
  return false
}