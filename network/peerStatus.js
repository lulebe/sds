const axios = require('axios')

const config = require('../utils/config')

module.exports = {
  isAvailable,
  hasSpace
}

async function isAvailable (address) {
  try {
  const req = axios.get(address + '/api/status', {
    headers: {
      Authorization: config.INTERNAL_KEY
    }
  })
  const res = await req
  if (!res.data || res.data.space <= 0) return false
  return true
  } catch (e) {
    return false
  }
}

async function hasSpace (address, bytesize) {
  try {
    const req = axios.get(address + '/api/status', {
      headers: {
        Authorization: config.INTERNAL_KEY
      }
    })
    const res = await req
    if (!res.data || res.data.space < bytesize) return false
    return true
    } catch (e) {
      return false
    }
}