const express = require("express")
// Import Routes

const app = express()

// Add routers using: app.use("{path}", {router})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})