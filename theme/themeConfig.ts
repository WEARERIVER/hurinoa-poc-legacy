import type { ThemeConfig } from 'antd'
import { primary, secondary, neutral, fontFamily, fontSize, borderRadius, shadow } from './tokens'

/**
 * Ant Design Theme Configuration
 * ==============================
 * This file configures the Ant Design theme using our design tokens.
 * 
 * Design Direction: Warm, approachable, grounded
 * - Coral/terracotta primary for energy and warmth
 * - Warm teal secondary for balance
 * - Warm-tinted neutrals for a softer feel
 * 
 * Source of truth: ./tokens.ts
 */

const theme: ThemeConfig = {
  token: {
    // Primary colour — warm coral
    colorPrimary: primary[500],
    
    // Link colour — slightly darker for readability
    colorLink: primary[600],
    colorLinkHover: primary[500],
    colorLinkActive: primary[700],
    
    // Success colour — warm teal
    colorSuccess: secondary[500],
    
    // Text colours — warm neutrals
    colorTextBase: neutral[800],
    colorText: neutral[700],
    colorTextSecondary: neutral[600],
    colorTextTertiary: neutral[500],
    colorTextQuaternary: neutral[400],
    
    // Background — warm off-white
    colorBgBase: '#fffffe',
    colorBgLayout: neutral[50],
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',
    
    // Borders — warm tinted
    colorBorder: neutral[200],
    colorBorderSecondary: neutral[100],
    
    // Typography
    fontFamily: fontFamily.base,
    fontSize: fontSize.base,
    
    // Border radius — softer, rounder
    borderRadius: borderRadius.md,
    borderRadiusLG: borderRadius.lg,
    borderRadiusSM: borderRadius.sm,
    
    // Line height
    lineHeight: 1.5,
    
    // Box shadow — warm tinted
    boxShadow: shadow.base,
    boxShadowSecondary: shadow.md,
  },
  components: {
    Button: {
      primaryShadow: 'none',
      borderRadius: borderRadius.md,
      controlHeight: 40,
      fontWeight: 500,
    },
    Card: {
      paddingLG: 24,
      borderRadiusLG: borderRadius.lg,
    },
    Table: {
      fontSize: fontSize.sm,
      borderRadius: borderRadius.md,
    },
    Input: {
      borderRadius: borderRadius.md,
      controlHeight: 40,
    },
    Select: {
      borderRadius: borderRadius.md,
      controlHeight: 40,
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
      itemSelectedBg: primary[50],
      fontWeightStrong: 500,
    },
    Tag: {
      borderRadiusSM: borderRadius.sm,
    },
    Modal: {
      borderRadiusLG: borderRadius.xl,
    },
    Message: {
      borderRadiusLG: borderRadius.lg,
    },
  },
}

export default theme
