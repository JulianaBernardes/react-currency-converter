const fetch = require('node-fetch');

const apiKey = process.env.REACT_APP_API_KEY;

exports.handler = async function(event, context) {
  try {
    const { from_to } = event.queryStringParameters || {};
    if (!from_to) {
      return { statusCode: 400, body: "Missing query parameters" };
    }
    //const uri = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}`;
    let uri = `https://free.currconv.com/api/v7/convert?q=${from_to}`

    const response = await fetch(`${uri}&compact=ultra&apiKey=${apiKey}`);
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.log("invocation error:", err); // output to netlify function log
    return {
      statusCode: 500,
      body: err.message // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
