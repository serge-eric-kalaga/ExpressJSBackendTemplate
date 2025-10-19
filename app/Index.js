// ============ Import Modules
const express = require("express");
const { connect_db } = require("./configs/Database");
const swaggerUi = require('swagger-ui-express');
// ============ Fin Import Modules

// ============ Import Middlewares
const LoginRequired = require("./middlewares/Auth");
const loggerMiddleware = require("./middlewares/Logger");
const globalErrorHandler = require("./middlewares/ErrorHandler");
const Response = require("./middlewares/Response");
const { InitUser } = require("./configs/InitData");
const swaggerSpec = require("./configs/Swagger");
const { updateMetrics, Metrics } = require("./middlewares/Metrics");
// ============ Fin Import Middlewares

// ============ Import Routes
const userRouter = require("./routes/User.route");
const exempleRouter = require("./routes/Exemple.route");
// ============ Fin Import Routes


const PORT = process.env.PORT;

const app = express();


// ============ Bloc Middlewares et Configurations
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(updateMetrics);
app.use(loggerMiddleware);
app.use(Response);
// ============ Fin bloc Middlewares et Configurations


// ============== Bloc routes
app.get("/", (req, res, next) => {
  res.json({
    succes: true,
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec.swaggerSpec));
app.get("/metrics", Metrics);

app.use("/users", userRouter);
app.use("/exemples", exempleRouter);


// // Route for testing error handling
// app.post("/error-test", (req, res, next) => {
//   const error = new Error("Test Error");
//   error.statusCode = 500;
//   // next(error);
//   throw error;
// });
// app.get("/error-test", (req, res, next) => {
//   const error = new Error("Test Error");
//   error.statusCode = 500;
//   // next(error);
//   throw error;
// });


app.all("/", (req, res, next) => {
  res.status(404).Response({ message: "Url non trouvée" });
});

// ============== Fin bloc routes


app.use(globalErrorHandler);


app.listen(PORT, "0.0.0.0", async () => {
  console.log(`App running on http://localhost:${PORT}`);

  setTimeout(async () => {
    await connect_db();
  }, 3000);

  setTimeout(async () => {
    await InitUser();
  }, 5000);
});

module.exports = app;