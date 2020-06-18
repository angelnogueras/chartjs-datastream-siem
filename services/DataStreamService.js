const eg = require('../EdgeGrid').eg_ds
const moment = require('moment')
require('dotenv').config()

// Aggregated DataStream ID
const STREAM_ID = process.env.STREAM_AGG_ID

// WARNING: Simple example for testing pusposes. Getting only 1st page
const PAGE = 1
const SIZE = 100
const DT_PATTERN = 'YYYY-MM-DDTHH:mm:ss[Z]'
const WINDOW_HOURS = process.env.STREAM_WINDOW_HOURS

module.exports = (callback) => {
  // Calculate Last WINDOW_HOURS hours
  const now = moment()
  const END = now.format(DT_PATTERN)
  const START = now.subtract(WINDOW_HOURS, 'hours').format(DT_PATTERN)

  const api_endpoint = `/datastream-pull-api/v1/streams/${STREAM_ID}/aggregate-logs?start=${START}&end=${END}`

  eg.auth({
    path: api_endpoint,
    method: 'GET',
    headers: {
      'Content-Type': "application/json"
    },
    body: ''
  })

  eg.send( (error, response, body) => {
    // WARNING: Maybe you want to improve error handling ;)
    let err
    if (response.statusCode != 200) {
      console.log(`Something went wrong calling DS API. StatusCode: ${response.statusCode}`)
      err = {status: response.statusCode}
    }
    callback(body, err)
  })

}
