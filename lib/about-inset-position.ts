export type AboutInsetPosition = {
  x: number;
  y: number;
};

export const DEFAULT_ABOUT_INSET_POSITION: AboutInsetPosition = {
  x: 50,
  y: 51,
};

export const DEFAULT_EXPERIENCE_BADGE_POSITION: AboutInsetPosition = {
  x: 62,
  y: 3,
};

export const DEFAULT_ABOUT_INSET_WIDTH_PERCENT = 58;
export const DEFAULT_EXPERIENCE_BADGE_WIDTH_PERCENT = 28;
/** How far draggable elements can extend beyond the background edges (in %). */
export const ABOUT_INSET_OVERFLOW_PERCENT = 20;

const PORTRAIT_ASPECT = 4 / 5;
const INSET_ASPECT = 4 / 3;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function getAboutInsetHeightPercent(widthPercent: number) {
  return widthPercent * PORTRAIT_ASPECT * (1 / INSET_ASPECT);
}

export function normalizeAboutInsetPosition(
  position?: Partial<AboutInsetPosition> | null,
): AboutInsetPosition {
  return {
    x: position?.x ?? DEFAULT_ABOUT_INSET_POSITION.x,
    y: position?.y ?? DEFAULT_ABOUT_INSET_POSITION.y,
  };
}

export function getExperienceBadgeHeightPercent(widthPercent: number) {
  return widthPercent * PORTRAIT_ASPECT;
}

export function normalizeExperienceBadgePosition(
  position?: Partial<AboutInsetPosition> | null,
): AboutInsetPosition {
  return {
    x: position?.x ?? DEFAULT_EXPERIENCE_BADGE_POSITION.x,
    y: position?.y ?? DEFAULT_EXPERIENCE_BADGE_POSITION.y,
  };
}

export function clampExperienceBadgePosition(
  position: AboutInsetPosition,
  widthPercent = DEFAULT_EXPERIENCE_BADGE_WIDTH_PERCENT,
): AboutInsetPosition {
  const heightPercent = getExperienceBadgeHeightPercent(widthPercent);
  const overflow = ABOUT_INSET_OVERFLOW_PERCENT;

  return {
    x: clamp(position.x, -overflow, 100 - widthPercent + overflow),
    y: clamp(position.y, -overflow, 100 - heightPercent + overflow),
  };
}

export function clampAboutInsetPosition(
  position: AboutInsetPosition,
  widthPercent = DEFAULT_ABOUT_INSET_WIDTH_PERCENT,
): AboutInsetPosition {
  const heightPercent = getAboutInsetHeightPercent(widthPercent);
  const overflow = ABOUT_INSET_OVERFLOW_PERCENT;

  return {
    x: clamp(position.x, -overflow, 100 - widthPercent + overflow),
    y: clamp(position.y, -overflow, 100 - heightPercent + overflow),
  };
}
