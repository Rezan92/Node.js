const express = require("express");
const exphbs  = require('express-handlebars');

const app = express();

app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ defaultLayout: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/weather", (req, res) => {
  const cityName = req.body.cityName
  res.send(cityName)
})

const PORT = process.env.PORT || 3000 ;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});