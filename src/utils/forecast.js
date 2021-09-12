const request = require("postman-request");

const forecast = (latitude, longitude, cb) => {
  const url = `http://api.weatherstack.com/current?access_key=3a111df34fb03bd85a8b669440f5c08a&query=${latitude},${longitude}`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      cb(error.info);
    } else if (response.body.error) {
      cb(response.body.error);
    } else {
      const { temperature, feelslike } = response.body.current;
      cb(undefined, {
        temperature,
        feelslike,
      });
    }
  });
};

module.exports = forecast;
