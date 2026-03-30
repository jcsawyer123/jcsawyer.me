export const defaultFlags = {
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
};

export const flagEnvKeys = {
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

export const parseBoolean = (value, fallback) => {
  if (typeof value !== 'string') return fallback;

  const normalized = value.trim().toLowerCase();
  if (['1', 'true', 'yes', 'on'].includes(normalized)) return true;
  if (['0', 'false', 'no', 'off'].includes(normalized)) return false;

  return fallback;
};

export const resolveFlags = (env) =>
  Object.fromEntries(
    Object.entries(defaultFlags).map(([flagName, defaultValue]) => [
      flagName,
      parseBoolean(env[flagEnvKeys[flagName]], defaultValue),
    ]),
  );
