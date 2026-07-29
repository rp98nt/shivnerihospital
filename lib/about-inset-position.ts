export type AboutInsetPosition = {
  x: number;
  y: number;
};

export const DEFAULT_ABOUT_INSET_POSITION: AboutInsetPosition = {
  x: 50,
  y: 51,
};

export const DEFAULT_ABOUT_INSET_WIDTH_PERCENT = 58;
/** How far the overlay can extend beyond the background edges (in %). */
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
