const express = require('express')
const app = express()

const config = require('./utils/config')
const status_routes = require('./routes/status')
const webui_routes = require('./routes/webui')

app.set('view engine', 'html')
app.set('layout', 'layout')
process.env.NODE_ENV === "production" && app.enable('view cache')
app.engine('html', require('hogan-express'))
app.use('/static', express.static('static'))

app.use('/api/status', status_routes)
app.use('/webui', webui_routes)

app.listen(config.PORT, () => {
  console.info('Server is running on Port ' + config.PORT)
})