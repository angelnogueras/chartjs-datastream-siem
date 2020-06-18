const b64decode = (data) => {
  let buff = new Buffer(data, 'base64')
  let text = buff.toString('ascii')
  return text
}

const splitB64 = (data) => {
  const arr = data.split(';')
  const ret = []
  arr.forEach( el => {
    ret.push( b64decode(el) )
  })
  return ret.join(';')
}

const decodeSI = (data) => {
  return splitB64(decodeURIComponent(data))
}

const convertHeaders = (data) => {
  return decodeURIComponent(data)
}

module.exports = {decodeSI, convertHeaders}