import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
			"./1777213102393850157.html"
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				oswald: ['Inter', 'Akrobat', 'Helvetica Neue', 'sans-serif'],
				golos: ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
				inter: ['Inter', 'sans-serif'],
			},
			colors: {
				/* Стиль "Самолёт" — лёгкий, воздушный, современный */
				'sam-blue': '#1162FF',
				'sam-blue-dark': '#0A4DDB',
				'sam-blue-soft': '#E8F0FF',
				'sam-bg': '#F5F6F8',
				'sam-surface': '#FFFFFF',
				'sam-border': '#E6E9EE',
				'sam-text': '#0E1A2B',
				'sam-text-soft': '#6B7280',
				'sam-pill': '#EEF1F5',

				/* Совместимость со старым кодом — мягкие тона на светлом */
				'gs-navy': '#0E1A2B',
				'gs-navy-dark': '#0A1422',
				'gs-gray': '#6B7280',
				'gs-smoky-blue': '#1162FF',
				'gs-smoky-green': '#2EB264',
				'gs-yellow': '#1162FF',
				'gs-orange': '#0A4DDB',
				'gs-blue': '#1162FF',
				'gs-accent': '#1162FF',
				'gs-light': '#F5F6F8',

				/* Совместимость со старыми классами */
				'build-orange': '#1A2D4D',
				'build-yellow': '#FCDD2B',
				'build-dark': '#1A2D4D',
				'build-card': '#22375C',
				'build-border': '#3A4C67',
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fadeIn 0.4s ease-out forwards',
				'slide-up': 'slideUp 0.5s ease-out forwards',
				'pulse-orange': 'pulseOrange 2s ease-in-out infinite',
			},
			keyframes: {
				...{},
				fadeIn: {
					from: { opacity: '0', transform: 'translateY(12px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				slideUp: {
					from: { opacity: '0', transform: 'translateY(24px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				pulseOrange: {
					'0%, 100%': { boxShadow: '0 0 0 0 rgba(30,58,138,0.5)' },
					'50%': { boxShadow: '0 0 0 8px rgba(30,58,138,0)' },
				},
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;