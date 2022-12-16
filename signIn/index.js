const userSvc = require("../services/userSvc");
const { response } = require("../utils/response");
const db = require("../lib/azure-cosmosdb-mongodb");
const { jwtMiddlewareHandler } = require("../middleware/JwtMiddlewareHandler");

// module.exports = jwtMiddlewareHandler("signIn")
//   .use(async (ctx) => {
//     const result = await userSvc.signIn(ctx.req?.body);

//     ctx.res = response(
//       result?.statusCode,
//       !result.data ? {} : result.data,
//       result?.message
//     );
//     ctx.done();
//   })
//   .catch((error, ctx) => {
//     ctx.log.info(error);
//     ctx.next();
//   })
//   .listen();

module.exports = async function (ctx, req) {
  try {
    db.init();
    const result = await userSvc.signIn(ctx.req?.body);

    ctx.res = response(
      result?.statusCode,
      !result.data ? {} : result.data,
      result?.message
    );
    // ctx.done();
  } catch (error) {
    ctx.log(`*** Error throw: ${JSON.stringify(error)}`);
    ctx.res = response(500, {}, error);
  }
};
