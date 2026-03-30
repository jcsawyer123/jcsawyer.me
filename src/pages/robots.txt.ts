export const prerender = true;

export function GET() {
  const sitemapUrl = new URL('/sitemap-index.xml', import.meta.env.SITE).toString();

  return new Response(
    `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`,
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    },
  );
}
