/**
 * @type {string[]}
 */

export const publicRoutes = [
  "/",
  "/profile",
  "/about-us",
  "/contact-us",
  "/product/productInfos",
  "/auth/new-verification",
  "/api/upload",
  "/admin",
  "/admin/product/addProduct",
  "/admin/product/addProductSettings",
  "/api/get-session",
  "/api/products",

];

/**
 * @type {string[]}
 */

export const authRoutes = [
  "/api/login",
  "/login",
  "/api/signup",
  "/signup",
  "/api/verification-signup",
  "/api/verify-code",
  "/api/get-ip",
  "/api/check-user-exist",
  "/api/generate-tokens",
  "/api/send-verification-email",
  "/forgot-password",
  "/api/reset-password",
  "/auth/new-password",
  "/api/new-password",  
  "/api/ContactUs",

];

/**
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/";
