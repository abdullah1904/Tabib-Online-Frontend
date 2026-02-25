import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { AccountStatus, UserRole } from "./utils/constants";

const COMMON_ROUTES = ["/profile", "/profile/wallet"];

const USER_ONLY_ROUTES = ["/profile/appointments"];

const isDoctorRoute = (pathname: string) =>
  pathname === "/doctor" || pathname.startsWith("/doctor/");

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    if (!token) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    if (token.verifiedAt === null && token.status === AccountStatus.PENDING) {
      return NextResponse.redirect(
        new URL(`/verify-account?email=${token.email}`, req.url)
      );
    }

    if (token.role !== UserRole.USER && token.role !== UserRole.DOCTOR) {
      return NextResponse.redirect(new URL("/api/auth/signout", req.url));
    }

    if (COMMON_ROUTES.some((path) => pathname === path || pathname.startsWith(path + "/"))) {
      return NextResponse.next();
    }

    if (
      token.role === UserRole.DOCTOR &&
      USER_ONLY_ROUTES.some((path) => pathname === path || pathname.startsWith(path + "/"))
    ) {
      return NextResponse.redirect(new URL("/doctors", req.url));
    }

    if (token.role === UserRole.DOCTOR && !isDoctorRoute(pathname)) {
      return NextResponse.redirect(new URL("/doctor", req.url));
    }

    if (token.role === UserRole.USER && isDoctorRoute(pathname)) {
      return NextResponse.redirect(new URL("/doctors", req.url));
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
    "/doctor/:path*",
    "/doctors/:path*",
    "/hospitals/:path*",
    "/tabib-bot",
    "/profile/:path*",
  ],
};