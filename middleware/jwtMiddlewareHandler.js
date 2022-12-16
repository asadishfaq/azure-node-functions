const MiddlewareHandler = require("azure-middleware");
const { UNAUTHORIZED } = require("../utils/constants");
const { response } = require("../utils/response");
const jwtMiddleware = require("./jwtValidation");
const db = require("../lib/azure-cosmosdb-mongodb");

module.exports = {
  jwtMiddlewareHandler: (endpoint) =>
    new MiddlewareHandler().use(async (ctx) => {
      await db.init();
      const decoded = jwtMiddleware(ctx, endpoint);

      if (decoded || endpoint == "signIn" || endpoint == "addEmployee") {
        ctx.next();
      } else {
        ctx.res = response(401, {}, UNAUTHORIZED);
        ctx.done(null, { status: 401 });
      }
      // console.log("ctx", ctx);
      console.log("middleware handler called using endpoint " + endpoint);
      // ctx.next();
    }),
};
