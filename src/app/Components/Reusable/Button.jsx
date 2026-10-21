import Link from "next/link";

const variants = {
  // Default button: bluee (tumne kaha tha buttons bluee hone chahiye)
  primary:
    "bg-bluee text-white hover:bg-blackk",
  // Blue background wale sections ke liye (jaise PlanningEntry): yelloww
  secondary:
    "bg-yelloww text-blackk hover:bg-grayy",
  outline:
    "border-2 border-bluee text-bluee hover:bg-bluee hover:text-white",
  ghost:
    "text-bluee hover:bg-grayy",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yelloww disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}