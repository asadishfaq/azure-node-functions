const db = require("../lib/azure-cosmosdb-mongodb");
const userSvc = require("../services/userSvc");
module.exports = async function (context, req) {
  try {
    let response = null;

    // create 1 db connection for all functions
    await db.init();
    switch (req.method) {
      case "GET":
        if (req?.query.id || (req?.body && req?.body?.id)) {
          response = {
            documentResponse: await db.findItemById(req?.body?.id),
          };
        } else {
          // allows empty query to return all items
          const dbQuery =
            req?.query?.dbQuery || (req?.body && req?.body?.dbQuery);
          response = {
            documentResponse: await db.findItems(dbQuery),
          };
        }
        break;
      case "POST":
        if (req?.body) {
          userSvc.addUser();
          const insertOneResponse = await db.addItem(req?.body);
          response = {
            documentResponse: insertOneResponse,
          };
        } else {
          throw Error("No document found");
        }

        break;
      case "DELETE":
        if (req?.query?.id || (req?.body && req?.body?.id)) {
          response = {
            documentResponse: await db.deleteItemById(req?.body?.id),
          };
        } else {
          throw Error("No id found");
        }

        break;
      default:
        throw Error(`${req.method} not allowed`);
    }

    context.res = {
      body: response,
    };
  } catch (err) {
    context.log(`*** Error throw: ${JSON.stringify(err)}`);

    context.res = {
      status: 500,
      body: err,
    };
  }
};
