import { twMerge } from "tailwind-merge";

// Merge component-internal classes with a caller-supplied `class` prop.
// tailwind-merge dedupes conflicting Tailwind utilities (last wins) and
// leaves non-Tailwind classes (s-button, theme-default, btn-filled, ...) as-is,
// so caller overrides only what they actually target.
export function cn(...inputs) {
  return twMerge(inputs.filter(Boolean).join(" "));
}