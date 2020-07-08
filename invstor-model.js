const mongoose = require("mongoose");
const invstorSchema = new mongoose.Schema({
    nameInvstement: {type: String},
    moneyinvstement: {type: String},
    placeinvstement: {type: String},
    moreDetails: {type: String},
    image: {type: Buffer},
    selectSubject: {type: String}
});

module.exports = mongoose.model('allInvstment', invstorSchema);