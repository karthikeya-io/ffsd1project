require('dotenv').config()


const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");



app.set("views", "./views");
app.set("view engine", "ejs");


//myroutes
const authRoutes = require("./routes/auth")
const userRoutes = require('./routes/user')
const courseRoutes = require("./routes/course")
const adminRoutes = require("./routes/admin")



//DB Connection
mongoose.connect('mongodb://localhost:27017/course', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
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
app.use('/course', courseRoutes)
app.use('/admin', adminRoutes)



const port = 3000;
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});

app.get("/", (req, res) => {
  res.render("index", { Hactive: "active" });
});

app.get("/admin", (req, res) => {
  res.render('admin', )
})

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



app.get("/course", (req, res) => {
  res.render("course");
});

app.get("/courseinfo", (req, res) => {
  res.render("courseinfo");
});

app.get("/business", (req, res) => {
  res.render("business");
});

app.get("/help", (req, res) => {
  res.render("help", { heactive: "active" });
});

app.get("/profile", (req, res) => {
  res.render("studentProfile");
});

app.get("/ihome", (req, res) => {
    res.render("instructorhome", { Hactive: "active" });
  });

  app.post("/ihome", (req, res) => {
    res.render("instructorhome", { Hactive: "active" });
  });

  app.get('/lesson', (req, res) => {
    res.render('lessonupload')
  })

  app.get("/payment", (req, res) => {
    res.render("payment");
  });
  

  // app.post("/", (req, res) => {
//      const data = req.body;
//     res.render('details', {name: data.projectName, roll: data.roll, details: data.details})
// })
