# Interactive Wall Calendar

## 🌐 Live Demo
[(https://calendarbysayani.vercel.app/)](https://calendarbysayani.vercel.app/)

## 🔗 Source Code
[GitHub Repository](https://github.com/dola2164-png/calendar)

A polished, responsive wall-calendar style planner built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, **Framer Motion**, and **date-fns**.

This project was created as a frontend engineering challenge focused on transforming a static visual reference into an interactive, responsive, and user-friendly calendar experience with clean UI, smooth interactions, and thoughtful product details.

## Features

- Wall-calendar inspired layout with a **hero image panel**
- **Month navigation** with animated transitions
- **Date range selection** with clear visual states
- Single **notes panel** with 3 note modes:
  - Today
  - Monthly
  - Range
- **localStorage persistence** for:
  - selected dates
  - notes
  - theme
- **Responsive design** for desktop and mobile
- **Dark / Light mode**
- Visual markers for:
  - today
  - weekends
  - holidays
- Smooth interactions and transitions using **Framer Motion**
- Polished UI styling with rounded cards, subtle borders, soft spacing, and animated elements

## Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Framer Motion**
- **date-fns**

## Design Choices

The component was built to feel like a modern digital version of a physical wall calendar while staying practical and intuitive for everyday use.

### Layout
- A **hero image panel** acts as the main visual anchor of the interface.
- On desktop, the app uses a **segmented two-column layout** to create stronger visual hierarchy.
- On mobile, the layout stacks naturally for better readability and touch interaction.

### Interaction Design
- Users can select a **start date** and **end date** directly from the calendar grid.
- The selected range uses clear visual feedback for:
  - selected dates
  - dates between the range
  - today
  - weekends
  - holidays
- A single note section was used instead of multiple text areas to reduce clutter and keep the experience simple.

### Persistence
Important UI state is stored using **localStorage**, allowing the app to remain fully frontend-only while preserving user data across refreshes.

## Why These Choices

- **React + TypeScript** were used for reusable components, better code organization, and type safety.
- **Vite** provides a fast development experience and lightweight setup.
- **Tailwind CSS** makes responsive styling faster and more maintainable.
- **Framer Motion** adds smooth transitions and a more polished feel.
- **date-fns** simplifies reliable date formatting and calendar logic.
- **localStorage** allows persistence without requiring a backend.

## What This Project Demonstrates

- Responsive frontend development
- Component-based architecture
- State management for date interactions and notes
- Persistent client-side storage
- UI polish through animation and visual feedback
- Clean implementation of a product-style frontend challenge


For full local setup, usually write:

```md
## Run Locally

```bash
git clone https://github.com/dola2164-png/calendar.git
cd calendar
npm install
npm run dev
