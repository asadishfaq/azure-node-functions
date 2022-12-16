const { response } = require("../utils/response");
const userRepo = require("../lib/UserRepository");
const { SUCCESS } = require("../utils/constants");
const { jwtMiddlewareHandler } = require("../middleware/jwtMiddlewareHandler");
const userSvc = require("../services/userSvc");

module.exports = jwtMiddlewareHandler("updateEmployee")
  .use(async (ctx) => {
    const newData = ctx.req.body;
    // const id = ctx.req.query.id;
    const result = await userSvc.updateEmployee(newData);
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
//     await db.init();
//     const newData = req.body;
//     const id = req.query.id;
//     if (!id || !newData) {
//       ctx.res = response(400, {}, "enter user id or user data");
//       return;
//     }
//     const user = await db.findItemById(id);
//     if (!user) {
//       ctx.res = response(404, {}, "No user found against this id");
//       return;
//     }
//     const updatedUser = await db.updateItemById(id, newData);
//     ctx.res = response(200, updatedUser, SUCCESS);
//   } catch (error) {
//     ctx.log(`*** Error throw: ${JSON.stringify(error)}`);
//     ctx.res = response(500, {}, error.message);
//   }
// };
