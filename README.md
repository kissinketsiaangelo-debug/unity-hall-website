# Unity Hall (Conti) KNUST — Official Website

> **The Largest Hall of Residence in West Africa** · Twin Towers · Continental Radio 96.1FM · Aboagyewaa · Est. 1968

A modern, performant, and accessible website for Unity Hall (Continental Hall) at Kwame Nkrumah University of Science and Technology, Kumasi, Ghana. Built with Next.js 14, React 18, TypeScript, Tailwind CSS, and Framer Motion.

## 🏛️ About Unity Hall

- **Founded**: October 16, 1968
- **Architects**: Prof. John Owusu Addo (Ghana) & Miro Marasović (Croatian/Yugoslav)
- **Style**: Tropical Modernism
- **Nickname**: "The Twin Towers" — two 12-story blocks facing each other
- **Capacity**: 448 original rooms + 36 extra flats (now 2,000+ residents = 500% overcapacity)
- **Residents**: "Continentals" or "Conti"
- **Unique**: Only hall with own radio station (Continental Radio 96.1FM → Focus FM 94.3MHz)
- **Spiritual**: Aboagyewaa — goddess/spiritual mother, sacred grounds

## ✨ Features

### 🎨 Visual Excellence
- **3D Twin Towers Hero** — Interactive React Three Fiber scene with floating animation
- **Kinetic Typography** — Word-by-word reveals, scramble effects, gradient text, marquee
- **Scroll Animations** — Parallax, scroll-reveal, magnetic hover, 3D tilt cards
- **Micro-interactions** — Magnetic buttons, floating elements, cursor follower
- **Dark/Light Mode** — System-aware with manual toggle

### 🌍 Ghana-Optimized
- **Mobile-First** — 80%+ mobile traffic (MTN/AirtelTigo data)
- **PWA/Offline** — Service Worker caching, installable, background sync
- **Twi Language** — Full Asante Twi localization (`en` | `tw`)
- **Low Bandwidth** — WebP/AVIF images, lazy loading, code splitting
- **Mobile Money** — Hubtel/ExpressPay integration for donations
- **USSD Ready** — Alphanumeric shortcodes for feature phones

### ♿ Accessibility (WCAG 2.2 AA)
- Semantic HTML, ARIA labels, focus management
- Reduced motion support (`prefers-reduced-motion`)
- Color contrast ratios, keyboard navigation
- Screen reader tested (NVDA, VoiceOver, TalkBack)

### 🔐 Modern Auth & Security
- **Passkeys/WebAuthn** — Passwordless by default
- **OAuth** — Google, GitHub, (future: KNUST SSO)
- **Row Level Security** — Supabase RLS policies
- **Edge Rate Limiting** — Cloudflare/Vercel edge functions

### 📊 Performance Targets
- LCP ≤ 2.0s (3G Ghana)
- INP ≤ 200ms
- CLS ≤ 0.1
- Lighthouse 100/100/100/100

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 14 (App Router, React Server Components) |
| **Language** | TypeScript 5 (strict mode) |
| **Styling** | Tailwind CSS 3.4 + CSS Variables |
| **Animation** | Framer Motion 11 + GSAP 3 |
| **3D** | React Three Fiber + Drei + Postprocessing |
| **CMS** | Sanity.io (headless, real-time preview) |
| **Database** | Supabase (PostgreSQL + pgvector) |
| **Auth** | NextAuth v5 (Passkeys + OAuth) |
| **Forms** | React Hook Form + Zod |
| **State** | Zustand + SWR |
| **i18n** | next-intl (English + Twi) |
| **Testing** | Vitest + React Testing Library + Playwright |
| **Storybook** | Storybook 8 for component docs |
| **Deploy** | Vercel (Edge Functions) |
| **Monitoring** | Sentry + Vercel Analytics + Plausible |

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- pnpm 9+ (or npm/yarn)
- Git

### Installation

