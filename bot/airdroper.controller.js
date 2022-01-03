const {dataModel, Data} = require('./airdroper.model');

const STEP_NONE = 0;
const STEP_TWITTER = 1;
const STEP_TELEGRAM = 2;
const STEP_FACEBOOK = 3;
const STEP_WALLET = 4;
const STEP_REFERRAL = 5;

const getCurrentStep = async (id) => {
    const user = await dataModel.findOne({id: id});

    if(!user){
        return 0;
    }
    else if(user.twitter === null){
        return 1;
    }
    else if(user.telegram === null){
        return 2;
    }
    else if(user.facebook === null){
        return 3;
    }
    else if(user.wallet === null){
        return 4;
    }
    else return 5;
}

const getAirdropById = async (id) => {
    return await dataModel.findOne({id: id});
}

const isJoin = async (id) => {
    const user = await dataModel.findOne({id: id});
    if(!user) {
        const newUser = new Data({id: id})
        await dataModel.create(newUser);
        return false;
    }
    else {
        return getCurrentStep(id)
    }
}

const updateAirdrop = async (id, data) => {
    const {
        twitter,
        telegram,
        facebook,
        wallet,
    } = data
    if(twitter !== undefined) {
        await dataModel.updateOne({id: id}, {twitter: twitter});
    }
    else if(telegram !== undefined) {
        await dataModel.updateOne({id: id}, {telegram: telegram});
    }
    else if(facebook !== undefined) {
        await dataModel.updateOne({id: id}, {facebook: facebook});
    }
    else if(wallet !== undefined) {
        await dataModel.updateOne({id: id}, {wallet: wallet});
    }
}

const isUniqueTwitter = async (twitter) => {
    const check = await dataModel.findOne({twitter: twitter});
    if(!check?.twitter || check.twitter === null){
        return false;
    }
    return true;
}

const isUniqueTelegram = async (telegram) => {
    console.log(telegram);
    const check = await dataModel.findOne({telegram: telegram});
    if(!check?.telegram || check.telegram === null){
        return false;
    }
    return true;
}

const isUniqueFacebook = async (facebook) => {
    const check = await dataModel.findOne({facebook: facebook});
    if(!check?.facebook || check.facebook === null){
        return false;
    }
    return true;
}

const isUniqueWallet = async (wallet) => {
    const check = await dataModel.findOne({wallet: wallet});
    if(!check?.wallet || check.wallet === null){
        return false;
    }
    return true;
}

const restartAirdrop = async (id) => {
    await dataModel.updateOne({id: id}, {twitter: null, telegram: null, facebook: null, wallet: null});
}

const addReferralUser = async (referralId, inviteId) => {
    const invite = await dataModel.findOne({id: inviteId});
    for(let i = 0; i < invite.invitedUser.length; i++) {
        if(referralId == invite.invitedUser[i].id){
            return;
        }
    }
    invite.invitedUser.push({id: referralId})
    await dataModel.updateOne({id: inviteId}, {invitedUser: invite.invitedUser})

}

const setIsDone = async (id) => {
    await dataModel.updateOne({id: id}, {isDone: true});
}

const getIsDone = async (id) => {
    const user = await dataModel.findOne({id: id});
    return user.isDone;
}

module.exports = {
    getCurrentStep,
    getAirdropById,
    isJoin,
    isUniqueTwitter,
    isUniqueTelegram,
    isUniqueFacebook,
    isUniqueWallet,
    updateAirdrop,
    restartAirdrop,
    addReferralUser,
    setIsDone,
    getIsDone,
    STEP_NONE,
    STEP_TWITTER,
    STEP_TELEGRAM,
    STEP_FACEBOOK,
    STEP_WALLET,
    STEP_REFERRAL
}