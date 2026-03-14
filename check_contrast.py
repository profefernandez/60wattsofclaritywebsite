#!/usr/bin/env python3
"""
WCAG 2.1 Color Contrast Checker for 60 Watts of Clarity
=========================================================

Measures contrast ratios for all color pairs used in the design
and validates against WCAG 2.1 success criteria:

  - Level AA: 4.5:1 (normal text), 3:1 (large text / UI components)
  - Level AAA: 7:1 (normal text), 4.5:1 (large text)

Usage:
  python3 check_contrast.py

Reference: https://www.w3.org/TR/WCAG21/#contrast-minimum
"""

from __future__ import annotations
import re
import math


# ─── Color palette from src/index.css ─────────────────────────────────────────

COLORS = {
    "bg-base": "#0a0b1e",
    "bg-surface": "#111228",
    "bg-elevated": "#181932",
    "accent-primary": "#38bdf8",       # sky-400
    "accent-secondary": "#fbbf24",     # amber-400
    "accent-green": "#34d399",         # emerald-400
    "text-primary": "#f8fafc",         # slate-50
    "text-secondary": "#cbd5e1",       # slate-300
    "text-muted": "#94a3b8",           # slate-400
    "btn-primary-bg": "#38bdf8",       # sky-400
    "btn-primary-text": "#0a0b1e",     # dark navy
    "btn-amber-text": "#1c1917",       # stone-900 (text on amber btn)
    "amber-btn": "#fbbf24",            # amber-400
    "slate-900": "#0f172a",
    "white": "#ffffff",
    "sky-500": "#0ea5e9",
    "sky-400": "#38bdf8",
    "amber-400": "#fbbf24",
    "emerald-400": "#34d399",
    "rose-400": "#fb7185",
    "violet-400": "#a78bfa",
    "slate-400": "#94a3b8",
    "slate-300": "#cbd5e1",
    "slate-500": "#64748b",
}

# ─── Color pairs to check ─────────────────────────────────────────────────────

COLOR_PAIRS = [
    # (foreground_key, background_key, use_case)
    # Text on dark backgrounds
    ("text-primary",    "bg-base",      "Body text on page background"),
    ("text-secondary",  "bg-base",      "Secondary text on page background"),
    ("text-muted",      "bg-base",      "Muted text on page background"),
    ("text-primary",    "bg-surface",   "Body text on card surface"),
    ("text-secondary",  "bg-surface",   "Secondary text on card surface"),
    ("white",           "bg-base",      "White text on page background"),
    # Accent on dark
    ("accent-primary",  "bg-base",      "Sky-400 accent on dark bg (decorative/large)"),
    ("accent-secondary","bg-base",      "Amber-400 accent on dark bg (decorative/large)"),
    ("accent-green",    "bg-base",      "Emerald-400 accent on dark bg (decorative/large)"),
    # Buttons
    ("btn-primary-text","btn-primary-bg","Dark navy text on sky-400 button (primary CTA)"),
    ("btn-amber-text",  "amber-btn",    "Dark text on amber button"),
    # Interactive elements
    ("sky-400",         "bg-surface",   "Sky-400 interactive on surface"),
    ("amber-400",       "bg-surface",   "Amber-400 interactive on surface"),
    ("emerald-400",     "bg-surface",   "Emerald-400 interactive on surface"),
    ("violet-400",      "bg-surface",   "Violet-400 interactive on surface"),
    # Error/status
    ("rose-400",        "bg-base",      "Rose-400 error text on dark bg"),
    # Footer/muted
    ("slate-400",       "bg-base",      "Slate-400 footer text on dark bg"),
    ("slate-300",       "bg-base",      "Slate-300 footer text on dark bg"),
]

# ─── Utilities ─────────────────────────────────────────────────────────────────

def hex_to_rgb(hex_color: str) -> tuple[int, int, int]:
    """Convert #RRGGBB or #RGB hex string to (R, G, B) tuple."""
    hex_color = hex_color.lstrip("#")
    if len(hex_color) == 3:
        hex_color = "".join(c * 2 for c in hex_color)
    r = int(hex_color[0:2], 16)
    g = int(hex_color[2:4], 16)
    b = int(hex_color[4:6], 16)
    return r, g, b


