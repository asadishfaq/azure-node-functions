const { UNAUTHORIZED } = require("../utils/constants");
const { response } = require("../utils/response");
const jwt = require("jsonwebtoken");

module.exports = jwtMiddleware;

function jwtMiddleware(ctx, endpoint) {
  try {
    return validateRequest(ctx, endpoint);
  } catch (error) {
    return error;
  }
}

function validateRequest(ctx, endpoint) {
  if (!ctx.req.headers.authorization) {
    ctx.res = response(401, {}, UNAUTHORIZED);
    return;
  }

  try {
    const header = ctx.req.headers.authorization;
    const withoutBerer = header.split(" ")[1];
    const decoded = jwt.verify(
      withoutBerer,
      "0FDC01D4693DDB060DA694895B083C5FD0792BE9D98E89C1632ACC245D3C0406"
    );

    if (decoded) {
      ctx.req.decoded = decoded;
      return decoded;
    }

    return;
  } catch (error) {
    console.log("catch block", error.message);
    ctx.res = response(401, error, UNAUTHORIZED);
    ctx.done(null, { status: 401 });
  }
}
