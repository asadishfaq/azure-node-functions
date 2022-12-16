module.exports = {
  response: (status, body, message = "Success") => {
    return {
      status: status,
      body: {
        data: body,
        message: message,
      },
    };
  },
};
