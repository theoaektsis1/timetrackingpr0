# TimeTracker Pro Design System Style Guide

## Overview
This comprehensive style guide defines the visual design system for TimeTracker Pro, ensuring consistency, professionalism, and excellent user experience across all components and interfaces.

## 🎨 Color Palette

### Primary Brand Colors
- **Primary Blue**: `#0ea5e9` (Sky Blue 500)
  - Light: `#f0f9ff` (50) to `#082f49` (950)
  - Usage: Primary actions, navigation, brand elements
  
- **Secondary Purple**: `#a855f7` (Violet 500)
  - Light: `#faf5ff` (50) to `#3b0764` (950)
  - Usage: Secondary actions, accents, highlights

### Accent Colors
- **Success Green**: `#10b981` (Emerald 500)
  - Usage: Success states, positive feedback, active timers
  
- **Warning Amber**: `#f59e0b` (Amber 500)
  - Usage: Warnings, break times, caution states
  
- **Error Red**: `#ef4444` (Red 500)
  - Usage: Errors, destructive actions, alerts
  
- **Info Blue**: `#3b82f6` (Blue 500)
  - Usage: Information, neutral feedback

### Neutral Colors
- **White**: `#ffffff` (0)
- **Light Grays**: `#f8fafc` (50) to `#cbd5e1` (300)
- **Medium Grays**: `#94a3b8` (400) to `#64748b` (500)
- **Dark Grays**: `#475569` (600) to `#020617` (950)

### Color Usage Guidelines
1. **Primary colors** for main actions and brand elements
2. **Accent colors** for status indicators and feedback
3. **Neutral colors** for text, backgrounds, and borders
4. **Maintain 4.5:1 contrast ratio** for accessibility
5. **Use gradients sparingly** for premium feel

## 📝 Typography

### Font Families
- **Display Font**: Poppins (Headings, Titles, Brand)
  - Weights: 400, 500, 600, 700, 800
  - Usage: Page titles, section headers, brand text
  
- **Body Font**: Inter (Body text, UI elements)
  - Weights: 300, 400, 500, 600, 700, 800
  - Usage: Paragraphs, labels, buttons, navigation
  
- **Monospace Font**: JetBrains Mono (Code, Time displays)
  - Weights: 400, 500, 600
  - Usage: Time durations, code snippets, data

### Font Scale
- **6xl**: 3.75rem (60px) - Hero titles
- **5xl**: 3rem (48px) - Page titles
- **4xl**: 2.25rem (36px) - Section titles
- **3xl**: 1.875rem (30px) - Card titles
- **2xl**: 1.5rem (24px) - Subsection titles
- **xl**: 1.25rem (20px) - Large text
- **lg**: 1.125rem (18px) - Emphasized text
- **base**: 1rem (16px) - Body text
- **sm**: 0.875rem (14px) - Small text
- **xs**: 0.75rem (12px) - Captions

### Typography Guidelines
1. **Line height**: 1.5 for body text, 1.2 for headings
2. **Letter spacing**: Slight negative for large text (-0.025em to -0.05em)
3. **Font weights**: Use semibold (600) for emphasis, bold (700) for strong emphasis
4. **Hierarchy**: Clear distinction between heading levels
5. **Readability**: Sufficient contrast and appropriate sizing

## 📐 Layout & Spacing

### Spacing Scale (8px base unit)
- **0**: 0px
- **1**: 4px (0.25rem)
- **2**: 8px (0.5rem)
- **3**: 12px (0.75rem)
- **4**: 16px (1rem)
- **5**: 20px (1.25rem)
- **6**: 24px (1.5rem)
- **8**: 32px (2rem)
- **10**: 40px (2.5rem)
- **12**: 48px (3rem)
- **16**: 64px (4rem)
- **20**: 80px (5rem)
- **24**: 96px (6rem)

### Layout Guidelines
1. **Container max-width**: 1280px (7xl)
2. **Grid system**: CSS Grid and Flexbox
3. **Responsive breakpoints**: 
   - Mobile: 0-640px
   - Tablet: 641-1024px
   - Desktop: 1025px+
4. **Consistent spacing**: Use spacing scale multiples
5. **White space**: Generous spacing for breathing room

### Border Radius
- **sm**: 2px - Small elements
- **base**: 4px - Default elements
- **md**: 6px - Medium elements
- **lg**: 8px - Large elements
- **xl**: 12px - Cards, buttons
- **2xl**: 16px - Large cards
- **3xl**: 24px - Hero elements
- **full**: 9999px - Pills, avatars

## 🎯 UI Components

### Buttons

#### Variants
- **Primary**: Gradient blue background, white text
- **Secondary**: Gradient purple background, white text
- **Outline**: Border with primary color, transparent background
- **Ghost**: Transparent background, colored text
- **Success/Warning/Error**: Respective accent colors

#### Sizes
- **xs**: 10px padding, 12px text
- **sm**: 12px padding, 14px text
- **md**: 16px padding, 14px text (default)
- **lg**: 24px padding, 16px text
- **xl**: 32px padding, 18px text

#### States
- **Default**: Base styling
- **Hover**: Scale 105%, enhanced shadow
- **Active**: Scale 95%
- **Disabled**: 50% opacity, no interactions
- **Focus**: Ring outline for accessibility

### Cards

#### Variants
- **Default**: White background, subtle shadow
- **Interactive**: Hover effects, cursor pointer
- **Glass**: Semi-transparent with backdrop blur
- **Elevated**: Larger shadow, prominent appearance

#### Features
- **Rounded corners**: 16px (2xl)
- **Shadow**: Professional shadow system
- **Border**: Subtle neutral borders
- **Hover effects**: Scale and shadow transitions

