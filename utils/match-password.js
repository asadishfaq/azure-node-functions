const bcrypt = require("bcryptjs");

module.exports = {
  matchPassword: async (password, newPassword) => {
    return await bcrypt.compare(password, newPassword);
  },
};
