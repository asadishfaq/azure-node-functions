module.exports = async function (context, req) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  context.res = {
    status: 200,
    // enter loadio-key into the body
    body: "",
  };
};
