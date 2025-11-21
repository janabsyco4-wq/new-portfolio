# Nasrullah's Portfolio - Next.js & Tailwind CSS

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Dark/Light Theme**: Toggle between themes with persistent storage
- **Multiple Pages**: Dedicated pages for different sections
- **Smooth Animations**: Fade-in effects, hover animations, and transitions
- **Type-safe**: Built with TypeScript for better development experience
- **SEO Optimized**: Proper meta tags and semantic HTML

## 📄 Pages

### Home (`/`)
- Hero section with typing animation
- Skills preview (top 3 skills)
- Projects preview (2 featured projects)
- Experience preview (2 recent positions)
- Blog preview (3 latest articles)
- CTA section

### Skills (`/skills`)
- Complete skills showcase with proficiency levels
- 6 core competencies with detailed descriptions
- Tools & technologies grid
- Progress bars for each skill

### Projects (`/projects`)
- Full project portfolio (4 projects)
- Interactive project cards with hover effects
- Modal popups with detailed project information
- Tools, outcomes, and achievements for each project

### Experience (`/experience`)
- Professional timeline
- Education cards
- Certifications showcase
- Detailed achievements for each position

### Blog (`/blog`)
- Featured article section
- Blog post grid (6 articles)
- Newsletter subscription form
- Category tags and read time

### Contact (`/contact`)
- Contact information cards
- Full contact form
- Social media links
- "Why Work With Me" section

## 🎨 Design Features

- **Minimalist & Professional**: Clean design inspired by the ultimate portfolio
- **Consistent Navigation**: Fixed navbar with active page indicators
- **Smooth Scrolling**: Scroll-to-top button appears after scrolling
- **Theme Toggle**: Persistent dark/light mode across all pages
- **Hover Effects**: Interactive elements with smooth transitions
- **Gradient Orbs**: Animated background elements on hero section

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Fonts**: System fonts for optimal performance
- **Images**: Next.js Image component for optimization

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── page.tsx              # Home page
│   ├── skills/page.tsx       # Skills page
│   ├── projects/page.tsx     # Projects page
│   ├── experience/page.tsx   # Experience page
│   ├── blog/page.tsx         # Blog page
│   ├── contact/page.tsx      # Contact page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── Navbar.tsx            # Navigation component
│   ├── Hero.tsx              # Hero section
│   ├── Footer.tsx            # Footer component
│   └── ScrollToTop.tsx       # Scroll to top button
├── public/
│   └── WhatsApp Image...jpg  # Profile image
└── README.md
```

## 🎯 Key Features Implemented

### Navigation
- Fixed navbar with blur effect
- Active page highlighting
- Smooth transitions between pages
- Theme toggle with icon change

### Home Page
- Preview sections for all main content
- "Explore More" buttons linking to dedicated pages
- Responsive grid layouts
- Animated hero section with typing effect

### Individual Pages
- Each page has unique, comprehensive content
- No duplication between home and individual pages
- Consistent design language across all pages
- Proper routing and navigation

### Responsive Design
- Mobile-first approach
- Breakpoints: mobile (< 768px), tablet (768px - 1024px), desktop (> 1024px)
- Flexible grid layouts
- Touch-friendly interactive elements

## 🎨 Theme System

The portfolio uses CSS variables for theming:

```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: #0a0a0a;
  --text-secondary: #666666;
  --accent: #3b82f6;
  --border: #e5e5e5;
  --shadow: rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] {
  --bg-primary: #0a0a0a;
  --bg-secondary: #1a1a1a;
  --text-primary: #ffffff;
  --text-secondary: #aaaaaa;
  --accent: #3b82f6;
  --border: #333333;
  --shadow: rgba(255, 255, 255, 0.1);
}
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Customization

To customize the portfolio:

1. Update personal information in each page component
2. Replace profile image in `/public` folder
3. Modify color scheme in `globals.css`
4. Add/remove projects in `projects/page.tsx`
5. Update skills and experience data

## 🚀 Deployment

The portfolio is ready to deploy on:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any platform supporting Next.js

```bash
# Build for production
npm run build

# The output will be in the .next folder
```

## 📄 License

© 2025 Nasrullah. All rights reserved.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
