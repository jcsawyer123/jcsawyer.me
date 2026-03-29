export function isActive(currentPath: string, href: string): boolean {
  if (href === '/') return currentPath === '/';
  if (href.startsWith('/#')) return currentPath === '/' || currentPath === href.substring(1);
  return currentPath.startsWith(href);
}
