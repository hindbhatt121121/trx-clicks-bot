require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const mongoose = require("mongoose");
const User = require("./models/User");
const Task = require("./models/Task");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  let user = await User.findOne({ chatId });

  if (!user) {
    user = new User({ chatId });
    await user.save();
    bot.sendMessage(chatId, "Welcome! You have been registered.");
  } else {
    bot.sendMessage(chatId, "You are already registered!");
  }
});

bot.onText(/\/earn/, async (msg) => {
  const chatId = msg.chat.id;
  const tasks = await Task.find({});

  if (tasks.length === 0) {
    bot.sendMessage(chatId, "No tasks available right now.");
    return;
  }

  tasks.forEach((task, index) => {
    bot.sendMessage(chatId, `${index + 1}. Visit: ${task.link}`);
  });
});

console.log("Bot started...");
