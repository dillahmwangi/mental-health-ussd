require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  africasTalking: {
    apiKey: process.env.AFRICASTALKING_APIKEY,
    username: process.env.AFRICASTALKING_USERNAME
  }
};

module.exports = config;
