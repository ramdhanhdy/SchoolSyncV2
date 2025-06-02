/**
 * Design System Exports
 * 
 * Central export file for all design system constants and utilities.
 */

export {
  AUTH_LAYOUT,
  AUTH_TYPOGRAPHY,
  AUTH_INPUT,
  AUTH_BUTTON,
  AUTH_COLORS,
  AUTH_ANIMATIONS,
  AUTH_SPACING,
  AUTH_RESPONSIVE,
  AUTH_VALIDATION,
  AUTH_SOCIAL,
  combineAuthStyles,
  authContainerStyle,
  authCardStyle,
  authInputStyle,
} from './authStyles';

// Re-export common design system types
export type {
  VariantProps
} from '@gluestack-ui/nativewind-utils';