require('dotenv').config();

const config = {
  port: process.env.PORT || 3001,
  africasTalking: {
    apiKey: process.env.AFRICASTALKING_APIKEY,
    username: process.env.AFRICASTALKING_USERNAME
  }
};

const openai = new OpenAI(process.env.OPENAI_API_KEY);

module.exports = config;
