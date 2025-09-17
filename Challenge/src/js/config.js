tailwind.config = {
    theme: {
        extend: {
            fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui'] },
            colors: {
                brand: { 50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9', 800: '#5b21b6', 900: '#4c1d95' },
                mint: { 400: '#34d399', 500: '#10b981', 600: '#059669' }
            },
            boxShadow: {
                card: '0 14px 35px -10px rgba(124,58,237,.25), 0 10px 18px -12px rgba(16,185,129,.15)'
            },
            keyframes: {
                float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
                countup: { '0%': { opacity: .2 }, '100%': { opacity: 1 } }
            },
            animation: {
                float: 'float 6s ease-in-out infinite',
                countup: 'countup .6s ease-out 1'
            }
        }
    }
}