const connectToMongo = require("./db");
const cors = require('cors')
const express = require('express')
const app = express()
const port = 5000
const dotenv = require("dotenv");

dotenv.config();

connectToMongo();
app.use(cors())

app.use(express.json())

// Available routes
app.use("/api/auth", require("./routes/auth.js"))
app.use("/api/notes", require("./routes/notes.js"))

app.get('/', (req, res) => {
  res.send('Hello World!')
})




app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`)
})