const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  BASE_URL: process.env.BASE_URL,
  GOGO_AJAX_URL: process.env.GOGO_AJAX_URL
};
