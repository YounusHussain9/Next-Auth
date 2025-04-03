//accesible to the public these routes do not require authentication
export const publicRoutes = ["/", "/auth/new-verification"];

// these are used for authentication these routes will redirect logged in users to the setting
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

//the prefix for api authentication routes that start with this prefix are used for api authentication purpose
export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/settings";
