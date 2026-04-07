# Interactive Wall Calendar 

A polished, responsive wall-calendar style planner built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, **Framer Motion**, and **date-fns**.

This project was designed as a frontend engineering challenge focused on translating a static visual inspiration into an interactive, user-friendly calendar experience with strong UI polish, responsive layout handling, and thoughtful product details.

## Live Features

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
- Enhanced interactions and motion using **Framer Motion**
- Premium UI styling with rounded cards, subtle borders, warm spacing, and animated elements

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- date-fns

## Design Choices

The component was built to feel like a modern digital version of a physical wall calendar.

### Layout
- A **hero image panel** acts as the visual anchor of the component.
- Desktop uses a **segmented two-column layout** for stronger visual hierarchy.
- Mobile collapses naturally into a **stacked layout** to keep date selection and notes touch-friendly.

### Interaction Design
- Users can select a **start date** and **end date** across the month grid.
- The selected range uses distinct visual treatment for:
  - selected cells
  - cells in between
  - today
  - weekend
  - holiday
- A single note section was used instead of multiple text areas to improve clarity and reduce clutter.

### Persistence
All important UI state is saved using **localStorage**, keeping the experience fully frontend-only as required.


