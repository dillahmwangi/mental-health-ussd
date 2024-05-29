const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/appConfig');
const ussdRoutes = require('./routes/ussd');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/ussd', ussdRoutes);


app.listen(config.port, () => {
  console.log(`USSD service running on port ${config.port}`);
});
