import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        marko: ['var(--font-marko)'],
      },
      colors: {
        theme: {
          main: 'rgb(var(--theme) / <alpha-value>)',
          DEFAULT: 'rgb(var(--theme) / <alpha-value>)',
          dark: 'rgb(var(--theme-dark) / <alpha-value>)',
        },
        black: {
          light: 'rgb(var(--black-light) / <alpha-value>)',
          DEFAULT: 'rgb(var(--black) / <alpha-value>)',
          lighter: 'rgb(var(--black-lighter) / <alpha-value>)',
        },
      },
      spacing: {
        header: 'var(--header-height)',
      },
    },
  },

  plugins: [],
}
export default config
