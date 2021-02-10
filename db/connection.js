const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const { DB_PASSWORD } = process.env;
const connectDB = () => {
  if (process.env.NODE_ENV === "development") {
    return mongoose
      .connect(`mongodb://127.0.0.1:27017/natour`, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log(`development database connected successfully`))
      .catch((err) => console.log(err.message));
  } else {
    mongoose
      .connect(
        `mongodb+srv://natour:${DB_PASSWORD}@cluster0-xvml9.mongodb.net/natour-prod?retryWrites=true&w=majority`,
        {
          useCreateIndex: true,
          useNewUrlParser: true,
          useFindAndModify: true,
          useUnifiedTopology: true,
        }
      )
      .then(() => console.log(`prod database connected successfully`))
      .catch((err) => console.log(err.message));
  }
};

module.exports = connectDB;
