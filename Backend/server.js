const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const fileUpload = require('express-fileupload');
const dbConnect = require('./Config/database');
const cloudinaryConnection = require('./Config/cloundinary');
require('dotenv').config();



// Middleware

app.use(cors());
app.use(express.json());

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

app.use(
	cors({
		origin:"http://localhost:3000",	
	})
)

// Routes
app.use("/api/v1", userRoutes);

// Root route to confirm the server is running
app.get("/", (req, res) => {
  res.send("Backend server is running and connected to MongoDB.");
});

// Database connection
dbConnect();

//cloudinary connection
cloudinaryConnection();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
