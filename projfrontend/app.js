require('dotenv').config()


const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//myroutes
const authRoutes = require("./routes/auth")
const userRoutes = require('./routes/user')



app.set("views", "./views");
app.set("view engine", "ejs");

//DB Connection
mongoose.connect('mongodb://localhost:27017/course').then(() => {
  console.log('db connected');
});


//middlewares
app.use(express.static(__dirname + "/public"));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());


//my routes
app.use("/api", authRoutes)
app.use('/api', userRoutes)


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



app.get('/tsignup', (req, res) => {
  res.render('Buissnesssignup')
})

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  res.render("index");
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
