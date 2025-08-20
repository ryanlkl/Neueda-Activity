const express = require("express")
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");

// Import Routes

const app = express()
const port = 3000;

// Middleware
app.use(express.json())

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

app.use((req, res, next) => {
    console.log(`${req.requestTime}: ${req.method} ${req.path} from ${req.get("User-Agent")}`)

    next();
})

// Implement validation middleware
app.use((req, res, next) => {
    if (req.path === "/favourites/" && req.method === "POST") {
        if (!req.body.title || !req.body.rating) {
            return res.status(500).json({
                error: "Missing title and/or rating"
            })
        }
    }

    next()
})

app.use((req, res, next) => {
    if (req.path.includes("/favourites/") && req.method === "PATCH") {
        if (!req.body.rating) {
            return res.status(500).json({
                error: "Missing rating"
            })
        }
    }

    next()
})

// Add routers using: app.use("{path}", {router})

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc))

// Open Port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    console.log(`Documentation is running on http://localhost:${port}`)
})