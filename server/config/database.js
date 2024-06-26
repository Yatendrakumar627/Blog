const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = function () {
  const MONGODB_URL =
    "mongodb+srv://kumaryatendra4500:blog@blog.xfunvt1.mongodb.net/?retryWrites=true&w=majority&appName=Blog";

  mongoose
    .connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("DB Connected Successfully"))
    .catch((error) => {
      console.log("DB Connection Issue");
      console.error(error);
      process.exit(1);
    });
};