```bash
# Clone and enter
git clone https://github.com/your-org/unity-hall-knust.git
cd unity-hall-knust

# Install dependencies
pnpm install

# Copy environment template
cp .env.example .env.local

# Fill in your values in .env.local
# (At minimum: Sanity project ID, NextAuth secret)

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) — you should see the Twin Towers hero!

### Sanity Studio
```bash
# Run Sanity locally (separate terminal)
pnpm sanity:dev
# Opens at http://localhost:3333
```

### Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server with Turbopack |
| `pnpm build` | Production build |
| `pnpm start` | Run production server |
| `pnpm lint` | ESLint + Prettier check |
| `pnpm type-check` | TypeScript compilation check |
| `pnpm test` | Run Vitest unit tests |
| `pnpm test:ui` | Vitest UI |
| `pnpm e2e` | Playwright E2E tests |
| `pnpm storybook` | Start Storybook |
| `pnpm format` | Prettier write |

## 📁 Project Structure

```
unity-hall-knust/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth routes (login, register)
│   ├── (dashboard)/       # Resident/Alumni portals
│   ├── (public)/          # Public pages
│   │   ├── about/         # History, architects, timeline
│   │   ├── facilities/    # Twin Towers, amenities, virtual tour
│   │   ├── traditions/    # Aboagyewaa, Morale Nights, anthem
│   │   ├── rivalry/       # Conti vs Katanga
│   │   ├── alumni/        # OCA, mentorship, giving
│   │   ├── news/          # Events, announcements, gallery
│   │   ├── admissions/    # Application steps, FAQ
│   │   └── contact/       # Maintenance, emergency, feedback
│   ├── api/               # API routes
│   ├── globals.css        # Global styles + design tokens
│   ├── layout.tsx         # Root layout + providers
│   └── page.tsx           # Home page (composed sections)
├── components/
│   ├── ui/                # Base components (Button, Card, etc.)
│   ├── animations/        # KineticText, ScrollReveal, Magnetic, Tilt
│   ├── hero/              # TwinTowersHero (R3F)
│   ├── sections/          # Page sections (Hero, About, Facilities...)
│   ├── layout/            # Navigation, Footer
│   └── providers.tsx      # Session, Theme, Toaster
├── lib/
│   ├── sanity.ts          # Sanity client + queries
│   ├── utils.ts           # cn(), formatters, helpers
│   └── i18n.ts            # i18next config (en, tw)
├── sanity/                # Sanity schemas + studio config
├── public/                # Static assets
├── styles/                # Additional CSS
├── .env.example           # Environment template
├── next.config.mjs        # Next.js + PWA config
├── tailwind.config.ts     # Design system tokens
├── tsconfig.json          # TypeScript config
└── package.json
```

## 🎯 Key Pages & Sections

### Home Page (`/`)
- **Hero** — 3D Twin Towers + stats + CTAs
- **About** — Timeline + Architects (Owusu Addo, Marasović)
- **Facilities** — 6 categories × 4 items each (24 total)
- **Traditions** — 9 traditions with sacred/taboo/audio badges
- **Rivalry** — 6 dimensions, incident timeline, healthy competition
- **Alumni** — Notable Continentals, OCA, Mentorship, Giving Campaign
- **News/Events** — Tabbed events + announcements + newsletter
- **Admissions** — 5-step process + 8 FAQs

### Resident Portal (`/dashboard/resident`)
- Maintenance requests (photo upload)
- Amenity booking (court, study rooms, JCR)
- Package tracking
- Hall fee payments (MoMo)
- Event RSVP
- Emergency contacts

### Alumni Portal (`/dashboard/alumni`)
- OCA directory (opt-in)
- Mentorship matching
- Homecoming registration
- Donation history (MoMo/Card/Crypto)
- Newsletter preferences

### Admin Dashboard (`/dashboard/admin`)
- Resident management
- Maintenance workflow
- Event management
- Analytics (Plausible + custom)
- Content management (Sanity sync)

## 🎨 Design System

### Colors (CSS Variables)
```css
--knust-lust: #C8102E      /* Primary red */
--knust-black: #1A1A1A     /* Near black */
--knust-forest: #0B4F2C    /* Forest green */
--knust-yellow: #FFD700    /* Gold */
--knust-cream: #F5F0E1     /* Warm cream */
--knust-charcoal: #0D0D0D  /* Dark mode bg */
```

### Typography
- **Display**: Space Grotesk (variable, kinetic)
- **Body**: Inter (readable, variable)
- **Mono**: JetBrains Mono (code, scramble text)
- **Twi**: Noto Sans (diacritic support)

### Spacing Scale
- Base: 4px (0.25rem)
- Container: max-w-7xl (1280px)
- Section padding: py-16 → py-32 (responsive)

## 🌐 Internationalization

| Language | Code | Status |
|----------|------|--------|
| English | `en` | ✅ Complete |
| Asante Twi | `tw` | ✅ Complete |

Add new languages in `src/lib/i18n.ts` and translation files in `public/locales/`.

## ♿ Accessibility Checklist

- [x] Semantic HTML5 landmarks
- [x] ARIA labels on all interactive elements
- [x] Focus visible states (WCAG 2.4.7)
- [x] Color contrast ≥ 4.5:1 (AA)
- [x] Reduced motion support
- [x] Keyboard navigation (Tab, Enter, Escape)
- [x] Screen reader tested
- [x] Alt text for all images
- [x] Form labels + error announcements
- [x] Skip to main content link
- [x] Language declaration (`lang="en"` / `lang="tw"`)

## 🧪 Testing

```bash
# Unit tests
pnpm test

