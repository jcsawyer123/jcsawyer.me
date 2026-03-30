export function absoluteUrl(pathname: string, site: URL | string | undefined): string {
  if (!site) {
    throw new Error('Astro.site is not configured');
  }

  return new URL(pathname, site).toString();
}
