import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: '#1e1f21',
                foreground: 'var(--foreground)',
                lightGray: '#2c2c2e',
                richPurple: '#671f92',
                lightBrown: '#c1a56d',
                heat: '#cb3535',
            },
        },
    },
    plugins: [],
}
export default config
