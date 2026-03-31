import { extendTailwindMerge } from "tailwind-merge"

export const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "text-color": ["text-primary", "text-secondary", "text-tertiary", "text-accent", "text-positive", "text-warning", "text-negative"],
      "font-size": ["text-title-1", "text-title-2", "text-body", "text-caption"],
    },
  },
})
