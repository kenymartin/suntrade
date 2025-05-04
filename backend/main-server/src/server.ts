import express, { Express} from "express"
import rateLimit, { RateLimitRequestHandler } from "express-rate-limit"
import userRoute from "./routes/userRoute.js";
import cors, { CorsOptions } from "cors";
import userLoginRoute from "./routes/userloginRoute.js";
import orderRoute from "./routes/orderRoute.js";
import phoneRoute from "./routes/phoneRoute.js";
import contactRoute from "./routes/contactRoute.js";
import solarPanelRoute from "./routes/solarPanelRoute.js";

const app: Express = express();
app.use(cors({
  origin: '*', // Allow all origins (for development)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
const corsOptions: CorsOptions = {
  origin: "http://localhost:5173",
  // origin: "http://localhost:3004",
  credentials: true, //access-control-allow-credentials:true
  //optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
const limitter: RateLimitRequestHandler = rateLimit({
  windowMs: 60 * 1000, //1 minute(s)
  max: 100, //Maximum 100 requests per windowMs
  message: "Rate limit exceeded,try again later",
  skipFailedRequests: true,
  skipSuccessfulRequests: true,
});
app.use(limitter);
app.use(express.json());
// Routes
app.use("/api/users", userRoute);
app.use("/api/userlogin", userLoginRoute);
app.use("/api/contacts", contactRoute);
app.use("/api/solarpanels", solarPanelRoute);
app.use("/api/phones", phoneRoute);
app.use("/api/orders", orderRoute);


// import express from 'express';

// const app = express();

// app.get('/', (_req, res) => {
//   res.send('Hello, World!');ççç
// });

app.listen(3000, '0.0.0.0',() => {
  console.log('Server is running on port 3000');
});
