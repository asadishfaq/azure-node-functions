const { response } = require("../utils/response");
const userRepo = require("../lib/UserRepository");
const { SUCCESS } = require("../utils/constants");
const { jwtMiddlewareHandler } = require("../middleware/JwtMiddlewareHandler");

module.exports = jwtMiddlewareHandler("deleteEmployee")
  .use(async (ctx) => {
    const allUsers = ctx.bindings.getUser;
    console.log("all users", allUsers);
    const id = ctx.req.query.id;
    if (!id) {
      ctx.res = response(400, {}, "enter user id");
      //   return;
      ctx.done();
    }
    const user = await userRepo.findItemById(id);
    if (user === null) {
      ctx.res = response(404, {}, "user not found againt this id");
      ctx.done();
      //   return;
    }
    const deletedUser = await userRepo.deleteItemById(id);
    ctx.res = response(200, deletedUser, SUCCESS);
    ctx.done();
  })
  .catch((error, ctx) => {
    ctx.log.info(error);
    ctx.next();
  })
  .listen();

// module.exports = async function (ctx, req) {
//   try {
//     const id = req.query.id;
//     if (!id) {
//       ctx.res = response(400, {}, "enter user id");
//       return;
//     }
//     const user = await db.findItemById(id);
//     if (user === null) {
//       ctx.res = response(404, {}, "user not found againt this id");
//       return;
//     }
//     const deletedUser = await db.deleteItemById(id);
//     ctx.res = response(200, deletedUser, SUCCESS);
//   } catch (error) {
//     ctx.log(`*** Error throw: ${JSON.stringify(error)}`);
//     ctx.res = response(500, {}, error);
//   }
// };
