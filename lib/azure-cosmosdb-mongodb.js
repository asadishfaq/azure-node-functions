const { connect } = require("mongoose");

let db = null;
module.exports.init = async () => {
  if (!db) {
    db = await connect(process.env["CosmosDbConnectionString"]);
  }
};
