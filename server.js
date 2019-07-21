const bodyParser = require('body-parser')
const cors = require('cors')
const crypto = require('crypto')
const exec = require('child_process').exec
const dotenv = require('dotenv')
const express = require('express')

dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const validateRequest = (body, headers) => {
  const payload = JSON.stringify(body)
  const hmac = crypto.createHmac('sha1', process.env.SECRET)
  const digest = 'sha1=' + hmac.update(payload).digest('hex')

  return digest === headers['x-hub-signature']
}

app.post('/', (req, res) => {
  if (validateRequest(req.body, req.headers) && req.body.ref === 'refs/heads/master') {
    exec('cd ~/apps/sm-api && git pull origin master && nvm use && npm install && pm2 restart sm-api')
  }

  res.send()
})

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`repo-webhook running on port ${port}`)
})
