const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const res = require("express/lib/response");

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const port = 3000;
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});

app.get("/", (req, res) => {
  res.render("index", { Hactive: "active" });
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/courses", (req, res) => {
  res.render("courses", { Cactive: "active" });
});

app.get("/course", (req, res) => {
  res.render("course");
});

app.get("/courseinfo", (req, res) => {
  res.render("courseinfo");
});

app.get("/business", (req, res) => {
  res.render("business");
});

app.get("/edudetails", (req, res) => {
  res.render("education");
});

app.get("/help", (req, res) => {
  res.render("help", { heactive: "active" });
});

app.get("/profile", (req, res) => {
  res.render("studentProfile");
});

app.get("/shome", (req, res) => {
  res.render("studenthome", { Hactive: "active" });
});

app.get("/ihome", (req, res) => {
    res.render("instructorhome", { Hactive: "active" });
  });

  app.get("/upload", (req, res) => {
    res.render("courseupload");
  });

  app.post('/upload', (req, res) => {
      res.redirect('/lesson')
  })

  app.get('/lesson', (req, res) => {
    res.render('lessonupload')
  })
// app.post("/", (req, res) => {
//      const data = req.body;
//     res.render('details', {name: data.projectName, roll: data.roll, details: data.details})
// })
