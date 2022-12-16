const jwt = require("jsonwebtoken");

module.exports = {
  getSignedJwtToken: (user) => {
    const secretKey =
      "0FDC01D4693DDB060DA694895B083C5FD0792BE9D98E89C1632ACC245D3C0406";
    const expiresIn = "1h";
    const refExpiresIn = "2h";

    return {
      accessToken: jwt.sign(user.toJSON(), secretKey, {
        expiresIn: expiresIn,
      }),
      refreshToken: jwt.sign(user.toJSON(), secretKey, {
        expiresIn: refExpiresIn,
      }),
    };
  },
};
