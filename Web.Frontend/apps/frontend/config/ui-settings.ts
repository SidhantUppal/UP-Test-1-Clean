// UI timing configurations - DO NOT MODIFY without user approval
// This file centralizes all UI timing constants to prevent accidental changes during updates

export const UI_TIMINGS = {
  // Dropdown close delay - set to 500ms (0.5 seconds) for better UX
  // This prevents accidental dropdown closes during mouse movement
  // User preference: DO NOT change during routine code updates
  DROPDOWN_CLOSE_DELAY: 500, // milliseconds
  
  // Other UI timings can be added here as needed
  TOOLTIP_DELAY: 500,              // Delay before showing tooltips
  MODAL_TRANSITION: 300,           // Modal fade in/out duration
  NOTIFICATION_DURATION: 5000,     // How long notifications stay visible
  SEARCH_DEBOUNCE: 300,           // Delay for search input debouncing
  ANIMATION_DURATION: 200,         // Default animation duration
};

// Export individual constants to prevent accidental modification
// These should be imported where needed instead of using magic numbers
export const DROPDOWN_CLOSE_DELAY = UI_TIMINGS.DROPDOWN_CLOSE_DELAY;
export const TOOLTIP_DELAY = UI_TIMINGS.TOOLTIP_DELAY;
export const MODAL_TRANSITION = UI_TIMINGS.MODAL_TRANSITION;
export const NOTIFICATION_DURATION = UI_TIMINGS.NOTIFICATION_DURATION;
export const SEARCH_DEBOUNCE = UI_TIMINGS.SEARCH_DEBOUNCE;
export const ANIMATION_DURATION = UI_TIMINGS.ANIMATION_DURATION;

// Type definitions for better IDE support
export type UITimingKey = keyof typeof UI_TIMINGS;
export type UITimingValue = typeof UI_TIMINGS[UITimingKey];