def relative_luminance(hex_color: str) -> float:
    """
    Calculate the relative luminance of a color.
    https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
    """
    r, g, b = hex_to_rgb(hex_color)

    def linearize(c: int) -> float:
        srgb = c / 255.0
        if srgb <= 0.04045:
            return srgb / 12.92
        return math.pow((srgb + 0.055) / 1.055, 2.4)

    R = linearize(r)
    G = linearize(g)
    B = linearize(b)

    return 0.2126 * R + 0.7152 * G + 0.0722 * B


def contrast_ratio(fg: str, bg: str) -> float:
    """
    Calculate WCAG contrast ratio between two hex colors.
    Returns value in range [1, 21].
    """
    l1 = relative_luminance(fg)
    l2 = relative_luminance(bg)
    lighter = max(l1, l2)
    darker = min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)


def wcag_level(ratio: float, large_text: bool = False) -> str:
    """Return the highest WCAG level met for the given contrast ratio."""
    if large_text:
        if ratio >= 4.5:
            return "AAA"
        elif ratio >= 3.0:
            return "AA"
        else:
            return "FAIL"
    else:
        if ratio >= 7.0:
            return "AAA"
        elif ratio >= 4.5:
            return "AA"
        elif ratio >= 3.0:
            return "AA (large/UI only)"
        else:
            return "FAIL"


# ─── Main ─────────────────────────────────────────────────────────────────────

def main() -> None:
    print("=" * 72)
    print("  60 Watts of Clarity — WCAG 2.1 Color Contrast Report")
    print("=" * 72)
    print(f"  {'Foreground':<22} {'Background':<22} {'Ratio':>7}  {'Level'}")
    print("-" * 72)

    results: list[dict] = []
    failures: list[dict] = []

    for fg_key, bg_key, use_case in COLOR_PAIRS:
        fg_hex = COLORS[fg_key]
        bg_hex = COLORS[bg_key]
        ratio = contrast_ratio(fg_hex, bg_hex)
        level = wcag_level(ratio)
        is_fail = "FAIL" in level and "large" not in level

        result = {
            "fg": f"{fg_key} ({fg_hex})",
            "bg": f"{bg_key} ({bg_hex})",
            "ratio": ratio,
            "level": level,
            "use_case": use_case,
            "fail": is_fail,
        }
        results.append(result)
        if is_fail:
            failures.append(result)

        status_icon = "✗" if is_fail else "✓"
        ratio_str = f"{ratio:.2f}:1"
        fg_display = f"{fg_key} ({fg_hex})"
        bg_display = f"{bg_key} ({bg_hex})"
        print(
            f"  {status_icon} {fg_display[:21]:<22} {bg_display[:21]:<22} "
            f"{ratio_str:>7}  {level}"
        )

    print("-" * 72)
    print(f"\n  Pairs checked: {len(results)}")
    print(f"  Passing AA:    {sum(1 for r in results if 'FAIL' not in r['level'])}")
    print(f"  Passing AAA:   {sum(1 for r in results if r['level'] == 'AAA')}")
    print(f"  Failures:      {len(failures)}")

    if failures:
        print("\n  ⚠  FAILURES — colors below minimum WCAG AA threshold:")
        for f in failures:
            print(f"     • {f['use_case']}")
            print(f"       {f['fg']} on {f['bg']}")
            print(f"       Contrast: {f['ratio']:.2f}:1 (need ≥4.5:1)")
    else:
        print("\n  ✓  All color pairs meet WCAG 2.1 AA requirements.")
        aaa_count = sum(1 for r in results if r["level"] == "AAA")
        print(f"  ✓  {aaa_count}/{len(results)} pairs meet WCAG 2.1 AAA requirements.")

    print("\n" + "=" * 72)
    print("  WCAG 2.1 Contrast Requirements:")
    print("    AA  — Normal text: 4.5:1  |  Large text/UI: 3:1")
    print("    AAA — Normal text: 7:1    |  Large text:    4.5:1")
    print("=" * 72)

    # Return non-zero exit code if there are failures
    if failures:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
