import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./swagger.json" with { type: "json" };
import dotenv from "dotenv";
import router from "./routes/routes.js";

// Load environment variables
dotenv.config({ path: "./.env" });

// Import Routes
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use((req, res, next) => {
  console.log(
    `${req.requestTime}: ${req.method} ${req.path} from ${req.get(
      "User-Agent"
    )}`
  );
  next();
});

// Implement validation middleware
app.use((req, res, next) => {
  if (req.path === "/favourites/" && req.method === "POST") {
    if (!req.body.title || !req.body.rating || !req.body.type) {
      return res.status(500).json({
        error: "Missing title, type and/or rating",
      });
    }
  }
  next();
});

// Add routers
app.use("/api", router);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Open Port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Documentation is running on http://localhost:${port}`);
});

