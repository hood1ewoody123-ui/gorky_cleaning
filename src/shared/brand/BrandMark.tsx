import { cn } from "@/lib/utils";

type BrandMarkProps = {
  variant?: "light" | "dark";
  className?: string;
};

export function BrandMark({ variant = "light", className }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 232 185"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={cn(
        "aspect-[232/185] w-auto shrink-0",
        variant === "light" ? "text-white" : "text-primary",
        className,
      )}
    >
      <rect
        x="5.5"
        y="5.5"
        width="221"
        height="174"
        rx="24.5"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <path
        d="M35.712 128.76H49.28V59.64H35.712V49.4H94.848V41.336H105.216V80.12H94.72V59.896C94.72 59.8107 94.6773 59.768 94.592 59.768C94.592 59.6827 94.5493 59.64 94.464 59.64H59.904V128.76H80.384V139H35.712V128.76ZM111.462 128.76H125.03V59.64H111.462V49.4H148.326V59.64H135.654V89.464H151.398L175.974 59.64H161.126V49.4H198.246V59.64H188.134L160.614 93.176L192.742 128.76H202.47V139H162.022V128.76H178.79L151.654 98.808H135.654V128.76H147.302V139H111.462V128.76Z"
        fill="currentColor"
      />
      <rect
        x="5.5"
        y="5.5"
        width="221"
        height="174"
        rx="24.5"
        stroke="currentColor"
        strokeWidth="11"
      />
    </svg>
  );
}
