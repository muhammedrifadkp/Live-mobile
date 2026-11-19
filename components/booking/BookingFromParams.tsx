"use client";

import { useSyncExternalStore } from "react";
import { BRANDS, PROBLEMS } from "@/lib/constants";
import { BookingForm, type BookingInitial } from "./BookingForm";

const subscribe = (onChange: () => void) => {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
};
const getSearch = () => window.location.search;
const getServerSearch = () => "";

/**
 * Reads ?problem=screen,battery&brand=Samsung (from the home problem grid, the quote card or the
 * services list) and opens the booking form with them filled in.
 * Reads location.search directly (no Suspense boundary), so the form hydrates at once.
 */
export function BookingFromParams() {
  const search = useSyncExternalStore(subscribe, getSearch, getServerSearch);
  const params = new URLSearchParams(search);
  const brandParam = params.get("brand") ?? "";
  const problemIds = (params.get("problem") ?? "").split(",").filter(Boolean);

  const needs = PROBLEMS.filter((p) => problemIds.includes(p.id)).map((p) => p.title);
  const brand = (BRANDS as readonly string[]).includes(brandParam) ? brandParam : "";

  const initial: BookingInitial | undefined = needs.length || brand ? { service: "Repair", brand, needs } : undefined;

  // Re-mount when the query changes so the form picks up the new values.
  return <BookingForm key={search} initial={initial} />;
}
