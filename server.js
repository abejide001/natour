const app = require("./app");

require("./db/connection")();

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`app listening on ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1); // shut down the app
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received, Shutting down gracefully");
  server.close(() => {
    console.log("Process terminated");
  });
});
