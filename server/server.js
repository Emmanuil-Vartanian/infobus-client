require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

// ========== DEVELOPMENT VERSION ==========
const { DB_HOST, PORT = 3333 } = process.env;
// ========== DEVELOPMENT VERSION ==========
// ========== PRODUCTION VERSION ==========
// const { DB_HOST } = process.env;
// ========== PRODUCTION VERSION ==========

mongoose
  .connect(DB_HOST)
  // ========== DEVELOPMENT VERSION ==========
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  // ========== DEVELOPMENT VERSION ==========
  // ========== PRODUCTION VERSION ==========
  // .then(() => {
  //   console.log("Database connection successful");
  //   app.listen(() => {
  //     console.log(`Server running. Use our API`);
  //   });
  // })
  // ========== PRODUCTION VERSION ==========
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
