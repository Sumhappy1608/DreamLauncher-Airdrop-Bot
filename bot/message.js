require('dotenv').config()
const keyWallet = "👛 Wallet";
const keyRules = "📌 Rules";
const check = "Check";

module.exports = {
    STEP1: 'Step 1. Link twitter',
    STEP2: 'Step 2. Link telegram group',
    STEP3: 'Step 3. Link facebook',
    STEP4: 'Step 4. BEP-20 address',
    keyPoint: "🅿️ Points",
    keyWallet,
    keyRules,
    keyHelp: "📨 Contact",
    START: (user) => {
        return `Hello ${user}!, This is a friendly DreamLauncher Airdrop bot.
    \nWelcome to participate in our airdrop!
    \n💰Please perform the tasks below to earn to ${process.env.TOKEN_AMOUNT} ${process.env.SYMBOL}.
    \n💰Besites that, for each invited new participant, you can earn ${process.env.BONUS} ${process.env.SYMBOL} for bonus`
    },
    TWITTER: (user) => {
        return `Let's start by following our twitter and retweet this post bellow.\n Then submit your twitter account bellow
        \n Make sure your twitter account is correct, we will check it later `
    },
    TELEGRAM: (user) => {
        return `Great ${user}, next join to our telegram group.\n Then submit your telegram handle below`
    },
    FACEBOOK: (user) => {
        return `Great ${user}, next like to our facebook group.\n Then submit your facebook handle below`
    },
    ICO: (user) => {
        return `Great ${user}, please create an account for our ico website.\n Then submit your email used for register ico website below
        \n We will send token through it`;
    },
    WALLET: (user) => {
        return `This is final step. Please submit your BEP-20 address here`
    },
    validTwitter: "Invalid twitter account please submit your twitter username with @:",
    validWallet: "Invalid wallet address, please try again:",
    confirmInfo: (info) => {
        return `Now you finished all the missions, please check these information one more time to make sure it correct
    Twitter: ${info.twitter}
    Telegram: ${info.telegram}
    Facebook: ${info.facebook}
    Wallet: ${info.wallet}
        \nIf you don not sure you can restart the airdrop again!`
    },
    RESTART: 'Restart, please press /start to try again',
    DONE: (id) => {
        return `🎉 Congratulations for completing all the tasks.
        \n👏 For each person you invite, you will get ${process.env.BONUS} ${process.env.SYMBOL}.
        \n⚠️ Only users who have never started the airdrop before are valid.
        \n🗓 The airdrop will start at ${process.env.BEGIN_TIME} ${process.env.TIME_ZONE}
        \n🗓 The airdrop will start end at ${process.env.END_TIME} ${process.env.TIME_ZONE}
        \n🔗 Your referral link：https://t.me/TestForDATA_bot?start=${id}`
    },
    twNotFollow: "You haven't followed page twitter",
    twNotReTweet: "You haven't retweet post twitter",
    twNotLike: "You haven't like post twitter",
    twNotUser: "You must bind username twitter",
    teleNotFollow: "You haven't follow chanel telegram",
    teleNotJoin: "❌ You haven't join group telegram",
    notFoundTw: "Not found user twitter, please try again.",
    PRE_START: `❇ The airdrop will start in ${process.env.BEGIN_TIME} ${process.env.TIME_ZONE}`,
    ENDED: `❇ The airdrop ended. Thank for your participation!`,
    STATISTIC: ({user, bonusAmount}) => {
        return `Hello ${user}
        \n Your token can receive is ${process.env.TOKEN_AMOUNT} ${process.env.SYMBOL}
        \n Your bonus token is ${bonusAmount} ${process.env.SYMBOL}`
    }
}