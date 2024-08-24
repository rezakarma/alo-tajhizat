import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  productRoute,
  publicRoutes,
} from "./route";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  console.log('login: ', isLoggedIn)

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  const isProductRoute = nextUrl.pathname.startsWith(productRoute)

  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);

  // const isPublicRoutes = publicRoutes.some((route) => {
  //   if (typeof route === 'string') {
  //     return nextUrl.pathname === route;
  //   } else {
  //     return route(nextUrl.pathname);
  //   }
  // });

  

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if (isApiAuthRoute) {
    return null;
  }

  if(isProductRoute){
    return null;
  }
  

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if(!isLoggedIn && !isPublicRoutes) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  

  return null

});


// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

