const geo = require('geoip-lite')

const config = require('../utils/config')
const peerStatus = require('./peerStatus')

/*
  peer: {id: String, ip: String, address: String, location: [lat(float),lng(float)]}
*/
var selfLocation = null
const selfLookup = geo.lookup(config.IP)
selfLocation = selfLookup ? selfLookup.ll : [0,0]

module.exports = {
  addPeer,
  removePeer
}

var peers = []

function sortPeers () {
  peers = peers.sort((a, b) => a.distance - b.distance)
}

function addPeer (address) {
  const peer = {ip: address.split(':')[0], address}
  const lookup = geo.lookup(peer.ip)
  peer.location = lookup ? lookup.ll : selfLocation
  peer.distance = geoDistance(peer.location, selfLocation)
  peers.push(peer)
  sortPeers()
}

function removePeer (ip) {
  peers = peers.filter(peer => peer.ip !== ip)
}

function getRandomPeer () {
  const lowerBound = Math.floor(peers.length / 3)
  const count = peers.length - lowerBound
  return peers[lowerBound + Math.floor(Math.random()*count)]
}

async function getRandomUsablePeer (bytesize) {
  for (let i = 0; i<peers.length; i++) {
    const peer = getRandomPeer()
    const usable = await peerStatus.hasSpace(peer.address, bytesize)
    if (usable)
      return peer
  }
  throw new Error('no usable peer found')
}


function geoDistance(a, b) {
  const lat1 = a[0]
  const lon1 = a[1]
  const lat2 = b[0]
  const lon2 = b[1]
  var p = 0.017453292519943295;
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a));
}