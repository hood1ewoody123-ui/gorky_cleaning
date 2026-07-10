"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { LeadDialogVariant } from "@/constants/lead-forms";
import { trackCtaOpen } from "@/lib/analytics/yandexMetrika";

export type OpenLeadDialogOptions = {
  variant?: LeadDialogVariant;
  source: string;
  service?: string;
  area?: string;
  metadata?: Record<string, unknown>;
};

type LeadDialogContextValue = {
  isOpen: boolean;
  variant: LeadDialogVariant;
  source: string;
  service?: string;
  area?: string;
  metadata?: Record<string, unknown>;
  openLeadDialog: (options: OpenLeadDialogOptions) => void;
  closeLeadDialog: () => void;
};

const LeadDialogContext = createContext<LeadDialogContextValue | null>(null);

type LeadDialogProviderProps = {
  children: ReactNode;
};

export function LeadDialogProvider({ children }: LeadDialogProviderProps) {
  const [state, setState] = useState<{
    isOpen: boolean;
    variant: LeadDialogVariant;
    source: string;
    service?: string;
    area?: string;
    metadata?: Record<string, unknown>;
  }>({
    isOpen: false,
    variant: "main",
    source: "unknown",
  });

  const openLeadDialog = useCallback((options: OpenLeadDialogOptions) => {
    trackCtaOpen(options.source, options.variant ?? "main");

    setState({
      isOpen: true,
      variant: options.variant ?? "main",
      source: options.source,
      service: options.service,
      area: options.area,
      metadata: options.metadata,
    });
  }, []);

  const closeLeadDialog = useCallback(() => {
    setState((current) => ({ ...current, isOpen: false }));
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      openLeadDialog,
      closeLeadDialog,
    }),
    [state, openLeadDialog, closeLeadDialog],
  );

  return (
    <LeadDialogContext.Provider value={value}>
      {children}
    </LeadDialogContext.Provider>
  );
}

export function useLeadDialog() {
  const context = useContext(LeadDialogContext);

  if (!context) {
    throw new Error("useLeadDialog must be used within LeadDialogProvider");
  }

  return context;
}
