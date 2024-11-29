const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const path=require('path'); 

const app = express();
const PORT = process.env.PORT || 3001;;
const url='mongodb+srv://kadrunnisha2:nTgxCdip3Ec5rRSM@intenship.oqexe5i.mongodb.net/Peakfloass?retryWrites=true&w=majority&appName=intenship'
// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/tasks", taskRoutes);

// Start server
app.use(express.static(path.join(__dirname,"../my-app/build")));
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../my-app/build/index.html"));
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
