const mongoose = require('mongoose');

class Data {
    constructor({
        id=null,
        twitter=null,
        telegram=null,
        facebook=null,
        isVisitWebsite=false,
        wallet=null,
        referral=null,
        invitedUser=[],
        isDone=null,
    }){
        this.id = id;
        this.twitter =  twitter;
        this.telegram = telegram;
        this.facebook = facebook;
        this.isVisitWebsite=isVisitWebsite;
        this.wallet = wallet;
        this.referral = referral;
        this.invitedUser=invitedUser;
        this.isDone = isDone;
    }
}

const DataSchema = new mongoose.Schema({
    id: String,
    twitter: String,
    telegram: String,
    facebook: String,
    isVisitWebsite: Boolean,
    wallet: String,
    referral: String,
    invitedUser: Array,
    isDone: Boolean,
})

const dataModel = mongoose.model('AIRDROP', DataSchema);

module.exports = {
    dataModel,
    Data
}