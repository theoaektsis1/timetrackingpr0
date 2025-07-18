// Design System Components
// Reusable component styles and variants

export const componentStyles = {
  // Button Variants
  button: {
    base: `
      inline-flex items-center justify-center
      font-semibold text-center
      border border-transparent
      transition-all duration-200
      focus:outline-none focus:ring-4
      disabled:opacity-50 disabled:cursor-not-allowed
      select-none
    `,
    sizes: {
      xs: 'px-2.5 py-1.5 text-xs rounded-md',
      sm: 'px-3 py-2 text-sm rounded-lg',
      md: 'px-4 py-2.5 text-sm rounded-lg',
      lg: 'px-6 py-3 text-base rounded-xl',
      xl: 'px-8 py-4 text-lg rounded-xl',
    },
    variants: {
      primary: `
        bg-gradient-to-r from-primary-500 to-primary-600
        hover:from-primary-600 hover:to-primary-700
        text-white shadow-professional
        hover:shadow-professional-lg hover:scale-105
        focus:ring-primary-500/20
        active:scale-95
      `,
      secondary: `
        bg-gradient-to-r from-secondary-500 to-secondary-600
        hover:from-secondary-600 hover:to-secondary-700
        text-white shadow-professional
        hover:shadow-professional-lg hover:scale-105
        focus:ring-secondary-500/20
        active:scale-95
      `,
      outline: `
        border-2 border-primary-500 text-primary-600 dark:text-primary-400
        hover:bg-primary-50 dark:hover:bg-primary-950
        hover:scale-105 focus:ring-primary-500/20
        active:scale-95
      `,
      ghost: `
        text-neutral-600 dark:text-neutral-400
        hover:bg-neutral-100 dark:hover:bg-neutral-800
        hover:scale-105 focus:ring-neutral-500/20
        active:scale-95
      `,
      success: `
        bg-gradient-to-r from-accent-success-500 to-accent-success-600
        hover:from-accent-success-600 hover:to-accent-success-700
        text-white shadow-professional
        hover:shadow-professional-lg hover:scale-105
        focus:ring-accent-success-500/20
        active:scale-95
      `,
      warning: `
        bg-gradient-to-r from-accent-warning-500 to-accent-warning-600
        hover:from-accent-warning-600 hover:to-accent-warning-700
        text-white shadow-professional
        hover:shadow-professional-lg hover:scale-105
        focus:ring-accent-warning-500/20
        active:scale-95
      `,
      error: `
        bg-gradient-to-r from-accent-error-500 to-accent-error-600
        hover:from-accent-error-600 hover:to-accent-error-700
        text-white shadow-professional
        hover:shadow-professional-lg hover:scale-105
        focus:ring-accent-error-500/20
        active:scale-95
      `,
    },
  },

  // Card Variants
  card: {
    base: `
      bg-white dark:bg-neutral-800
      border border-neutral-200/50 dark:border-neutral-700/50
      transition-all duration-300
    `,
    variants: {
      default: 'rounded-2xl shadow-professional',
      interactive: `
        rounded-2xl shadow-professional
        hover:shadow-professional-lg hover:scale-[1.02] hover:-translate-y-1
        cursor-pointer
      `,
      glass: `
        rounded-2xl
        bg-white/80 dark:bg-neutral-800/80
        backdrop-blur-xl border-white/20 dark:border-neutral-700/20
        shadow-professional
      `,
      elevated: `
        rounded-2xl shadow-professional-lg
        hover:shadow-xl hover:scale-[1.02] hover:-translate-y-2
      `,
    },
  },

  // Input Variants
  input: {
    base: `
      w-full border-2 transition-all duration-200
      focus:outline-none focus:ring-4
      dark:bg-neutral-700 dark:text-white
      font-medium
    `,
    sizes: {
      sm: 'px-3 py-2 text-sm rounded-lg',
      md: 'px-4 py-3 text-base rounded-xl',
      lg: 'px-5 py-4 text-lg rounded-xl',
    },
    variants: {
      default: `
        border-neutral-300 dark:border-neutral-600
        focus:border-primary-500 focus:ring-primary-500/20
        hover:border-neutral-400 dark:hover:border-neutral-500
      `,
      error: `
        border-accent-error-500
        focus:border-accent-error-500 focus:ring-accent-error-500/20
      `,
      success: `
        border-accent-success-500
        focus:border-accent-success-500 focus:ring-accent-success-500/20
      `,
    },
  },

  // Badge Variants
  badge: {
    base: `
      inline-flex items-center font-semibold
      transition-all duration-200
    `,
    sizes: {
      sm: 'px-2 py-1 text-xs rounded-md',
      md: 'px-3 py-1.5 text-sm rounded-lg',
      lg: 'px-4 py-2 text-base rounded-xl',
    },
    variants: {
      primary: 'bg-primary-100 text-primary-700 border border-primary-200',
      secondary: 'bg-secondary-100 text-secondary-700 border border-secondary-200',
      success: 'bg-accent-success-100 text-accent-success-700 border border-accent-success-200',
      warning: 'bg-accent-warning-100 text-accent-warning-700 border border-accent-warning-200',
      error: 'bg-accent-error-100 text-accent-error-700 border border-accent-error-200',
      neutral: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700',
    },
  },

  // Status Indicators
  status: {
    base: 'inline-flex items-center gap-2 font-semibold',
    variants: {
      active: `
        px-3 py-1.5 rounded-full text-sm
        bg-accent-success-50 text-accent-success-700
        border border-accent-success-200
      `,
      inactive: `
        px-3 py-1.5 rounded-full text-sm
        bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400
        border border-neutral-200 dark:border-neutral-700
      `,
      warning: `
        px-3 py-1.5 rounded-full text-sm
        bg-accent-warning-50 text-accent-warning-700
        border border-accent-warning-200
      `,
      error: `
        px-3 py-1.5 rounded-full text-sm
        bg-accent-error-50 text-accent-error-700
        border border-accent-error-200
      `,
    },
  },

  // Loading States
  loading: {
    skeleton: 'animate-pulse bg-neutral-200 dark:bg-neutral-700 rounded',
    spinner: `
      animate-spin rounded-full border-2 border-neutral-300
      border-t-primary-500 dark:border-neutral-600 dark:border-t-primary-400
    `,
    dots: 'flex space-x-1',
  },

  // Glass Effects
  glass: {
    light: `
      bg-white/80 backdrop-blur-xl
      border border-white/20
    `,
    medium: `
      bg-white/90 dark:bg-neutral-800/90
      backdrop-blur-2xl border border-white/30 dark:border-neutral-700/30
    `,
    strong: `
      bg-white/95 dark:bg-neutral-800/95
      backdrop-blur-3xl border border-white/40 dark:border-neutral-700/40
    `,
  },

  // Gradient Backgrounds
  gradients: {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600',
    secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600',
    success: 'bg-gradient-to-r from-accent-success-500 to-accent-success-600',
    warning: 'bg-gradient-to-r from-accent-warning-500 to-accent-warning-600',
    error: 'bg-gradient-to-r from-accent-error-500 to-accent-error-600',
    neutral: 'bg-gradient-to-r from-neutral-600 to-neutral-700',
    brand: 'bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-600',
    sunset: 'bg-gradient-to-r from-accent-warning-400 via-accent-error-500 to-secondary-600',
  },
};

export default componentStyles;