const promisify = require('util').promisify
const diskusage = promisify(require('diskusage').check)

const config = require('./config')

module.exports = {
  getAvailableSpace,
  addPendingBytes,
  removePendingBytes
}

let pendingBytes = 0

async function getAvailableSpace () {
  const diskSpace = await diskusage(config.FILE_PATH)
  return diskSpace.available - pendingBytes
}

function addPendingBytes (bytes) {
  pendingBytes += bytes
}

function removePendingBytes (bytes) {
  pendingBytes -= bytes
  pendingBytes = pendingBytes >= 0 ? pendingBytes : 0
}