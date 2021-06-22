const express = require("express");

const connectDb = require("./config/connectDb");

const cors = require("cors");

connectDb();

const app = express();

app.use(cors());

app.use(express.json());

const HttpError = require("./models/http-error");

const userRoutes = require("./routes/users-routes");
const petRoutes = require("./routes/pets-routes");

app.use("/api/user", userRoutes);
app.use("/api/pets", petRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

app.listen(5000);
