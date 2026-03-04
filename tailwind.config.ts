// Tailwind CSS 설정 - NYANG GAMES 브랜드 컬러 적용
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#FF90B3',
          'pink-light': '#FFB4C8',
          'pink-soft': '#FFD6E5',
          mint: '#5DD8A8',
          'mint-light': '#96EBC8',
          lavender: '#B794F4',
          'lavender-light': '#D4B5FF',
          cream: '#FFF5E6',
          bg: '#FFF8FA',
          text: '#3D2644',
          'text-sub': '#8B6B88',
          'text-muted': '#B9A0B7',
        },
      },
      fontFamily: {
        logo: ['Varela Round', 'sans-serif'],
        body: ['Pretendard', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(61,38,68,0.08)',
        'card-hover': '0 4px 20px rgba(61,38,68,0.12)',
        'modal': '0 8px 32px rgba(61,38,68,0.16)',
        'pink': '0 4px 20px rgba(255,144,179,0.30)',
        'mint': '0 4px 20px rgba(93,216,168,0.30)',
        'lavender': '0 4px 20px rgba(183,148,244,0.30)',
      },
    },
  },
  plugins: [],
}

export default config
