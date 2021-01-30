const aws = require('aws-sdk')
const dynamoose = require('dynamoose')

exports.handler =  async function(event, context) {
  const IpAddress = dynamoose.model('badips', { ipaddress: String })

  let badIpAddresses = []

  /*
  We set defaults based on the handler
  */
  let responseCode = 200
  let message = 'Unable to parse POST input'

  if (event.body !== null && event.body !== undefined) {
    message = 'Here is the body'
    body = JSON.parse(event.body)

    const ipAddresses = body['ip_addresses']

    for(let ipAddress of ipAddresses) {
      const badIp = await IpAddress.get(ipAddress)

      if (badIp) {
        badIpAddresses.push(badIp)
      }
    }
  }

  responseBody = {
    message: message,
    bad_ip_addresses: badIpAddresses
  }

  let response = {
    statusCode: responseCode,
    body: JSON.stringify(responseBody)
  }

  return response
}