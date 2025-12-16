import type { ThemeConfig } from 'antd'
import { primary, secondary, neutral, fontFamily, fontSize, borderRadius } from './tokens'

/**
 * Ant Design Theme Configuration
 * ==============================
 * This file configures the Ant Design theme using our design tokens.
 * 
 * Source of truth: ./tokens.ts
 * 
 * How to update:
 * 1. Edit token values in tokens.ts
 * 2. This config automatically uses the updated values
 * 3. All components inherit the changes
 */

const theme: ThemeConfig = {
  token: {
    // Primary colour (from tokens)
    colorPrimary: primary[500],
    
    // Secondary / success colour (from tokens)
    colorSuccess: secondary[500],
    
    // Text colours (improved contrast)
    colorTextBase: neutral[800],
    colorText: neutral[700],
    colorTextSecondary: neutral[600],
    colorTextTertiary: neutral[500],
    colorTextQuaternary: neutral[400],
    
    // Background
    colorBgBase: '#ffffff',
    colorBgLayout: neutral[50],
    
    // Typography (from tokens)
    fontFamily: fontFamily.base,
    fontSize: fontSize.base,
    
    // Border radius (from tokens)
    borderRadius: borderRadius.md,
    
    // Line height
    lineHeight: 1.5,
  },
  components: {
    Button: {
      primaryShadow: 'none',
    },
    Card: {
      paddingLG: 24,
    },
    Table: {
      fontSize: fontSize.sm,
    },
    Menu: {
      itemHeight: 44,
      itemMarginBlock: 4,
      itemMarginInline: 0,
      itemBorderRadius: borderRadius.lg,
      iconSize: 18,
      iconMarginInlineEnd: 12,
      itemColor: neutral[500],
      itemSelectedColor: primary[600],
      fontWeightStrong: 500,
    },
  },
}

export default theme
