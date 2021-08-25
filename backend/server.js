import express from "express";

// app config
const app = express();
const port = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// api endpoints
app.get("/", (req, res) => {
  res.send("Hello Express server is up and running!");
});

// sign in endpoints
app.post("/api/user-signin", async (req, res) => {
  const { accessCode } = req.body;

  if (accessCode === "testAccessCode") {
    return res
      .status(200)
      .json({ message: "User authenticated and logged in!" });
  } else {
    return res.status(400).json({ message: "User authentication failed!" });
  }
});

// listen
app.listen(port, () => {
  console.log("App has started! Listening at:", port);
});
