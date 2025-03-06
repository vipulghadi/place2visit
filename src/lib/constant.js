const ENV = process.env.APP_ENV || "local"; // Default to "development"

const CONFIG = {
  dev: {
    BASE_URL: "http://localhost:3000",
  },
  local: {
    BASE_URL: "http://localhost:3000", 
  },
  prod: {
    BASE_URL: "https://place2visit.online",
  },
};

export const BASE_URL = CONFIG[ENV].BASE_URL;

export const DEFAULT_BLOG_IMAGE="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

