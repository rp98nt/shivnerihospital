import { auth } from "@/lib/auth";
import {
  canAccessPersonnelPath,
  getPersonnelHomePath,
} from "@/lib/personnel-access";
import { NextResponse } from "next/server";

export default auth((request) => {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/personnel/login";
  const isUnauthorizedPage = pathname === "/personnel/unauthorized";
  const isPersonnelRoot =
    pathname === "/personnel" || pathname === "/personnel/";
  const isAuthenticated = !!request.auth?.user;

  if (isLoginPage) {
    if (isAuthenticated && request.auth?.user.role) {
      return NextResponse.redirect(
        new URL(getPersonnelHomePath(request.auth.user.role), request.url),
      );
    }

    return NextResponse.next();
  }

  if (!isAuthenticated) {
    const loginUrl = new URL("/personnel/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isUnauthorizedPage || isPersonnelRoot) {
    return NextResponse.next();
  }

  const role = request.auth?.user.role;
  if (role && !canAccessPersonnelPath(role, pathname)) {
    return NextResponse.redirect(
      new URL("/personnel/unauthorized", request.url),
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/personnel", "/personnel/:path*"],
};
