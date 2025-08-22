import * as React from "react";
import { cn } from "./utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary";
  size?: "sm" | "md" | "lg";
}

export function Button({ className, variant="default", size="md", ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants: Record<string,string> = {
    default: "bg-black text-white hover:bg-neutral-800",
    outline: "border border-neutral-300 text-neutral-900 hover:bg-neutral-50",
    secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200",
  };
  const sizes: Record<string,string> = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-4 text-base",
    lg: "h-14 px-6 text-base",
  };
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}
