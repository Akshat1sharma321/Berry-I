const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS with specific options
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? [
            "https://berry-i.vercel.app",
            "https://berry-i-git-main-akshat122805s-projects.vercel.app",
          ]
        : "http://localhost:1234",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Parse JSON bodies
app.use(express.json());

// Create a proxy endpoint for restaurant list
app.get("/api/restaurants", async (req, res) => {
  try {
    const { lat = "12.9715987", lng = "77.5945627" } = req.query;
    const response = await axios.get(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching from Swiggy:", error);
    res.status(500).json({
      error: "Failed to fetch data from Swiggy",
      details: error.message,
    });
  }
});

// Create a proxy endpoint for restaurant menu
app.get("/api/menu/:resId", async (req, res) => {
  try {
    const { resId } = req.params;
    const response = await axios.get(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=${resId}&submitAction=ENTER`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching menu from Swiggy:", error);
    res.status(500).json({
      error: "Failed to fetch menu data from Swiggy",
      details: error.message,
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  // Serve static files from the dist directory
  app.use(express.static(path.join(__dirname, "dist")));

  // Handle all other routes by serving the main HTML file
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something broke!",
    details: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} in ${
      process.env.NODE_ENV || "development"
    } mode`
  );
});
