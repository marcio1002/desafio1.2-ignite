interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  animation?: "grow" | "";
}

export function Skeleton({
  children,
  as,
  className = "",
  animation = "",
  ...props
}: SkeletonProps) {
  const Element = as ?? "div";
  return (
    <Element
      className={`skeleton ${className} ${
        animation ? `skeleton-${animation}` : ""
      }`}
      {...props}
    >
      {children}
    </Element>
  );
}
