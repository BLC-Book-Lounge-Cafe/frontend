import { type Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"
import defaultTheme from "tailwindcss/defaultTheme"
// local
import { breakpoints } from "./src/shared/lib/breakpoints/constants"

export default <Config>{
  content: {
    files: ["./src/**/*.{js,jsx,ts,tsx,svg}"],
  },
  darkMode: ["selector", "[data-theme=\"dark\"]"],
  future: {
    hoverOnlyWhenSupported: true,
    // https://github.com/tailwindlabs/tailwindcss/issues/15000#issuecomment-2477150127
    disableColorOpacityUtilitiesByDefault: true,
  },
  theme: {
    screens: breakpoints,
    colors: {
      "inherit": "inherit",
      "current": "currentColor",
      "transparent": "transparent",
      //
      "white": "rgba(var(--color-white), <alpha-value>)",
      "black": "rgba(var(--color-black), <alpha-value>)",
      "accent": "rgba(var(--color-accent), <alpha-value>)",
      "positive": "rgba(var(--color-positive), <alpha-value>)",
      "warning": "rgba(var(--color-warning), <alpha-value>)",
      "negative": "rgba(var(--color-negative), <alpha-value>)",
      //
    },
    textColor: ({ theme }) => ({
      ...theme("colors"),
      "primary": "rgba(var(--text-default), 1)",
      "secondary": "rgba(var(--text-default), 0.6)",
      "tertiary": "rgba(var(--text-default), 0.3)",
    }),
    backgroundColor: ({ theme }) => ({
      ...theme("colors"),
      "canvas": "rgba(var(--bg-canvas), <alpha-value>)",
      "surface-accent": "rgba(var(--bg-surface-accent), <alpha-value>)",
      "surface-primary": "rgba(var(--bg-surface-primary), <alpha-value>)",
      "surface-secondary": "rgba(var(--bg-surface-secondary), <alpha-value>)",
      "surface-tertiary": "rgba(var(--bg-surface-tertiary), <alpha-value>)",
    }),
    fill: ({ theme }) => ({
      ...theme("backgroundColor"),
    }),
    minWidth: ({ theme }) => ({
      ...theme("width"),
    }),
    maxWidth: ({ theme }) => ({
      ...theme("width"),
    }),
    minHeight: ({ theme }) => ({
      ...theme("height"),
    }),
    maxHeight: ({ theme }) => ({
      ...theme("height"),
    }),
    fontFamily: {
      "sans": ["Inter", ...defaultTheme.fontFamily.sans],
      "serif": defaultTheme.fontFamily.serif,
      "mono": defaultTheme.fontFamily.mono,
    },
    borderColor: ({ theme }) => ({
      ...theme("colors"),
      DEFAULT: "rgba(var(--border-default), 0.3)",
      default: "rgba(var(--border-default), 0.3)",
    }),
    borderRadius: ({ theme }) => ({
      ...theme("spacing"),
      DEFAULT: theme("spacing.2"),
      "inherit": "inherit",
      "none": "0px",
      "full": "9999px",
    }),
    extend: {
      spacing: {
        ...breakpoints,
        "section": "5rem",
        "section-mobile": "3rem",
      },
      fontSize: {
        "hero": ["3.5rem", { lineHeight: "1.2", letterSpacing: "0px", fontWeight: "bold" }], // 56px
        "title-1": ["2rem", { lineHeight: "1.4", letterSpacing: "0px", fontWeight: "bold" }], // 32px
        "title-2": ["1.5rem", { lineHeight: "1.3", letterSpacing: "0px", fontWeight: "bold" }], // 24px
        "title-3": ["1.25rem", { lineHeight: "1.3", letterSpacing: "0px", fontWeight: "600" }], // 20px
        "body": ["1rem", { lineHeight: "1.6", letterSpacing: "0px", fontWeight: "normal" }], // 16px
        "body-small": ["0.875rem", { lineHeight: "1.5", letterSpacing: "0px", fontWeight: "normal" }], // 14px
        "caption": ["0.75rem", { lineHeight: "1.4", letterSpacing: "0px", fontWeight: "normal" }], // 12px
      },
      ringWidth: {
        DEFAULT: "4px",
      },
      ringColor: ({ theme }) => ({
        DEFAULT: theme("colors.accent/0.5"),
      }),
      transitionDuration: {
        DEFAULT: "200ms",
        "slow": "500ms",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".break-words": {
          "word-break": "break-word",
        },
      })
    }),
  ],
}
