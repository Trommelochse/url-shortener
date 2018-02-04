var express = require('express')
var app = express()

// config app
app.use(express.static('public'))

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// set up database
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_PATH)

const db = mongoose.connection
db.once('open', () => console.log('connected to database'))

// import models
const Entry = require('./models/entry.js')

// import helpers
const guid = require('./lib/guid')
const isUrl = require('./lib/isUrl')
   
// handle requests
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

app.post("/new", function (req, res) {
  const { url } = req.body
  if (!isUrl(url)) {
    res.send('Invalid Request - Please specify a valid URL')
  }
  else {
    const entry = new Entry({ guid: guid(), url })
    entry.save()
      .then(entry => res.json({
      url: entry.url,
      short_url: `https://xxs-url.glitch.me/${entry.guid}`,
      guid: entry.guid
    }))
      .catch(err => res.json(err))
  }
})

app.get('/:guid', (req, res) => {
  const { guid } = req.params
  Entry.findOne({ guid }, (err, entry) => {
    if (err) { res.SendStatus(500) }    
    else { res.redirect(entry.url) }
  })
})

// listen...
var listener = app.listen(process.env.PORT, function () {
  console.log('Listening on: ' + listener.address().port)
})
