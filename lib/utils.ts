// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Normalize text for searching by removing diacritics/macrons.
 * This allows "Mahaki" to match "Māhaki", "Tuhoe" to match "Tūhoe", etc.
 * 
 * Uses Unicode normalization (NFD) to decompose characters into base + 
 * combining diacritical marks, then strips the combining marks.
 */
export function normalizeForSearch(text: string): string {
  return text
    .normalize('NFD')                    // Decompose: ā → a + combining macron
    .replace(/[\u0300-\u036f]/g, '')     // Remove combining diacritical marks
    .toLowerCase()
}

/**
 * Check if a search query matches a target string (diacritic-insensitive).
 */
export function matchesSearch(target: string, query: string): boolean {
  if (!query) return true
  return normalizeForSearch(target).includes(normalizeForSearch(query))
}
