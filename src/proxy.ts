import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales, isLocale } from "@/i18n/config";

function pickLocale(request: NextRequest) {
  const cookie = request.cookies.get("locale")?.value;
  if (cookie && isLocale(cookie)) return cookie;
  const header = request.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase().slice(0, 2));
  return preferred.find(isLocale) ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return;

  const locale = pickLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // _next, api, sitemap/robots, opengraph ve statik dosyalar hariç her yol.
  matcher: ["/((?!_next|api|sitemap\\.xml|robots\\.txt|.*\\..*).*)"],
};
