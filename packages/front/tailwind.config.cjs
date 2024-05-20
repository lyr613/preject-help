const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.tsx'],
    theme: {
        extend: {
            colors: {
                tzblue: '#66ccff',
                tzred: '#ee0000',
                tzgreen: '#66ffcc',
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
                '.tz-click-able': {
                    cursor: 'pointer',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        opacity: '0.8',
                    },
                },
                '.tz-click-able2': {
                    cursor: 'pointer',
                    transition: 'all 0.3s ease-in-out',
                    opacity: '0.8',
                    '&:hover': {
                        opacity: '1',
                    },
                },
                '.tz-click-notable': {
                    cursor: 'not-allowed',
                },
                '.tz-border': {
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    'border-collapse': 'collapse',
                },
                '.tz-w-line': {
                    borderTop: '0.5px solid #e5e5e5',
                },
            })
        }),
    ],
}
