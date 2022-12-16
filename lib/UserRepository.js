const UserModel = require("../Models/User/User");

module.exports.addItem = async (doc) => {
  const modelToInsert = new UserModel(doc);

  return await modelToInsert.save();
};
module.exports.findItemById = async (id) => {
  return await UserModel.findById(id).lean();
};
module.exports.findUserByEmail = async (email) => {
  return await UserModel.find({ email }).limit(1);
};
module.exports.deleteItemById = async (id) => {
  return await UserModel.findByIdAndDelete(id);
};
module.exports.updateItemById = async (id, userData) => {
  const filter = { id: id };
  return await UserModel.findOneAndUpdate(filter, userData);
};
