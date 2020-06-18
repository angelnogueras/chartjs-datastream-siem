const eg = require('../EdgeGrid').eg_si
require('dotenv').config()

const SIEM_CFG_ID = process.env.SIEM_CFG_ID
const SIEM_HOURS = process.env.SIEM_HOURS

module.exports = (callback) => {
  // Calculate Last WINDOW_HOURS hours
  const one_hour_ago = Date.now()/1000 - SIEM_HOURS*3600

  const api_endpoint = `/siem/v1/configs/${SIEM_CFG_ID}?from=${one_hour_ago}`

  eg.auth({
    path: api_endpoint,
    method: 'GET',
    headers: {
      'Content-Type': "application/json"
    },
    body: ''
  })

  eg.send( (error, response, body) => {
    // WARNING: Maybe you want to improve error handling
    let err
    if (response.statusCode != 200) {
      console.log(`Something went wrong calling SIEM Integration API. StatusCode: ${response.statusCode}`)
      err = {status: response.statusCode}
    }
    callback(body, err)
  })

}
