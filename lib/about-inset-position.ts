export type AboutInsetPosition = {
  x: number;
  y: number;
};

export const DEFAULT_ABOUT_INSET_POSITION: AboutInsetPosition = {
  x: 50,
  y: 51,
};

export const DEFAULT_ABOUT_INSET_WIDTH_PERCENT = 58;
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
    x: clamp(position?.x ?? DEFAULT_ABOUT_INSET_POSITION.x, 0, 100),
    y: clamp(position?.y ?? DEFAULT_ABOUT_INSET_POSITION.y, 0, 100),
  };
}

export function clampAboutInsetPosition(
  position: AboutInsetPosition,
  widthPercent = DEFAULT_ABOUT_INSET_WIDTH_PERCENT,
): AboutInsetPosition {
  const heightPercent = getAboutInsetHeightPercent(widthPercent);

  return {
    x: clamp(position.x, 0, 100 - widthPercent),
    y: clamp(position.y, 0, 100 - heightPercent),
  };
}
