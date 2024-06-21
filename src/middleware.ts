import { NextResponse, type NextRequest } from "next/server";
import redirects from "~/app/redirects/redirects.json";

export default function middleware(request: NextRequest) {
  const url = request.nextUrl;

  const localRedirect = redirects["/"];
  if (!localRedirect) {
    return NextResponse.redirect(new URL("/listing", url));
  } else {
    return NextResponse.next();
  }
}
