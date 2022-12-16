const { response } = require("../utils/response");
const userRepo = require("../lib/UserRepository");
const { SUCCESS } = require("../utils/constants");
const { jwtMiddlewareHandler } = require("../middleware/JwtMiddlewareHandler");
const userSvc = require("../services/userSvc");

module.exports = jwtMiddlewareHandler("getEmployeeById")
  .use(async (ctx) => {
    const id = ctx.req.query.id;
    const result = await userSvc.findUserById(id);
    ctx.res = response(
      result?.statusCode,
      !result.data ? {} : result.data,
      result?.message
    );
    ctx.done();
  })
  .catch((error, ctx) => {
    ctx.log.info(error);
    ctx.next();
  })
  .listen();
