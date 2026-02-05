#!/bin/bash
set -e

# Initialize package.json
npm init -y

# Install core dependencies
npm install next react react-dom typescript @types/react @types/react-dom @types/node tailwindcss postcss autoprefixer eslint eslint-config-next lucide-react clsx tailwind-merge framer-motion

# Create folder structure
mkdir -p src/app src/components src/lib src/hooks src/styles

# Create layout.tsx
cat << 'LAYOUT_EOF' > src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'VoxFlow AI | Generative Music for Creators',
  description: 'AI platform that learns your unique voice and writes beat-synced songs to your instrumentals.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-slate-950 text-slate-50`}>
        {children}
      </body>
    </html>
  );
}
LAYOUT_EOF

# Create page.tsx
cat << 'PAGE_EOF' > src/app/page.tsx
import { Music, Mic2, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-950">
      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32 flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8">
            <Music className="w-4 h-4" />
            <span>Next-Gen Music Creation</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-outfit mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
            Your Voice. Your Beat. <br /> AI Synchronized.
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            VoxFlow AI learns your unique tone and emotional delivery to write and perform original songs over any instrumental.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold transition-all flex items-center gap-2">
              Start Training Your Voice <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-semibold transition-all">
              Explore Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-20 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 transition-transform hover:scale-105">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mic2 className="text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 font-outfit">Isolated Voice Models</h3>
            <p className="text-slate-400">Train private AI models on your own voice with full legal ownership.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 transition-transform hover:scale-105">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Music className="text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 font-outfit">Beat Intelligence</h3>
            <p className="text-slate-400">AI analyzes BPM, key, and song structure for perfect synchronization.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 transition-transform hover:scale-105">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Music className="text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 font-outfit">Original Songwriting</h3>
            <p className="text-slate-400">Generate beat-aware lyrics and melodies tailored to your style.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
PAGE_EOF

# Create globals.css
cat << 'CSS_EOF' > src/app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #020617;
  --foreground: #f8fafc;
}

body {
  color: var(--foreground);
  background: var(--background);
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
CSS_EOF

# Create tailwind.config.ts
cat << 'TAILWIND_EOF' > tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        outfit: ['var(--font-outfit)'],
      },
      colors: {
        slate: {
          950: '#020617',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;
TAILWIND_EOF

# Create postcss.config.js
cat << 'POSTCSS_EOF' > postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
POSTCSS_EOF

# Create tsconfig.json
cat << 'TSCONFIG_EOF' > tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
TSCONFIG_EOF

# Create next.config.ts (or js)
cat << 'NEXT_EOF' > next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
NEXT_EOF

echo "Project initialized successfully!"
