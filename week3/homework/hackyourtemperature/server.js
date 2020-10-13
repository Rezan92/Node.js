const express = require("express");
const axios = require("axios");
const exphbs = require('express-handlebars');
const API_KEY = require('./sources/keys.json').API_KEY;

const app = express();

app.use(express.static("public"));

const hbs = exphbs.create({
  defaultLayout: false,
  helpers: {
    convertTime : function(unixTimestamp){
      const dateObject = new Date(unixTimestamp*1000);
      const time = dateObject.toLocaleString("en-US", {timeZoneName: "short"}).slice(12,16);
      const ext = dateObject.toLocaleString("en-US", {timeZoneName: "short"}).slice(20,22);
      const month = dateObject.toString().slice(4,10);
    return `${time} ${ext}, ${month}`; 
    }
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/weather", async (req, res) => {
  const cityName = req.body.cityName;
  try {
    const response = await axios(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&APPID=${API_KEY}`);
    const text = await response.data;
    res.render("index", text);
  } catch (error) {
    console.log(error);
    res.render("index", { weatherText: "Please enter a valid city name and try again." });
  }

})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});