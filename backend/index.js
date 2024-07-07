const connectToMongo = require("./db");
const cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const dotenv = require("dotenv");

dotenv.config();

connectToMongo();

const corsOptions = {
  origin:"https://yourbook-frontend.onrender.com",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",};
app.use(cors(corsOptions));

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
