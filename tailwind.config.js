/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  safelist: [
    'bg-blue-100', 'text-blue-700', 'dark:bg-blue-900/30', 'dark:text-blue-300',
    'bg-green-100', 'text-green-700', 'dark:bg-green-900/30', 'dark:text-green-300',
    'bg-purple-100', 'text-purple-700', 'dark:bg-purple-900/30', 'dark:text-purple-300',
    'bg-indigo-100', 'text-indigo-700', 'dark:bg-indigo-900/30', 'dark:text-indigo-300',
    'bg-pink-100', 'text-pink-700', 'dark:bg-pink-900/30', 'dark:text-pink-300',
    'bg-yellow-100', 'text-yellow-700', 'dark:bg-yellow-900/30', 'dark:text-yellow-300',
    'bg-orange-100', 'text-orange-700', 'dark:bg-orange-900/30', 'dark:text-orange-300',
    'bg-red-100', 'text-red-700', 'dark:bg-red-900/30', 'dark:text-red-300',
    'bg-cyan-100', 'text-cyan-700', 'dark:bg-cyan-900/30', 'dark:text-cyan-300',
    'bg-amber-100', 'text-amber-700', 'dark:bg-amber-900/30', 'dark:text-amber-300',
    'bg-gray-100', 'text-gray-700', 'dark:bg-gray-800', 'dark:text-gray-300',
    'bg-primary', 'text-primary', 'border-primary',
    'bg-secondary', 'text-secondary', 'border-secondary',
    'bg-accent', 'text-accent', 'border-accent',
    'hover:bg-primary/5', 'border-l-primary',
    'hover:bg-secondary/5', 'border-l-secondary',
    'hover:bg-accent/5', 'border-l-accent'
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
