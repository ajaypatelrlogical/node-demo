const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  jwtSecret: process.env.API_AUTH_SECRET,
  jwtSession: {
    session: false,
  },
};
