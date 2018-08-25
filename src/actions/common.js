export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export function toggle_sidebar(showSidebar) {
  return {
    type: TOGGLE_SIDEBAR,
    toggle: !showSidebar
  }
}
