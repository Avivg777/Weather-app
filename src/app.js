const path = require("path");
const express = require("express");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;
const publicDirPath = path.join(__dirname, "../public");

app.use(express.static(publicDirPath));

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({ error: "You must provide an address query." });
  }

  geocode(address, (error, data) => {
    if (error) {
      return res.send({ error });
    } else {
      forecast(data.latitude, data.longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        } else {
          res.send({
            forecast: forecastData,
            location: data.location,
            address,
          });
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
