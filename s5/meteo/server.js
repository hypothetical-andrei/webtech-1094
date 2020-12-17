const express = require('express')
const fetch = require('node-fetch')

const app = express()

app.use(express.static('public'))

app.get('/weather', async (req, res) => {
  try {
    const response = await fetch('http://www.meteoromania.ro/wp-json/meteoapi/v2/starea-vremii')
    const responseContent = await response.json()
    if (req.query.city) {
      const cityRecord = responseContent.features.find(e => e.properties.nume.indexOf(req.query.city.toUpperCase()) !== -1)
      if (cityRecord) {
        res.status(200).json(cityRecord)
      } else {
        res.status(404).json({ message: 'not found' })
      }
    } else {
      res.status(200).json(responseContent)
    }
  } catch (err) {
    console.warn(err)
    res.status(500).json({ message: 'server error' })
  }
})

app.listen(8080)