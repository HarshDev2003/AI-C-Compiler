/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: '#1e1e1e',
                darker: '#131313',
                panel: '#252526',
                primary: '#007acc',
            }
        },
    },
    plugins: [],
}
