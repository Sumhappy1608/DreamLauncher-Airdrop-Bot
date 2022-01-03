const mongoose = require('mongoose');

class Data {
    constructor({
        id=null,
        twitter=null,
        telegram=null,
        facebook=null,
        wallet=null,
        invitedUser=[],
        isDone=false,
    }){
        this.id = id;
        this.twitter =  twitter;
        this.telegram = telegram;
        this.facebook = facebook;
        this.wallet = wallet;
        this.invitedUser=invitedUser;
        this.isDone = isDone;
    }
}

const DataSchema = new mongoose.Schema({
    id: String,
    twitter: String,
    telegram: String,
    facebook: String,
    wallet: String,
    invitedUser: Array,
    isDone: Boolean,
})

const dataModel = mongoose.model('AIRDROP', DataSchema);

module.exports = {
    dataModel,
    Data
}