# Watch mode
pnpm test -- --watch

# Coverage
pnpm test -- --coverage

# E2E tests
pnpm e2e

# E2E with UI
pnpm e2e -- --ui
```

### Test Coverage Targets
- Components: 80%+
- Utilities: 90%+
- Critical paths (auth, payments): 100%

## 📦 Deployment

### Vercel (Recommended)
1. Connect GitHub repo to Vercel
2. Add environment variables from `.env.example`
3. Deploy — automatic preview + production

### Environment Variables (Production)
```bash
# Required
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXTAUTH_SECRET=
NEXTAUTH_URL=https://unityhall.knust.edu.gh

# Database
DATABASE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Payments
HUBTEL_CLIENT_ID=
HUBTEL_CLIENT_SECRET=
HUBTEL_MERCHANT_ACCOUNT=

# Analytics
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=unityhall.knust.edu.gh
```

### Custom Domain
- Request `unityhall.knust.edu.gh` from KNUST UITS
- Add CNAME in Vercel: `unityhall.knust.edu.gh` → `cname.vercel-dns.com`
- SSL auto-provisioned

## 🤝 Contributing

### Development Workflow
1. Fork → Create feature branch (`feat/amazing-feature`)
2. Make changes with tests
3. Run `pnpm lint && pnpm type-check && pnpm test`
4. Submit PR with description + screenshots

### Code Style
- **ESLint** + **Prettier** (auto-fix on save)
- **TypeScript strict** — no `any`, explicit returns
- **Conventional Commits** — `feat:`, `fix:`, `docs:`, `chore:`
- **Component-first** — UI in `components/ui/`, sections in `components/sections/`

### AI-Assisted Development
This project follows the [Ultimate Modern Website Building Guideline (2026)](../GUIDELINE.md):
- AI pair programming with Cursor/Claude Code
- Prompt versioning in `.prompts/`
- Guardrails: No AI on auth/crypto/payments
- AI-generated tests for untested modules

## 📄 License

MIT License — Built by Continentals, for Continentals.

## 🙏 Acknowledgments

- **Prof. John Owusu Addo** — Architect of the Twin Towers, Tropical Modernism pioneer
- **Miro Marasović** — Co-architect, KNUST Development Office head (1961-64)
- **Old Continentals Association** — Preserving legacy since 1968
- **KNUST UITS** — Infrastructure & student portal integration
- **Focus FM** — Continental Radio evolution
- **Asantehene Otumfuo Osei Tutu II** — Chancellor, hall expansion advocate

## 📞 Support

- **Email**: webmaster@unityhall.knust.edu.gh
- **WhatsApp**: +233 XX XXX XXXX
- **Office**: Unity Hall JCR, KNUST Campus
- **Issues**: [GitHub Issues](https://github.com/your-org/unity-hall-knust/issues)

---

> **"Unity Hall at 50: Reflections of the past, present and projection for the future."**  
> — *Prof. Robert Clement Abaidoo, Golden Jubilee Launch, Dec 21, 2017*

> **"The history of KNUST is incomplete without the mention of the fierce rivalry that exists between Conti and Katanga."**  
> — *Kabu Nartey, 2016*

**Made with ❤️ by Continentals**  
`Unity Hall • KNUST • Kumasi • Ghana` 🇬🇭