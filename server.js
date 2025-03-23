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
        ? "*" // Allow all origins in production - Vercel will handle this
        : "http://localhost:1234",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Parse JSON bodies
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Create axios instance with default config
const swiggyAPI = axios.create({
  timeout: 10000, // 10 seconds timeout
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
  },
});

// Create a proxy endpoint for restaurant list
app.get("/api/restaurants", async (req, res) => {
  try {
    const { lat = "12.9715987", lng = "77.5945627" } = req.query;

    console.log(`Fetching restaurants with lat=${lat}, lng=${lng}`);

    const response = await swiggyAPI.get(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );

    // Validate response data structure
    if (!response.data || !response.data.data) {
      console.error(
        "Invalid response structure from Swiggy API:",
        response.data
      );
      return res.status(500).json({
        error: "Invalid response from Swiggy API",
        details: "The expected data structure was not found",
      });
    }

    // Log the structure of the response
    console.log(
      "Restaurant cards structure:",
      response.data.data.cards && response.data.data.cards.length > 0
        ? `Found ${response.data.data.cards.length} cards`
        : "No cards found"
    );

    // Check if the expected structure is present
    const hasRestaurants =
      response.data.data.cards &&
      response.data.data.cards.length > 1 &&
      response.data.data.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;

    console.log("Has restaurants structure:", hasRestaurants ? "Yes" : "No");

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching from Swiggy:", error);

    // Handle different types of errors
    if (error.code === "ECONNABORTED") {
      return res
        .status(504)
        .json({ error: "Timeout connecting to Swiggy API" });
    }

    if (error.response) {
      // The request was made and the server responded with a status code
      return res.status(error.response.status).json({
        error: "Error from Swiggy API",
        status: error.response.status,
        details: error.message,
      });
    } else if (error.request) {
      // The request was made but no response was received
      return res
        .status(502)
        .json({ error: "No response from Swiggy API", details: error.message });
    } else {
      // Something happened in setting up the request
      return res
        .status(500)
        .json({ error: "Error fetching data", details: error.message });
    }
  }
});

// Create a proxy endpoint for restaurant menu
app.get("/api/menu/:resId", async (req, res) => {
  try {
    const { resId } = req.params;
    const { lat = "12.9715987", lng = "77.5945627" } = req.query;

    const response = await swiggyAPI.get(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${resId}&submitAction=ENTER`
    );

    // Validate response data structure
    if (!response.data || !response.data.data) {
      console.error(
        "Invalid menu response structure from Swiggy API:",
        response.data
      );
      return res.status(500).json({
        error: "Invalid menu response from Swiggy API",
        details: "The expected data structure was not found",
      });
    }

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching menu from Swiggy:", error);

    // Handle different types of errors
    if (error.code === "ECONNABORTED") {
      return res
        .status(504)
        .json({ error: "Timeout connecting to Swiggy API" });
    }

    if (error.response) {
      return res.status(error.response.status).json({
        error: "Error from Swiggy API",
        status: error.response.status,
        details: error.message,
      });
    } else if (error.request) {
      return res
        .status(502)
        .json({ error: "No response from Swiggy API", details: error.message });
    } else {
      return res
        .status(500)
        .json({ error: "Error fetching menu data", details: error.message });
    }
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
    if (req.path.startsWith("/api/")) {
      return res.status(404).json({ error: "API endpoint not found" });
    }
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    details: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} in ${
      process.env.NODE_ENV || "development"
    } mode`
  );
});
