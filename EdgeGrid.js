require('dotenv').config()
const path = require('path')
const homedir = require('os').homedir()
const Edgegrid = require('edgegrid')


const eg_ds = new Edgegrid({
  path: path.join(homedir, '.edgerc'),
  section: process.env.SECTION_DS
})

const eg_si = new Edgegrid({
  path: path.join(homedir, '.edgerc'),
  section: process.env.SECTION_SI
})

module.exports = {eg_ds, eg_si}
