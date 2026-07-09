import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const tagVariants = cva(
  "inline-flex items-center justify-center rounded-full border border-transparent px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
  {
    variants: {
      variant: {
        default: "bg-muted text-foreground hover:bg-muted/80",
        active: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline:
          "border-border bg-surface text-foreground hover:border-primary/30 hover:bg-muted/50",
        ghost:
          "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type TagProps = React.ComponentProps<"button"> &
  VariantProps<typeof tagVariants> & {
    asChild?: false;
  };

function Tag({
  className,
  variant,
  size,
  type = "button",
  ...props
}: TagProps) {
  return (
    <button
      type={type}
      data-slot="tag"
      className={cn(tagVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Tag, tagVariants };
