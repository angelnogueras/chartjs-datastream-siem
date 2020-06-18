'use strict'

const express = require('express')
const open = require('open')
const app = express()
const port = 3000
const DataStreamService = require('./services/DataStreamService')
const SiemIntegrationService = require('./services/SiemIntegrationService')
const {decodeSI, convertHeaders} = require('./helpers/SiemDecoder')

/* Static content folder */
app.use(express.static('public'))

/* Remove X-Powered-By response header */
app.disable('x-powered-by')

/* Proxy just in case we want to add/remove headers to response */
app.use((req, res, next) => {
    //res.append('Access-Control-Allow-Origin', ['*'])
    //res.removeHeader("Server")
    next();
});

/**
 * Root endpoint
 */
app.get('/', (req, res) => {
  res.status(404).json({statusCode: 404, message: "What are you doing here? :)"})
})

/**
 * DataStream Aggregated Data endpoint
 */
app.get('/ds', (req, res) => {
  DataStreamService( (content, error) => {
    if (error !== undefined) {
      res.status(error.status)
    }
    else {
      let jsonContent = {"data": []}
      if (content) {
        jsonContent = JSON.parse(content)
        if ("metadata" in jsonContent) {
          delete jsonContent.metadata
        }
      }
      res.json(jsonContent)
    }
  })
})

/**
 * SIEM Integration api call
 */
app.get('/siem_info', (req, res) => {
  SiemIntegrationService( (content, error) => {
    if (error !== undefined) {
      res.status(error.status)
    }
    else {
      // Parse each line as a new JSON object (except the last one with metadata
      // that will not contain "attackData" and "httpMessage" elements
      const arrContent = content.split(/\r?\n/)
      const jsonContents = []
      arrContent.forEach( el => {
        if (!el) { return }
        let elem = JSON.parse(el)
        let attackData = elem.attackData
        let httpMessage = elem.httpMessage
        if (attackData && httpMessage) {
          attackData.rules = decodeSI(attackData.rules)
          attackData.ruleVersions = decodeSI(attackData.ruleVersions)
          attackData.ruleMessages = decodeSI(attackData.ruleMessages)
          attackData.ruleTags = decodeSI(attackData.ruleTags)
          attackData.ruleData = decodeSI(attackData.ruleData)
          attackData.ruleSelectors = decodeSI(attackData.ruleSelectors)
          attackData.ruleActions = decodeSI(attackData.ruleActions)

          httpMessage.requestHeaders = convertHeaders(httpMessage.requestHeaders)
          httpMessage.responseHeaders = convertHeaders(httpMessage.responseHeaders)

          jsonContents.push(elem)
        }
      });
      res.json(jsonContents)
    }
  })
})

/* Start server */
app.listen(port, () => {
  console.log('\x1b[33m%s\x1b[0m', `Report console App listening on port ${port}!`)
  open(`http://localhost:${port}/`)
})
