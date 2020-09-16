const express = require("express");
const app = express();
const connectDB = require("./config/db");

// Connect Database ..
connectDB();

// init Middleware
// Body Parser
app.use(express.json({ extended: false }));

// Define Routes ..
app.use("/api/users", require("./routes/api/users"));
app.use("/api/post", require("./routes/api/post"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.get("/", function (req, res) {
  res.send("Hello");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is Running On Port ${PORT}`));
