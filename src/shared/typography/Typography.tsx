import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

const headingStyles: Record<HeadingLevel, string> = {
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  h4: "text-h4",
};

type HeadingProps = React.ComponentProps<HeadingLevel> & {
  as?: HeadingLevel;
};

export function Heading({ as: Tag = "h2", className, ...props }: HeadingProps) {
  return <Tag className={cn(headingStyles[Tag], className)} {...props} />;
}

type TextProps = React.ComponentProps<"p"> & {
  variant?: "body" | "small" | "caption" | "lead";
  muted?: boolean;
};

const textVariants = {
  body: "text-body",
  small: "text-small",
  caption: "text-caption uppercase tracking-wide",
  lead: "text-body md:text-xl leading-relaxed",
} as const;

export function Text({
  variant = "body",
  muted = false,
  className,
  ...props
}: TextProps) {
  return (
    <p
      className={cn(
        textVariants[variant],
        muted && "text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
