const uuid = require('uuid/v4')
const fs = require('fs')
const joinPath = require('path').join
const promisify = require('util').promisify

module.exports = {
  ID: getId(),
  IP: getIp(),
  PORT: getEnvInt('PORT'),
  INTERNAL_KEY: getEnvString('INTERNAL_KEY'),
  PUBLIC_KEY_HASH: getEnvString('PUBLIC_KEY_HASH'),
  SERVERS: getEnvJson('SERVERS'),
  FILE_PATH: getEnvString('FILE_PATH')
}

function getEnvString (name) {
  return getEnvVar(name)
}

function getEnvInt (name) {
  const v = getEnvVar(name)
  return parseInt(v)
}

function getEnvJson (name) {
  const v = getEnvVar(name)
  return JSON.parse(v)
}

function getEnvVar (name) {
  if (!process.env[name]) {
    throw new Error('ENV VAR "' + name + '" not set.')
  }
  return process.env[name]
}

function getId () {
  const data = getData()
  return data.id
}

var _data = null
function getData () {
  if (_data) {
    return _data
  }
  if (fs.existsSync(joinPath(__dirname, 'data.json'))) {
    _data = JSON.parse(fs.readFileSync(joinPath(__dirname, 'data.json'), 'utf8'))
    return _data
  } else {
    setData({
      id: generateId()
    })
    return _data
  }
}
function setData (data) {
  _data = data
  fs.writeFileSync(joinPath(__dirname, 'data.json'), JSON.stringify(_data))
}

function generateId () {
  let id = uuid().split('-').join('')
  return Buffer.from(id, 'hex').toString('base64')
}

function getIp () {
  var ifconfig = require('os').networkInterfaces();
  var device, i, I, protocol;
  for (device in ifconfig) {
    if (device.indexOf('lo') !== -1 || !ifconfig.hasOwnProperty(device)) {
      continue;
    }
    for (i=0, I=ifconfig[device].length; i<I; i++) {
      protocol = ifconfig[device][i];
      if (protocol.family === 'IPv4' && protocol.internal === false) {
        return protocol.address;
      }
    }
  }
  throw new Error('No IP address for this device found')
}