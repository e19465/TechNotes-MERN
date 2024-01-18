const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const { logger, logEvents } = require("./middleware/logger");
const { errorHandler } = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 5000;

/* database connection */
mongoose
  .connect(process.env.MONGO_URI)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log(err);
    logEvents(
      `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
      "mongoErrLog.log"
    );
  });

// custom middleware logger
app.use(logger);

// cors policy
app.use(cors(corsOptions));

// serve json files
app.use(express.json());

// cookies
app.use(cookieParser());

// url-encoded data (form data)
app.use(express.urlencoded({ extended: false }));

// serve static files
app.use("/", express.static(path.join(__dirname, "public")));

// root routes
app.use("/", require("./routes/root"));

// user routes
app.use("/api/users", require("./routes/userRoutes"));

// note routes
app.use("/api/notes", require("./routes/noteRoutes"));

// 404
app.all("*", (req, res) => {
  if (req.accepts("html")) {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.status(404).json({ message: "404 Not Found!" });
  } else {
    res.status(404).type("txt").send("404 Not Found!");
  }
});

// custom error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
