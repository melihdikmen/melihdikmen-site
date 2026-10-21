"use client";

import { useCallback, useSyncExternalStore } from "react";

export const TABS = ["home", "projects", "career", "skills", "contact"] as const;
export type Tab = (typeof TABS)[number];
export type Route = { tab: Tab; slug: string | null };

const HOME: Route = { tab: "home", slug: null };

function parse(hash: string): Route {
  const [tab, slug] = hash.replace(/^#/, "").split("/");
  if (!(TABS as readonly string[]).includes(tab)) return HOME;
  return { tab: tab as Tab, slug: slug || null };
}

/* Aynı hash için aynı nesne dönsün; useSyncExternalStore sonsuz döngüye girmesin. */
let cachedHash = "";
let cachedRoute: Route = HOME;
function snapshot(): Route {
  const h = typeof window === "undefined" ? "" : window.location.hash;
  if (h !== cachedHash) {
    cachedHash = h;
    cachedRoute = parse(h);
  }
  return cachedRoute;
}
function subscribe(cb: () => void) {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
}

/** Sekme ve detay durumu URL hash'inde yaşar: #projects, #projects/param. */
export function useAppRoute() {
  const route = useSyncExternalStore(subscribe, snapshot, () => HOME);
  const navigate = useCallback((tab: Tab, slug?: string) => {
    const next = slug ? `#${tab}/${slug}` : `#${tab}`;
    if (window.location.hash === next) return;
    window.location.hash = next;
  }, []);
  return { ...route, navigate };
}
