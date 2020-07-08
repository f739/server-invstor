let express = require("express");
let myloger = require("./myloger")
let router = express.Router();
const contact = require("./contact");
const invstor = require("./invstor-model");
const passport = require("passport");
const jwt = require("jsonwebtoken");
router.use(myloger);

// router.use(passport.authenticate("jwt", {session: false}));

//post new user 
router.post("/user", async (req, res) => {
    const post = new contact(req.body);
    try {
        await post.save();
        res.redirect(301, 'http://localhost:8080')
    } catch (e) {
        res.send(e._message);
    }
});

//test sign in
router.post("/user/test", passport.authenticate(
    "local",
    {
        successRedirect: "http://localhost:8080",
        failureRedirect: "http://localhost:8080/conected",
        failureFlash: true
    }
));

//test user
router.get("/testing", (req, res) => {
    console.log(req.user);
    res.send(req.user);
});

//post new token
router.post("/token",(req, res) => {
    if (!req.user) {
        return res.redirect("http://localhost:8080/conected")
    }
    const token = jwt.sign(
        {id: req.user.id},
        "ninja",
        {expiresIn: "7d"}
    )
    res.send(token);
});


router.get("/api", (req, res) => {
    res.send(`hallo ${req.user.email}`);
});

//create new invstor
router.post("/invstor", async (req, res) => {
    const post = new invstor(req.body);
    await post.save();
    res.send(post);
});

//get invstor of id user
router.get("/all", async (req, res, next) => {
    const inv = await invstor.find({});
    res.send(inv);
    next()
});

router.get("/:id/image", async (req, res) => {
    const inv = await invstor.findById(req.params.id);
    res.end(inv.image);
});

router.get("/image", async (req, res) => {
    const inv = await invstor.find({image});
    console.log(inv[6].buffer);
    
    res.send("ok");
});












router.get("/:id", (req, res) => {
    res.redirect(301, 'http://example.com');
    res.send(req.params.id);
});
router.get("/aaa", (req, res) => {
    res.attachment("@/assets/logo.png");
});
router.get("*", (req, res) => {
    res.send(`i'm sorry the this page is not found`);
})


module.exports = router;