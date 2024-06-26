import authenticate from "next-auth";
import { NextResponse, type NextRequest } from "next/server";
import redirects from "~/app/redirects/redirects.json";

export default function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // if (isAuthenticated) {
  //   return NextResponse.next();
  // }

  if (url.pathname == "/") {
    url.pathname = "/listing";
    return NextResponse.redirect(url);
  }
}
