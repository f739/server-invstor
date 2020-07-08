const router = require("express").Router();
const invstor = require("./invstor-model");
const multer = require('multer');


const postpotoUpload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 2*1024*1024
    },
    fileFilter: function (req, file, cb){
        const fname = file.originalname;
        const valid = ['.jpg','.jpeg', '.png'].find(ext => fname.endsWith(ext));
        cb(null, valid);
    }
}).single("image");

// router.get("/:id/image", async (req, res, next) => {
// const inv = await invstor.findById( +req.params.id);
// res.end(inv.image);
// });

router.post("/testing", postpotoUpload, async (req, res, next) => {
    let params = req.body;
if (req.file){
   params.image = req.file.buffer;
}
const inv = new invstor(params);
try {
    await inv.save();
    res.redirect("http://localhost:8080/settings/manager/managerold")
}catch {
    console.log(inv.errors);
    res.render('http://localhost:8080/settings/manager/managernew', {inv})
}
});
module.exports = router;
