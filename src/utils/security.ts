import DOMPurify from 'dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks.
 * WCAG 2.1 Success Criterion 4.1.3 — Status Messages
 */
export function sanitizeHTML(dirty: string): string {
  if (typeof window === 'undefined') return dirty;
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'br', 'p'],
    ALLOWED_ATTR: ['href', 'title', 'target', 'rel'],
  });
}

/**
 * Sanitize plain text (removes all HTML tags).
 */
export function sanitizeText(input: string): string {
  return input.replace(/<[^>]*>/g, '').trim();
}

/**
 * Validate email address.
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Content Security Policy nonce helper (for inline scripts/styles).
 * In a real SSR setup, this would be generated per-request.
 */
export const CSP_HEADERS = {
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://prod.spline.design; frame-src 'none'; object-src 'none';",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};
