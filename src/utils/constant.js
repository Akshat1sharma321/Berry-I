export const LOGO_CDN =
  "https://cdn-icons-png.flaticon.com/512/13482/13482249.png";
export const IMG_CDN =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

export const SEARCH_CDN =
  "https://cdn-icons-png.flaticon.com/512/17280/17280511.png";

// Use environment detection for API endpoints
export const API_BASE_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3001";

export const RESTAURANTS_API = `${API_BASE_URL}/api/restaurants`;

export const RES_MENU = `${API_BASE_URL}/api/menu/`;

export const FOOD_IMG =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/";