### Inputs

#### Variants
- **Default**: Standard border and focus states
- **Error**: Red border and focus ring
- **Success**: Green border and focus ring

#### Features
- **Padding**: Generous internal spacing
- **Focus states**: Clear visual feedback
- **Placeholder text**: Muted color
- **Dark mode support**: Appropriate backgrounds

### Badges & Status Indicators

#### Variants
- **Primary/Secondary**: Brand colors
- **Success/Warning/Error**: Accent colors
- **Neutral**: Gray tones

#### Features
- **Rounded**: Full border radius
- **Small text**: 12px-14px font size
- **Icon support**: Optional leading icons
- **Color coding**: Semantic color usage

## ✨ Visual Effects

### Shadows
- **Professional**: `0 4px 20px -2px rgb(0 0 0 / 0.08)`
- **Professional Large**: `0 10px 40px -4px rgb(0 0 0 / 0.12)`
- **Glow**: `0 0 20px rgb(14 165 233 / 0.15)`
- **Glow Large**: `0 0 30px rgb(14 165 233 / 0.2)`

### Gradients
- **Primary**: Blue to darker blue
- **Secondary**: Purple to darker purple
- **Brand**: Blue to purple blend
- **Success**: Green variations
- **Warning**: Amber variations
- **Error**: Red variations

### Glass Effects
- **Light**: 80% opacity, light blur
- **Medium**: 90% opacity, medium blur
- **Strong**: 95% opacity, strong blur

### Animations

#### Durations
- **Fast**: 150ms - Micro-interactions
- **Default**: 200ms - Standard transitions
- **Medium**: 300ms - Complex transitions
- **Slow**: 500ms - Page transitions

#### Easing
- **Default**: `cubic-bezier(0.4, 0, 0.2, 1)`
- **Bounce**: `cubic-bezier(0.68, -0.55, 0.265, 1.55)`
- **Elastic**: Custom spring animations

#### Types
- **Fade**: Opacity transitions
- **Scale**: Size transformations
- **Slide**: Position movements
- **Glow**: Shadow animations
- **Float**: Subtle vertical movement

## 🌙 Dark Mode

### Implementation
- **CSS classes**: `.dark` prefix for dark variants
- **Color adjustments**: Appropriate contrast ratios
- **Component variants**: Dark-specific styling
- **User preference**: Respects system settings

### Dark Mode Colors
- **Backgrounds**: Dark grays (800-950)
- **Text**: Light grays (100-300)
- **Borders**: Muted dark borders
- **Accents**: Slightly adjusted brand colors

## ♿ Accessibility

### Requirements
- **WCAG 2.1 AA compliance**
- **4.5:1 contrast ratio** minimum
- **Focus indicators**: Visible focus states
- **Keyboard navigation**: Full keyboard support
- **Screen reader support**: Semantic HTML
- **Reduced motion**: Respects user preferences

### Implementation
- **Focus rings**: 4px ring with 20% opacity
- **Alt text**: Descriptive image alternatives
- **ARIA labels**: Proper labeling
- **Color independence**: Not relying solely on color
- **Text scaling**: Supports up to 200% zoom

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 0-640px (sm)
- **Tablet**: 641-768px (md)
- **Laptop**: 769-1024px (lg)
- **Desktop**: 1025-1280px (xl)
- **Large**: 1281px+ (2xl)

### Mobile-First Approach
1. **Base styles**: Mobile-optimized
2. **Progressive enhancement**: Larger screens
3. **Touch targets**: Minimum 44px
4. **Readable text**: Minimum 16px
5. **Thumb-friendly**: Easy navigation

## 🔧 Implementation Guidelines

### CSS Architecture
- **Utility-first**: Tailwind CSS approach
- **Component classes**: Reusable patterns
- **Custom properties**: CSS variables for theming
- **Modular structure**: Organized file system

### Performance
- **Optimized fonts**: Subset and preload
- **Efficient animations**: GPU acceleration
- **Minimal CSS**: Purged unused styles
- **Fast loading**: Optimized assets

### Maintenance
- **Design tokens**: Centralized values
- **Documentation**: Comprehensive guides
- **Version control**: Tracked changes
- **Testing**: Cross-browser compatibility

## 📋 Component Checklist

When creating new components, ensure:

- [ ] **Accessibility**: WCAG compliant
- [ ] **Responsive**: Works on all screen sizes
- [ ] **Dark mode**: Proper dark variants
- [ ] **States**: All interactive states covered
- [ ] **Typography**: Consistent font usage
- [ ] **Spacing**: Follows spacing scale
- [ ] **Colors**: Uses design system palette
- [ ] **Animations**: Smooth transitions
- [ ] **Performance**: Optimized rendering
- [ ] **Documentation**: Usage examples

## 🎯 Brand Guidelines

### Logo Usage
- **Primary logo**: Full color on light backgrounds
- **Dark logo**: White/light on dark backgrounds
- **Minimum size**: 120px width
- **Clear space**: Logo height on all sides
- **Variations**: Horizontal and stacked layouts

### Voice & Tone
- **Professional**: Business-appropriate language
- **Friendly**: Approachable and helpful
- **Clear**: Concise and understandable
- **Consistent**: Unified across all touchpoints

### Photography & Imagery
- **Style**: Clean, modern, professional
- **Colors**: Complement brand palette
- **Quality**: High resolution, optimized
- **Consistency**: Unified visual style

---

This style guide serves as the foundation for all design decisions in TimeTracker Pro, ensuring a cohesive, professional, and user-friendly experience across all platforms and devices.