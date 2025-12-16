/**
 * Design Tokens
 * =============
 * This is the single source of truth for all design values in the application.
 * 
 * How it works:
 * - These tokens are used by the Ant Design theme configuration (theme/themeConfig.ts)
 * - They are also displayed on the Demo page for reference
 * - Changing values here updates the entire application consistently
 * 
 * For AI-assisted workflows:
 * - Update token values in this file
 * - The theme config imports from here
 * - All UI components inherit the new values automatically
 * 
 * Guidelines:
 * - Keep tokens simple and opinionated
 * - Avoid over-abstraction
 * - Use semantic names where helpful (e.g., layout.page, layout.section)
 */

// ============================================================================
// COLOUR TOKENS
// ============================================================================

/**
 * Primary Colour Palette
 * Used for: Primary actions, links, focus states, active elements
 */
export const primary = {
  50: '#f0f5ff',
  100: '#e6efff',
  200: '#bdd4ff',
  300: '#8fb5fe',
  400: '#6495fe',
  500: '#407EFE', // Base primary
  600: '#3366d4',
  700: '#2650a8',
  800: '#1a3a7c',
  900: '#0f2550',
} as const

/**
 * Secondary Colour Palette
 * Used for: Success states, positive actions, confirmations
 */
export const secondary = {
  50: '#e6faf7',
  100: '#ccf5ef',
  200: '#99ebdf',
  300: '#66e0cf',
  400: '#33d6bf',
  500: '#04B09E', // Base secondary
  600: '#038d7e',
  700: '#026a5f',
  800: '#02473f',
  900: '#012420',
} as const

/**
 * Neutral/Grey Colour Palette
 * Used for: Text, borders, backgrounds, disabled states
 * 
 * Note: Improved contrast for better readability
 * - Use 700+ for body text
 * - Use 500+ for secondary/helper text (not 400)
 */
export const neutral = {
  50: '#f9fafb',
  100: '#f3f4f6',
  200: '#e5e7eb',
  300: '#d1d5db',
  400: '#9ca3af',
  500: '#6b7280', // Helper text (minimum for readability)
  600: '#4b5563', // Secondary text
  700: '#374151', // Body text
  800: '#1f2937', // Headings
  900: '#111827', // High emphasis
} as const

/**
 * Semantic Colours
 * Used for: Feedback states (info, success, warning, error)
 */
export const semantic = {
  info: {
    light: '#e6f7ff',
    base: '#1890ff',
    dark: '#0050b3',
  },
  success: {
    light: '#f6ffed',
    base: '#52c41a',
    dark: '#237804',
  },
  warning: {
    light: '#fffbe6',
    base: '#faad14',
    dark: '#ad6800',
  },
  error: {
    light: '#fff2f0',
    base: '#ff4d4f',
    dark: '#a8071a',
  },
} as const

// ============================================================================
// TYPOGRAPHY TOKENS
// ============================================================================

/**
 * Font Family
 */
export const fontFamily = {
  base: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  mono: "'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, 'DejaVu Sans Mono', monospace",
} as const

/**
 * Font Sizes (in pixels)
 * 
 * Updated for better readability:
 * - Base increased from 14px to 15px
 * - Small text uses 13px (readable but clearly secondary)
 */
export const fontSize = {
  xs: 12,
  sm: 13,
  base: 15, // Slightly larger for better readability
  lg: 16,
  xl: 18,
  '2xl': 22,
  '3xl': 26,
  '4xl': 32,
} as const

/**
 * Font Weights
 * 
 * Headings use medium (500) for confident but not heavy feel
 */
export const fontWeight = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const

/**
 * Line Heights
 */
export const lineHeight = {
  tight: 1.3,
  base: 1.5,
  relaxed: 1.7,
} as const

/**
 * Heading Styles
 * 
 * Headings are confident but not heavy:
 * - H1-H2 use semibold (600)
 * - H3-H5 use medium (500)
 */
export const headings = {
  h1: { fontSize: fontSize['4xl'], fontWeight: fontWeight.semibold, lineHeight: lineHeight.tight },
  h2: { fontSize: fontSize['3xl'], fontWeight: fontWeight.semibold, lineHeight: lineHeight.tight },
  h3: { fontSize: fontSize['2xl'], fontWeight: fontWeight.medium, lineHeight: lineHeight.base },
  h4: { fontSize: fontSize.xl, fontWeight: fontWeight.medium, lineHeight: lineHeight.base },
  h5: { fontSize: fontSize.lg, fontWeight: fontWeight.medium, lineHeight: lineHeight.base },
} as const

// ============================================================================
// SPACING TOKENS
// ============================================================================

/**
 * Spacing Scale (in pixels)
 * Based on 4px base unit (Ant Design uses 4px grid)
 * 
 * Use semantic names (xs, sm, md, lg, xl) for consistency
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
} as const

/**
 * Layout Tokens
 * 
 * Semantic spacing for common layout patterns.
 * Use these instead of magic values for consistent layouts.
 */
export const layout = {
  /** Padding inside the main content area */
  pagePadding: 24,
  /** Gap between major sections on a page */
  sectionGap: 24,
  /** Gap between cards or content blocks */
  cardGap: 16,
  /** Padding inside cards */
  cardPadding: 24,
  /** Gap between form fields or list items */
  itemGap: 12,
  /** Header height */
  headerHeight: 64,
  /** Sidebar width (expanded) */
  sidebarWidth: 220,
  /** Sidebar width (collapsed) */
  sidebarCollapsedWidth: 64,
} as const

// ============================================================================
// SHAPE TOKENS
// ============================================================================

/**
 * Border Radius
 * 
 * Use sm for small elements, md for cards/inputs, lg for modals
 */
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 6, // Default for most components
  lg: 8,
  xl: 12,
  full: 9999,
} as const

/**
 * Shadows
 */
export const shadow = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 2px 8px rgba(0, 0, 0, 0.1)',
  md: '0 4px 12px rgba(0, 0, 0, 0.1)',
  lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
} as const

// ============================================================================
// EXPORTS FOR THEME CONFIG
// ============================================================================

/**
 * Consolidated tokens object for easy import
 */
export const tokens = {
  colors: {
    primary,
    secondary,
    neutral,
    semantic,
  },
  typography: {
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    headings,
  },
  spacing,
  layout,
  shape: {
    borderRadius,
    shadow,
  },
} as const

export default tokens
