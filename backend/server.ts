import express from "express";
import userRoute from "./routes/userRoute.js";
import contactRoute from "./routes/contactRoute.js";
import phoneRoute from "./routes/phoneRoute.js";
import solarPanelRoute from "./routes/solarPanelRoute.js";
import rateLimit from "express-rate-limit";

const app = express();
const limitter = rateLimit({
  windowMs: 1 * 60 * 1000, //15 minutes
  max: 1000, //Maximum 100 requests per windowMs
  message: "Rate limit exceeded,try again later",
});
app.use(express.json());

// Routes
app.use("/api/users", userRoute);

app.use("/api/contacts", contactRoute, (req, res) => {});

app.use("/api/solarpanels", solarPanelRoute);

app.use("/api/phones", phoneRoute);

// Start the server
//const PORT = process.env.DEV_PORT || 4000;
app.listen(4000, () => {
  console.log(`Server listening on port ${4000}`);
});
