"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function useIncludedEditorMode(): boolean {
  const searchParams = useSearchParams();

  return useMemo(() => searchParams.get("edit") === "included", [searchParams]);
}
