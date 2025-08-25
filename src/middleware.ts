import { NextRequest, NextResponse } from "next/server";
import { LOGIN_COOKIE_NAME_VARIABLE } from "./lib/constants";
import { checkJWT } from "./lib/login/manage-login";

export async function middleware(request: NextRequest) {
  const checkIfUrlIsForLoginPage =
    request.nextUrl.pathname.startsWith("/admin/login");

  const checkIfUrlISForAdminPage =
    request.nextUrl.pathname.startsWith("/admin");

  const isGetRequest = request.method;

  const hasUserAuth = checkIfUrlISForAdminPage && !checkIfUrlIsForLoginPage;

  const shouldBeRedirect = hasUserAuth && isGetRequest;

  if (!shouldBeRedirect) {
    return NextResponse.next();
  }

  const JWTSessionCookie = request.cookies.get(
    LOGIN_COOKIE_NAME_VARIABLE
  )?.value;

  if (!JWTSessionCookie) {
    const urlRedirectForLoginPage = new URL("/admin/login", request.url);
    return NextResponse.redirect(urlRedirectForLoginPage);
  }

  const hasUser = await checkJWT(JWTSessionCookie);

  if (!hasUser) {
    return NextResponse.json("User not found.", { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  mather: "/admin/:path*",
};
