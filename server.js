const mongo = require("mongodb");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieSesstion = require("cookie-session")
const passport = require("passport");
const flash = require("connect-flash")
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(express());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(cookieSesstion({
  secret: "ninga"
}));

require("./passport")
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const myloger = require("./myloger");
app.use(myloger)


const newuser = () => { 
  const URL = 'mongodb://localhost:27017/users';
  mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
  const manager = require("./manager");
  app.use("/manager" ,manager);
  const imagebuffer = require("./imagebuffer");
  app.use("/manager" ,imagebuffer);
};
newuser();


app.get("/", async (req, res) => {
  const data = [
    {
      _id: 1,
      nameInvstement: " אפליקציה לניהול נכון של הבית ",
      placeinvstement: "בני ברק",
      moreDetails:
        "the our barder-shop is very good, can i have more detelais in mail. ",
      image: "managing.jpeg",
      subject: "appliction"
    },
    {
      _id: 2,
      nameInvstement: "נכס נדלני עם תשואה גבוהה",
      placeinvstement: "תל אביב",
      moreDetails:
        "the our barder-shop is very good, can i have more detelais in mail. ",
      image: "teal-estate.jpeg",
      subject: "nadlan"
    },
    {
      _id: 3,
      nameInvstement: "חדר בריחה מצליח",
      placeinvstement: "אילת",
      moreDetails: "the our barder-shop of shalom is very good.",
      image: "escape-room.jpeg",
      subject: "escape-room"
    },
    {
      _id: 4,
      nameInvstement: "חברת הייטק ",
      placeinvstement: "חיפה",
      moreDetails:
        "the our barder-shop is very good, can i have more detelais in mail. ",
      image: "tech-company.png",
      subject: "haytec"
    }
  ];
  res.send(data);
});


app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
