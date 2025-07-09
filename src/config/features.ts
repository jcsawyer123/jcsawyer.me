export const features = {
  blog: false,
  contact: false,
} as const;

export type FeatureKey = keyof typeof features;

export function isFeatureEnabled(feature: FeatureKey): boolean {
  return features[feature];
}