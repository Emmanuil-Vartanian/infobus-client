const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const logger = require("morgan");
dotenv.config({ path: "./.env" });

const authRouter = require("./routes/api/auth");
const usersRouter = require("./routes/api/users");
const carriersRouter = require("./routes/api/carriers");
const agenciesRouter = require("./routes/api/agencies");
const locationsRouter = require("./routes/api/locations");
const discountsRouter = require("./routes/api/discounts");
const baggageRouter = require("./routes/api/baggage");
const routesRouter = require("./routes/api/routes");
const tripsRouter = require("./routes/api/trips");
const transportsRouter = require("./routes/api/transports");
const bookingsRouter = require("./routes/api/bookings");
const directionsRouter = require("./routes/api/directions");

// init app
const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
// app.use(express.json());
app.use(express.json({limit: '50mb'}));
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/carriers", carriersRouter);
app.use("/api/agencies", agenciesRouter);
app.use("/api/locations", locationsRouter);
app.use("/api/discounts", discountsRouter);
app.use("/api/baggage", baggageRouter);
app.use("/api/routes", routesRouter);
app.use("/api/trips", tripsRouter);
app.use("/api/transports", transportsRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/directions", directionsRouter);

app.get('/', function (req, res) {
  
  res.set("Content-Type", 'text/html; charset=utf-8');
  res.send('<h1>APP is working</h1>')
})

app.all("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});
app.use((err, req, res, next) => {
  const { status, message } = err;
  console.log('status', status ,'message', message);

  if (!status) status = 500;

  res.status(status).json({ message: err.message });
});

module.exports = app;
