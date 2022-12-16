const { response } = require("../utils/response");
const { jwtMiddlewareHandler } = require("../middleware/JwtMiddlewareHandler");
const userSvc = require("../services/userSvc");
const db = require("../lib/azure-cosmosdb-mongodb");
module.exports = jwtMiddlewareHandler("addEmployee")
  .use(async (ctx) => {
    const result = await userSvc.addUser(ctx.req?.body);
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

// module.exports = async function (ctx, req) {
//   try {
//     db.init();
//     const result = await userSvc.addUser(ctx.req?.body);
//     ctx.res = response(
//       result?.statusCode,
//       !result.data ? {} : result.data,
//       result?.message
//     );
//     // ctx.done();
//   } catch (error) {
//     ctx.log(`*** Error throw: ${JSON.stringify(error.message)}`);
//     ctx.res = response(500, {}, error);
//   }
// };
