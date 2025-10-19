// ============ Import Modules
const express = require("express");
const swaggerUi = require('swagger-ui-express');
var cors = require('cors')
// ============ Fin Import Modules

// ============ Import Middlewares
const { connect_db } = require("./configs/Database");
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

const corsOptions = {
  origin: '*', // allow all origins for development; restrict in production. Use a specific domain or an array of domains.
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Access-Control-Allow-Origin'], // specify allowed headers
  optionsSuccessStatus: 200
};

// ============ Bloc Middlewares et Configurations
app.use(cors(corsOptions));
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


// Route for testing error handling
app.post("/error-test", (req, res, next) => {
  const error = new Error("Test Error");
  error.statusCode = 500;
  // next(error);
  throw error;
});
app.get("/error-test", (req, res, next) => {
  const error = new Error("Test Error");
  error.statusCode = 500;
  // next(error);
  throw error;
});


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