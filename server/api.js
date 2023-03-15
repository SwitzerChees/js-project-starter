const initializeAPI = (app) => {
  // default REST api endpoint
  app.get("/api/hello", hello);
};

const hello = (req, res) => {
  res.send("Hello World!");
};

module.exports = { initializeAPI };