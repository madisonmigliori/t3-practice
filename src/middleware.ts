import { NextResponse, type NextRequest } from "next/server";
import redirects from "~/app/redirects/redirects.json";

export default function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const currentUser = request.cookies.get("currentUser")?.value;

  if (url.pathname == "/") {
    url.pathname = "/listing";
    return NextResponse.redirect(url);
  }
  // if (currentUser && !request.nextUrl.pathname.startsWith("/login")) {
  //   return Response.redirect(new URL("/login", request.url));
  // }

  // if (!currentUser && !request.nextUrl.pathname.startsWith("/login")) {
  //   return Response.redirect(new URL("/login", request.url));
  // }
}
