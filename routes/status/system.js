const diskManager = require('../../utils/diskManager')

module.exports.handler = async function (req, res) {
  res.send(await run())
}

module.exports.run = run
async function run () {
  const ret = {
    space: await diskManager.getAvailableSpace()
  }
}