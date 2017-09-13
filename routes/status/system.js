module.exports.handler = async function (req, res) {
  res.send(await run())
}

module.exports.run = run
async function run () {
  return {Status: 1}
}