import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { AccountStatus, UserRole } from "./utils/constants";

const COMMON_ROUTES = new Set([
  "/profile",
  "/profile/wallet",
]);

const USER_ONLY_ROUTES = [
  "/profile/appointments",
];

const isDoctorRoute = (pathname: string) =>
  pathname === "/doctor-panel" || pathname.startsWith("/doctor-panel/");

const isCallsRoute = (pathname: string) =>
  pathname === "/calls" || pathname.startsWith("/calls/");

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    if (!token) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    if (
      token.status === AccountStatus.PENDING &&
      token.verifiedAt === null
    ) {
      return NextResponse.redirect(
        new URL(`/verify-account?email=${token.email}`, req.url)
      );
    }

    if (![UserRole.USER, UserRole.DOCTOR].includes(token.role)) {
      return NextResponse.redirect(new URL("/api/auth/signout", req.url));
    }

    if (
      token.role === UserRole.DOCTOR &&
      USER_ONLY_ROUTES.some(
        (route) => pathname === route || pathname.startsWith(route + "/")
      )
    ) {
      return NextResponse.redirect(new URL("/doctors", req.url));
    }

    // Handle /calls/:id — accessible by both roles
    if (isCallsRoute(pathname)) {
      return NextResponse.next();
    }

    if (COMMON_ROUTES.has(pathname)) {
      return NextResponse.next();
    }

    if (token.role === UserRole.DOCTOR) {
      if (!isDoctorRoute(pathname)) {
        return NextResponse.redirect(new URL("/doctor-panel", req.url));
      }
    }

    if (token.role === UserRole.USER) {
      if (isDoctorRoute(pathname)) {
        return NextResponse.redirect(new URL("/doctors", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/doctor-panel/:path*",
    "/doctors/:path*",
    "/hospitals/:path*",
    "/tabib-bot",
    "/profile/:path*",
    "/calls/:path*",
  ],
};