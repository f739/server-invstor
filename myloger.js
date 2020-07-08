
let myloger = (req, res, next) => {
    console.log("this is my date: ", Date.now());
    next();
};


module.exports = myloger;