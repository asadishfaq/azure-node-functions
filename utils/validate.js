module.exports = {
  validateSchema: (data, schema) => {
    const validation = schema.validate(data);
    return validation;
  },
};
