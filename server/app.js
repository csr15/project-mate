const express = require("express");
const app = express();
const { PORT = 3000 } = process.env;
const cors = require("cors");
const mongoose = require("mongoose");
const mongoDBClusterURL =
  "XXXXXX";
const versionPrefix = "/api/v1";

//Cors Configuration
app.use(cors({ credentials: true }));
app.use(express.json());

//Routers
const authRouter = require("./routes/auth");
const publishRouter = require("./routes/publish");
const profileRouter = require("./routes/profile");
const projectsRouter = require("./routes/project");
const searchRouter = require("./routes/search");
const requestRouter = require("./routes/request");
const notificationRouter = require("./routes/notification");

// mongo "mongodb+srv://tutorial.innnd.mongodb.net/myFirstDatabase" --username csr15

//Mongoose configuration to connect to MongoDB Atlas
mongoose
  .connect(mongoDBClusterURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//Initial Request
app.get(`${versionPrefix}`, (req, res) => {
  res.status(200).json("Hello world from server");
});

//Authentication Router
app.use(`${versionPrefix}/auth`, authRouter);

//Publish a project
app.use(`${versionPrefix}/publish`, publishRouter);

//Current user details
app.use(`${versionPrefix}/profile`, profileRouter);

//Project data
app.use(`${versionPrefix}/projects`, projectsRouter);

//Search for particular programming language
app.use(`${versionPrefix}/search`, searchRouter);

//To send collaboration request
app.use(`${versionPrefix}/request`, requestRouter);

//To get notifications for current user
app.use(`${versionPrefix}/notifications`, notificationRouter);

//Server startup
app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});
