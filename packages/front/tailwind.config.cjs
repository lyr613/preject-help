const plugin = require('tailwindcss/plugin')

const with_opacity =
    (variable) =>
    ({ opacityValue }) =>
        opacityValue === undefined ? `rgb(var(${variable}))` : `rgba(var(${variable}), ${opacityValue})`

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.tsx'],
    theme: {
        extend: {
            colors: {
                tzblue: '#66ccff',
                tzred: '#ee0000',
                tzgreen: '#66ffcc',
                primary: {
                    DEFAULT: 'rgba(var(--color-primary), <alpha-value>)',
                    50: 'var(--color-primary-50)',
                    100: 'var(--color-primary-100)',
                    200: 'var(--color-primary-200)',
                    300: 'var(--color-primary-300)',
                    400: 'var(--color-primary-400)',
                    500: 'var(--color-primary-500)',
                    600: 'var(--color-primary-600)',
                    700: 'var(--color-primary-700)',
                },
            },
            keyframes: {
                /**  */
                'tl-opacity-enter': {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
            },
            animation: {
                'tl-opacity-enter': 'tl-opacity-enter 0.3s ease-out',
            },
        },
    },
    plugins: [
        plugin(function ({ addComponents, theme, addUtilities }) {
            addUtilities({
                '.text-0': {
                    fontSize: '0',
                },
            })
            addComponents({
                '.tl-click-able': {
                    cursor: 'pointer',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        opacity: '0.8',
                    },
                },
                '.tl-click-able2': {
                    cursor: 'pointer',
                    transition: 'all 0.3s ease-in-out',
                    opacity: '0.8',
                    '&:hover': {
                        opacity: '1',
                    },
                },
                '.tl-click-notable': {
                    cursor: 'not-allowed',
                },
            })
        }),
    ],
}
