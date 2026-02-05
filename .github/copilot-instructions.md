# GitHub Copilot Instructions – Personal Portfolio Website

## Project Overview
Build a modern, high-quality personal portfolio website using **Vite**, **ReactJS**, and **Tailwind CSS**.

The portfolio represents a **full-stack developer specializing in CRM systems, automations, integrations, and modern web apps**.  
The site should feel like a **modern startup / SaaS company website**: clean, confident, and polished.

---

## Tech Stack
- Vite
- ReactJS (functional components + hooks only)
- Tailwind CSS
- Minimal dependencies only when justified

---

## Design & Theme
- Modern startup / tech company aesthetic
- Clean spacing, strong typography hierarchy
- Smooth transitions and subtle animations
- Supports **dark mode and light mode**
  - Use Tailwind `dark` variant
  - Persist theme preference using `localStorage`
- Avoid clutter and visual noise

---

## UX & Animations
- Smooth hover states
- Page and section transitions
- Micro-interactions for buttons and cards
- Animations should be subtle and professional

---

## Pages

### About Me
Purpose: establish credibility and expertise.

Include:
- Professional introduction
- Focus on full-stack development, CRM platforms, automations, and integrations
- Skills grouped by category (Frontend, Backend, CRM, Automation, Tools)
- Clean layout with strong typography

Tone:
- Confident
- Technical
- Clear and concise

---

### Projects
Purpose: showcase real-world experience.

Each project card should include:
- Project name
- Short description
- Tech stack used
- Optional thumbnail
- Links (GitHub / Live Demo if available)

Layout:
- Grid-based
- Responsive
- Smooth hover animations
- Clickable cards or CTAs

---

### Contact Me
Purpose: convert visitors into leads.

Include:
- Contact form with:
  - Name
  - Email
  - Message
- Clear CTA
- Client-side validation
- Optional social/contact links

Design:
- Simple
- Trustworthy
- No unnecessary fields

---

## Component Guidelines
- Functional components only
- Small, reusable components
- Composition over large components
- Meaningful names
- Avoid prop drilling when possible

---

## Styling Rules
- Tailwind utility-first approach
- Avoid inline styles
- Keep class lists readable and organized
- Consistent spacing and sizing

---

## Accessibility & SEO
- Semantic HTML
- Proper heading hierarchy
- Accessible color contrast
- Keyboard navigable components
- SEO-friendly structure

---

## Performance
- Lazy-load heavy components
- Optimize images
- Avoid unnecessary re-renders
- Keep bundle size minimal

---

## Folder Structure (Preferred)
src/
  components/
  pages/
  layouts/
  hooks/
  assets/
  data/
  utils/

---

## Copilot Optimization Goals
- Production-ready code
- Clean architecture
- Modern UI patterns
- Scalable structure
- Professional portfolio quality

---

## Avoid
- Over-engineering
- Heavy UI frameworks
- Deprecated React patterns
- Flashy or distracting animations