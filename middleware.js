import { NextResponse } from "next/server";

const isRoute = (prefix, pathname) => {
  return pathname.startsWith(prefix);
};

export async function middleware (req) {
  const { pathname } = req.nextUrl;
  
  return NextResponse.next();
}

export const config = {
  matcher: []
};