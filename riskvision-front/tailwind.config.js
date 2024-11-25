// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ['./src/**/*.{js,jsx,ts,tsx}'],
//   theme: {
//     extend: {
      
//       colors:{
//         '508C9B': '#508C9B',
//         '134B70': '#134B70',
//         '201E43': '#201E43',
//         'white': '#EEEEEE',
//         primary: {
//           50: '#f5f8fc',
//           100: '#e9f0f9',
//           200: '#d6e4f0',  // The light blue/grey
//           300: '#a3c5e4',
//           400: '#669ed3',
//           500: '#1e56a0',  // The main blue
//           600: '#1b4d90',
//           700: '#163172',  // The navy
//           800: '#122a5f',
//           900: '#0e1f47',
//         },
//         secondary: {
//           50: '#f9f9f9',
//           100: '#f6f6f6',  // The white shade
//           200: '#e5e5e5',
//           300: '#d4d4d4',
//           400: '#a3a3a3',
//           500: '#737373',
//           600: '#525252',
//           700: '#404040',
//           800: '#262626',
//           900: '#171717',
//         },
//         background: {
//           DEFAULT: '#ffffff',
//           secondary: '#f8fafc',
//           tertiary: '#f1f5f9',
//         },
//         // Surface colors for cards, modals, etc.
//         surface: {
//           DEFAULT: '#ffffff',
//           secondary: '#f8fafc',
//           tertiary: '#f1f5f9',
//         },
//         // Text colors
//         text: {
//           DEFAULT: '#0f172a',    // For primary text
//           secondary: '#475569',  // For secondary text
//           tertiary: '#64748b',   // For less important text
//           disabled: '#94a3b8',   // For disabled text
//         },
//         // Border colors
//         border: {
//           DEFAULT: '#e2e8f0',
//           secondary: '#cbd5e1',
//           focus: '#1e56a0',      // Using your primary blue
//         },
//         // Status colors
//         success: {
//           50: '#f0fdf4',
//           500: '#22c55e',
//           700: '#15803d',
//         },
//         error: {
//           50: '#fef2f2',
//           500: '#ef4444',
//           700: '#b91c1c',
//         },
//         warning: {
//           50: '#fffbeb',
//           500: '#f59e0b',
//           700: '#b45309',
//         },
//         info: {
//           50: '#f0f9ff',
//           500: '#1e56a0',  // Using your primary blue
//           700: '#163172',  // Using your navy
//         }
//       }
//     },
//   },
//   plugins: [],
// }


/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["src/**/*.{js,jsx}", "components/**/*.{js,jsx}",'./pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',],
  theme: {
  	extend: {
  		colors: {
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
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
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
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
