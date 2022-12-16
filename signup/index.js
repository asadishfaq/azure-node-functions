const { response } = require("../utils/response");
const db = require("../lib/azure-cosmosdb-mongodb");
const { SUCCESS, BAD_REQUEST } = require("../utils/constants");
const { jwtMiddlewareHandler } = require("../middleware/JwtMiddlewareHandler");
const bcrypt = require("bcryptjs");
const userSvc = require("../services/userSvc");
const {
  UserSignupDTO,
  validateUserSignupDTO,
} = require("../Models/User/UserSignupDTO");

module.exports = jwtMiddlewareHandler("signup")
  .use(async (ctx) => {
    const user = ctx.req.body;
    const resultt = await userSvc.signUp(user);

    // const result = validateUserSignupDTO(ctx.req?.body);
    // const password = ctx.req.body.password;
    // const salt = await bcrypt.genSalt(10);
    // ctx.req.body.password = await bcrypt.hash(password, salt);
    // ctx.req.body.salt = salt;
    // const insertOneResponse = await signInAndSignUpRepo.addItem(ctx.req?.body);
    // ctx.res = response(200, insertOneResponse, SUCCESS);
    ctx.done();
  })
  .catch((error, ctx) => {
    ctx.log.info(error);
    ctx.next();
  })
  .listen();
