type SectionIntroProps = {
  id: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionIntro({
  id,
  title,
  description,
  className,
}: SectionIntroProps) {
  return (
    <div className={className ?? "flex max-w-3xl flex-col gap-4 md:gap-5"}>
      <h2 id={id} className="text-h2 text-pretty text-foreground">
        {title}
      </h2>
      {description ? (
        <p className="text-body text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
