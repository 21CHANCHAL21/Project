const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
const mongoURL = process.env.DB_URL;

// Database Connection
mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB Connection Error:", err));

const personRoutes = require("./routes/PersonRoutes");
app.use("/users", personRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
