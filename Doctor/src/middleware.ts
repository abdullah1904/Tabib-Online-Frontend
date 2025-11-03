import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { AccountStatus } from "./utils/constants";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    if (!token) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
    if(token.verifiedAt === null && token.status === AccountStatus.PENDING){
      return NextResponse.redirect(new URL(`/verify-account?email=${token.email}`, req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/",
    "/profile",
    "/services/:path*",
    "/verification-applications/:path*"
  ],
};