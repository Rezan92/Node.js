const { Console } = require('console');
const express = require('express')
const app = express();
const fs = require("fs")
const path = require("path")

// YOUR CODE GOES IN HERE
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello world")
})

app.get('/blogs', function (req, res) {
  fs.readdir(path.join(__dirname, "blogs"), "utf8", (error, content) => {
    if (error) console.log(error);
    res.send(content);
  });
});

app.get("/blogs/:title", (req, res) => {
  if (checkIfexist(req.params.title)) {
    fs.readFile(getFilesPath(req.params.title), "utf8", (error, content) => {
      if (error) console.log(error);
      res.send(content);
    });
  } else {
    res.status(400)
      .send(`Sorry! Blog with "${req.params.title}" title is not exist`);
  };
});

app.post("/blogs", (req, res) => {
  if (checkIfexist(req.body.title)) {
    res.status(400)
      .send(`Sorry! A blog with "${req.body.title}" title is already exist, please try with anohter title`);
  } else {
    fs.writeFile(getFilesPath(req.body.title), req.body.content, (error) => {
      console.log(error);
    });
    res.send("Ok");
  };
});

app.put("/posts/:title", (req, res) => {
  if (checkIfexist(req.params.title)) {
    fs.writeFile(getFilesPath(req.params.title), req.body.content, (error) => {
      console.log(error);
    });
    res.send("Ok");
  } else {
    res.status(400)
      .send(`Sorry! Blog with "${req.params.title}" title is not exist`);
  };
});

app.delete('/blogs/:title', (req, res) => {
  if (checkIfexist(req.params.title)) {
    fs.unlink(getFilesPath(req.params.title), function (err) {
      if (err) throw err;
      res.send("Ok");
    });
  } else {
    res.status(400)
      .send(`Sorry! You can't delete a none existent blog, "${req.params.title}" is not exist`);
  };
});

function getFilesPath(title) {
  return path.join(__dirname, "blogs", title);
};

function checkIfexist(title) {
  const blog = fs.existsSync(path.join(__dirname, "blogs", title));
  return blog;
};

app.listen(3000);