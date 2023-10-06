/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.{html,js}"],
    theme: {
        extend: {
            keyframes: {
                wiggle: {
                    "0%, 100%": {
                        transform: "rotate(-5deg)",
                        transform: "scale(1.2)",
                    },
                    "50%": {
                        transform: "rotate(5deg)",
                        transform: "scale(0.8)",
                    },
                },
            },
            animation: {
                wiggle: "wiggle 0.5s ease-in-out infinite",
            },
        },
    },
    plugins: [],
};
