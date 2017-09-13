module.exports = {
  PORT: getEnvInt('PORT'),
  INTERNAL_KEY: getEnvString('INTERNAL_KEY'),
  PUBLIC_KEY_HASH: getEnvString('PUBLIC_KEY_HASH'),
  SERVERS: getEnvJson('SERVERS')
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