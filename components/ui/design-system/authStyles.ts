/**
 * Auth Flow Design System Constants
 * 
 * This file contains standardized styling constants for authentication screens
 * to ensure visual coherence with the onboarding flow.
 */

import { tva } from '@gluestack-ui/nativewind-utils/tva';

// Auth Screen Layout Constants
export const AUTH_LAYOUT = {
  // Container padding and spacing
  CONTAINER_PADDING: 'p-5', // 20px padding
  CONTENT_SPACING: 'space-y-6', // 24px vertical spacing
  FORM_SPACING: 'space-y-4', // 16px form field spacing
  
  // Card styling for auth forms
  CARD_CONTAINER: 'p-6 bg-white shadow-lg mb-6',
  CARD_VARIANT: 'elevated' as const,
  CARD_SIZE: 'lg' as const,
  
  // Background configuration
  BACKGROUND_VARIANT: 'auth' as const,
} as const;

// Typography Constants
export const AUTH_TYPOGRAPHY = {
  // Main heading (e.g., "Buat Akun Baru", "Login to your account")
  MAIN_TITLE: 'text-4xl font-bold text-typography-900 mb-4',
  
  // Subtitle/description text
  SUBTITLE: 'text-lg text-typography-600 leading-7',
  
  // Form field labels
  FIELD_LABEL: 'text-base font-semibold text-typography-900 mb-3',
  
  // Error messages
  ERROR_TEXT: 'text-sm text-error-600 mt-2',
  
  // Helper text
  HELPER_TEXT: 'text-sm text-typography-600',
  
  // Link text
  LINK_TEXT: 'text-primary-600 font-semibold',
  
  // Button text
  BUTTON_TEXT: 'text-white font-semibold text-lg',
} as const;

// Input Field Styling
export const AUTH_INPUT = {
  // Standard input styling
  CONTAINER: 'bg-background-50 border-border-300',
  VARIANT: 'outline' as const,
  SIZE: 'lg' as const,
  
  // Input field text styling
  FIELD_TEXT: 'text-typography-900',
  
  // Placeholder styling
  PLACEHOLDER_COLOR: 'text-typography-500',
  
  // Error state styling
  ERROR_BORDER: 'border-error-500',
} as const;

// Button Styling
export const AUTH_BUTTON = {
  // Primary action button (Login, Sign Up)
  PRIMARY: {
    SIZE: 'lg' as const,
    VARIANT: 'solid' as const,
    ACTION: 'primary' as const,
    CLASSES: 'bg-primary-500 mt-8 py-4 rounded-xl h-14',
  },
  
  // Secondary button styling
  SECONDARY: {
    SIZE: 'md' as const,
    VARIANT: 'outline' as const,
    ACTION: 'secondary' as const,
    CLASSES: 'border-border-300',
  },
} as const;

// Color Scheme Constants
export const AUTH_COLORS = {
  // Primary colors
  PRIMARY: 'primary-500',
  PRIMARY_HOVER: 'primary-600',
  PRIMARY_ACTIVE: 'primary-700',
  
  // Background colors
  BACKGROUND: 'background-0',
  BACKGROUND_SUBTLE: 'background-50',
  
  // Text colors
  TEXT_PRIMARY: 'typography-900',
  TEXT_SECONDARY: 'typography-600',
  TEXT_MUTED: 'typography-500',
  
  // Border colors
  BORDER: 'border-300',
  BORDER_FOCUS: 'border-400',
  
  // Status colors
  ERROR: 'error-600',
  SUCCESS: 'success-600',
  WARNING: 'warning-600',
} as const;

// Animation and Transition Constants
export const AUTH_ANIMATIONS = {
  // Standard transition duration
  TRANSITION: 'transition-all duration-200',
  
  // Button press animation
  BUTTON_PRESS: 'data-[active=true]:scale-[0.98]',
  
  // Focus states
  FOCUS_RING: 'data-[focus-visible=true]:web:ring-2 data-[focus-visible=true]:web:ring-indicator-info',
} as const;

// Spacing Constants
export const AUTH_SPACING = {
  // Section spacing
  SECTION_MARGIN: 'mb-8',
  SECTION_PADDING: 'py-6',
  
  // Form element spacing
  FIELD_MARGIN: 'mb-6',
  SMALL_MARGIN: 'mb-4',
  
  // Header spacing
  HEADER_MARGIN: 'mb-10 mt-6',
  TITLE_MARGIN: 'mb-4',
} as const;

// Responsive Design Constants
export const AUTH_RESPONSIVE = {
  // Container max width
  MAX_WIDTH: 'max-w-md mx-auto',
  
  // Padding for different screen sizes
  MOBILE_PADDING: 'px-4',
  TABLET_PADDING: 'px-6',
  DESKTOP_PADDING: 'px-8',
} as const;

// Validation Styling
export const AUTH_VALIDATION = {
  // Valid state
  VALID_BORDER: 'border-success-500',
  VALID_TEXT: 'text-success-600',
  
  // Invalid state
  INVALID_BORDER: 'border-error-500',
  INVALID_TEXT: 'text-error-600',
  
  // Focus states
  FOCUS_VALID: 'focus:border-success-600',
  FOCUS_INVALID: 'focus:border-error-600',
} as const;

// Social Login Styling
export const AUTH_SOCIAL = {
  // Social button container
  CONTAINER: 'flex-row justify-center space-x-4 mb-12',
  
  // Individual social button
  BUTTON: 'w-12 h-12 rounded-xl bg-background-100 items-center justify-center border border-border-200',
  
  // Divider styling
  DIVIDER: {
    CONTAINER: 'flex-row items-center mb-8',
    LINE: 'flex-1 h-px bg-border-200',
    TEXT: 'mx-4 text-sm text-typography-500',
  },
} as const;

// Utility function to combine auth styles
export const combineAuthStyles = (...styles: string[]) => {
  return styles.filter(Boolean).join(' ');
};

// Auth form container style using tva
export const authContainerStyle = tva({
  base: 'flex-1 relative',
  variants: {
    variant: {
      default: 'bg-background-0',
      modern: 'bg-gradient-to-br from-background-0 to-background-50',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// Auth card style using tva
export const authCardStyle = tva({
  base: 'bg-white shadow-lg rounded-xl',
  variants: {
    size: {
      sm: 'p-4',
      md: 'p-5',
      lg: 'p-6',
    },
    elevation: {
      low: 'shadow-sm',
      medium: 'shadow-lg',
      high: 'shadow-xl',
    },
  },
  defaultVariants: {
    size: 'lg',
    elevation: 'medium',
  },
});

// Auth input style using tva
export const authInputStyle = tva({
  base: 'border rounded-lg px-4 py-3 text-typography-900',
  variants: {
    state: {
      default: 'border-border-300 bg-background-50',
      focus: 'border-primary-500 bg-background-0',
      error: 'border-error-500 bg-error-50',
      success: 'border-success-500 bg-success-50',
    },
    size: {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-4 py-4 text-lg',
    },
  },
  defaultVariants: {
    state: 'default',
    size: 'lg',
  },
});