import { getSecret } from 'astro:env/server';

const defaultFlags = {
  showBlogPage: false,
  showContactPage: false,
  showSelectedWorkPage: false,
  showHomepageExperience: false,
  showHomepageExperienceBullets: false,
  showHomepageSkills: false,
  showHomepageSelectedWork: false,
  showHomepageWriting: false,
  showDrafts: false,
  useCompactBlogArchive: false,
  enableHeadingAnchors: false,
} as const;

export type FlagName = keyof typeof defaultFlags;
export type Flags = typeof defaultFlags;

const parseBoolean = (value: string | undefined): boolean | undefined => {
  if (value === undefined) return undefined;

  const normalized = value.trim().toLowerCase();
  if (['1', 'true', 'yes', 'on'].includes(normalized)) return true;
  if (['0', 'false', 'no', 'off'].includes(normalized)) return false;

  return undefined;
};

const envKeyMap: Record<FlagName, string> = {
  showBlogPage: 'FLAG_SHOW_BLOG_PAGE',
  showContactPage: 'FLAG_SHOW_CONTACT_PAGE',
  showSelectedWorkPage: 'FLAG_SHOW_SELECTED_WORK_PAGE',
  showHomepageExperience: 'FLAG_SHOW_HOMEPAGE_EXPERIENCE',
  showHomepageExperienceBullets: 'FLAG_SHOW_HOMEPAGE_EXPERIENCE_BULLETS',
  showHomepageSkills: 'FLAG_SHOW_HOMEPAGE_SKILLS',
  showHomepageSelectedWork: 'FLAG_SHOW_HOMEPAGE_SELECTED_WORK',
  showHomepageWriting: 'FLAG_SHOW_HOMEPAGE_WRITING',
  showDrafts: 'FLAG_SHOW_DRAFTS',
  useCompactBlogArchive: 'FLAG_USE_COMPACT_BLOG_ARCHIVE',
  enableHeadingAnchors: 'FLAG_ENABLE_HEADING_ANCHORS',
};

export const flags: Flags = Object.fromEntries(
  (Object.keys(defaultFlags) as FlagName[]).map((flagName) => {
    const envOverride = parseBoolean(getSecret(envKeyMap[flagName]));
    return [flagName, envOverride ?? defaultFlags[flagName]];
  })
) as Flags;

export const isEnabled = (flagName: FlagName): boolean => flags[flagName];

export const flagEnvKeys = envKeyMap;
