const axios = require("axios");

exports.handler = async function (event, context) {
  console.log(event);
  console.log(context);
  try {
    const { from_to } = event.queryStringParameters;
    const response = await axios.get(`https://free.currconv.com/api/v7/convert?q=${from_to}&compact=ultra&apiKey=${process.env.REACT_APP_API_KEY}`);
    return {
      statusCode: 200,
      body: JSON.stringify({ title: response.data.title }),
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};