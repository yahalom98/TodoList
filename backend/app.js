const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./utils/errorHandler");
const app = express();
const userRouter = require("./routes/user.Routes");
const origins = ["http://localhost:5173"];
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      // Check if the request origin is in the allowedOrigins array, or if it's not set (e.g., when using Postman)
      if (origins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use("/api/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(404, "The requested route is not exist"));
});

app.use(globalErrorHandler);
module.exports = app;
