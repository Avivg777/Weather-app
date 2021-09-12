const request = require("postman-request");
const chalk = require("chalk");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYXZpdmNvbmNpb3VzIiwiYSI6ImNqemZ6a204MDBoYjAza2xpdHAwNzlhMjkifQ.E3vN8eBlDWD7r7yMxh6-1Q&limit=1`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback(error);
    } else if (!response.body.features.length) {
      callback(chalk.red.bold("Unable to find location. try another search."));
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
