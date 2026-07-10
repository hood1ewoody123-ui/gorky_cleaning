"use client";

import { useIncludedEditorMode } from "@/hooks/useIncludedEditorMode";

import { WhatsIncludedInteractive } from "./WhatsIncludedInteractive";

export function WhatsIncludedGate() {
  const isEditorMode = useIncludedEditorMode();

  return (
    <WhatsIncludedInteractive
      key={isEditorMode ? "editor" : "default"}
      isEditorMode={isEditorMode}
    />
  );
}
