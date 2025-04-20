const app = require("./app");
const { db } = require("./src/models");
const ENV = require("./src/config");

const PORT = ENV.PORT || 8080;
const startServer = async () => {
  try {
    await db.sync({ force: false });
    console.log(" Database synced successfully !");
    app.listen(PORT, () => {
      console.log(` Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(" Failed to start the server:", err);
  }
};
startServer();
