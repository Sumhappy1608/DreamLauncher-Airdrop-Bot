const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const {
  getCurrentStep,
  STEP_WALLET,
  STEP_NONE,
  STEP_TELEGRAM,
  isJoin,
  STEP_TWITTER,
  isUniqueTwitter,
  updateAirdrop,
  STEP_FACEBOOK,
  STEP_WEBSITE,
  STEP_REFERRAL,
  getAirdropById,
  restartAirdrop,
  isUniqueFacebook,
  isUniqueTelegram,
  isUniqueWallet,
  addReferralUser,
  setIsDone,
} = require("./airdroper.controller");
const {checkTwitter} = require('./twitter')

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.BOT_API;
const listText = require("./message");

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });
const EVENT_CHECK_MISSION = "check_mission";
const EVENT_USERNAME = "username_twitter";

const keyboards = {
  main: {
    inline_keyboard: [
      [{ text: listText.STEP1, url: process.env.TWITTER_LINK }],
      [{ text: listText.STEP2, url: process.env.TELEGRAM_LINK }],
      [{ text: listText.STEP3, url: process.env.FACEBOOK_LINK }],
    ],
  },
  telegram: {
    inline_keyboard: [
      [{ text: 'Telegram', url: process.env.TELEGRAM_LINK }],
    ]
  },
  facebook: {
    inline_keyboard: [
      [{ text: 'Facebook', url: process.env.FACEBOOK_LINK }],
    ]
  },
  twitter : {
    inline_keyboard: [
      [{ text: 'Twitter', url: process.env.TWITTER_LINK }],
    ]
  },
  restart: {
    inline_keyboard: [
      [{ text: 'RESTART', 'callback_data': 'RESTART' }],
      [{ text: 'DONE', 'callback_data': 'DONE' }],
    ],
  },
  done: {
    reply_markup: {
      resize_keyboard: true,
      one_time_keyboard: true,
      keyboard: [
        ['restart'],
      ],
    },
    parse_mode: "Markdown",
  },
};

// bot.onText(/\/start (.+)|\/start/i, function (message, match) {
//   var invite_code;
//   var username;
//   if (match[1] != undefined){
//       invite_code = match[1];
//       username = message.from.username;
//   }
// });

bot.onText(/\/start (.+)|\/start/i, async (msg, match) => {
  if (msg.from.is_bot) {
    return;
  }
  const id = msg.chat.id;
  const _isJoined = await isJoin(id);
  if(_isJoined === STEP_REFERRAL){
    return await bot.sendMessage(msg.chat.id, listText.DONE(msg.chat.id), 
    {
      reply_markup: keyboards.done
    });
  }
  else if (_isJoined == false) {
    if (match[1] != undefined){
            await addReferralUser(msg.chat.id, match[1])
    }
    await bot.sendMessage(id, listText.START(msg.chat.username));
    await bot.sendMessage(id, listText.TWITTER(msg.chat.username), {
      reply_markup: keyboards.twitter
    });
  }
 
});

bot.onText(/\.*/, async (msg) => {
  const id = msg.chat.id;
  const step = await getCurrentStep(id);
  await mission({msg: msg, step: step})
});

const mission = async ({msg, step}) => {
  if (step === STEP_NONE && msg.text == '/start') {
    return;
  } 
  else if (step === STEP_TWITTER) {
    await twitterStep(msg);
  } 
  else if (step === STEP_TELEGRAM) {
    if(!checkJoinedTelegramGroup(msg.chat.id)){
      return bot.sendMessage(msg.chat.id, listText.teleNotJoin);
    }
    await telegramStep(msg);
  } 
  else if (step === STEP_FACEBOOK) {
    await facebookStep(msg);
  } 
  else if (step === STEP_WEBSITE) {
    await websiteStep(msg);
  }
  else if (step === STEP_WALLET) {
    await walletStep(msg);
  }
  else {
    

  }
}

const twitterStep = async (msg) => {
  if (msg.text == '/start') {
    return await bot.sendMessage(msg.chat.id, listText.TWITTER(msg.chat.username), {
      reply_markup: keyboards.twitter
    });
  }
  if (msg.text[0] !== "@") {
    return bot.sendMessage(msg.chat.id, listText.validTwitter);
  } 
  else if (await isUniqueTwitter(msg.text)) {
    return bot.sendMessage(msg.chat.id, "twitter đã được xài");
  } 
  else {
    await bot.sendMessage(msg.chat.id, listText.TELEGRAM(msg.chat.username), {
      reply_markup: keyboards.telegram
    });
    await updateAirdrop(msg.chat.id, { twitter: msg.text });
  }
}

const facebookStep = async (msg) => {
  if(await isUniqueFacebook(msg.text)) {
    return bot.sendMessage(msg.chat.id, 'Facebook is used. Please try another one')
  }
  bot.sendMessage(msg.chat.id, listText.WEBSITE(msg.chat.username));
  await updateAirdrop(msg.chat.id, { facebook: msg.text });
  return;
}

const telegramStep = async (msg) => {
  if( await isUniqueTelegram(msg.text)){
    return bot.sendMessage(msg.chat.id, 'Telegram user is used. Please try another one')
  }
  await updateAirdrop(msg.chat.id, { telegram: msg.text });
  return bot.sendMessage(msg.chat.id, listText.FACEBOOK(msg.chat.username), {
    reply_markup: keyboards.facebook
  });
}

const websiteStep = async (msg) => {
  await updateAirdrop(msg.chat.id, { website: true });
  return bot.sendMessage(msg.chat.id, listText.WALLET(msg.chat.username));
}

const walletStep = async (msg) => {
  if (!/^(0x){1}[0-9a-fA-F]{40}$/i.test(msg.text)) {
    return bot.sendMessage(msg.chat.id, listText.validWallet);
  } 
  else if (await isUniqueWallet(msg.text)) {
    return bot.sendMessage(msg.chat.id, 'Wallet user is used. Please try another one')
  }
  else {
    await updateAirdrop(msg.chat.id, { wallet: msg.text });
    const info = await getAirdropById(msg.chat.id);
    
    return bot.sendMessage(msg.chat.id, listText.confirmInfo(info), 
    { 
      reply_markup: keyboards.restart
      
    })
  }
}

const checkJoinedTelegramGroup = async (id) => {
  const result = await bot.getChatMember(-673886390,id);
  if(!result){
    return false
  }
  return true
}

const checkIsFollowedTwitter = async (twitter) => {
  return checkTwitter(twitter)
}

bot.on("callback_query", async (callbackQuery) => {

  if(callbackQuery.data == 'RESTART') {
    if(getIsDone(callbackQuery.from.id)) {
      return bot.sendMessage(callbackQuery.from.id, 'You cannot restart airdrop after comfirming')
    }
    await restartAirdrop(callbackQuery.from.id)
    bot.sendMessage(callbackQuery.from.id, 'restarted')
  }
  else if(callbackQuery.data == 'DONE'){
    await setIsDone(callbackQuery.from.id);
    return bot.sendMessage(callbackQuery.from.id, listText.DONE(callbackQuery.from.id))
  }
})

// bot.on('new_chat_members', async (msg) => {
//   console.log(msg);
// })

bot.onText(new RegExp('/clear'), async (msg) => {
  bot.sendMessage(msg.chat.id, 'done',{
    reply_markup: {
      remove_keyboard: true
    },
    parse_mode: "Markdown"
  })
})