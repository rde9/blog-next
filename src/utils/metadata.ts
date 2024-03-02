import { JSDOM, VirtualConsole } from 'jsdom';

export type SiteMetadata = {
  url: string;
  site_name?: string;
  title?: string;
  description?: string;
  image?: string;
  type?: string;
};

export async function fetchSiteMetadata(
  url: string,
): Promise<SiteMetadata | null> {
  const headers = new Headers({
    Accept: 'text/html application/xhtml+xml',
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/109.0',
    'Accept-Encoding': 'gzip, deflate, br',
  });
  const response = await fetch(url, { headers, next: { revalidate: 60 * 60 } });
  if (!response.ok) {
    return null;
  }

  const html = await response.text();
  const metadata: SiteMetadata = { url };
  const virtualConsole = new VirtualConsole();
  const jsdom = new JSDOM(html, { virtualConsole });

  const title = jsdom.window.document.title;
  metadata.title = title;

  const metaTags = jsdom.window.document.getElementsByTagName('meta');

  // 只有在使用 "--downlevelIteration" 标志或 "--target" 为 "es2015" 或更高版本时，才能循环访问类型“HTMLCollectionOf”。
  for (const meta of metaTags) {
    const property = meta.getAttribute('property');

    if (property === 'og:site_name') {
      metadata.site_name = meta.getAttribute('content') ?? undefined;
    }
    if (property === 'og:title') {
      metadata.title = meta.getAttribute('content') ?? title;
    }
    if (property === 'og:description') {
      metadata.description = meta.getAttribute('content') ?? undefined;
    }
    if (property === 'og:image') {
      metadata.image = meta.getAttribute('content') ?? undefined;
    }
    if (property === 'og:type') {
      metadata.type = meta.getAttribute('content') ?? undefined;
    }

    const metaName = meta.getAttribute('name');

    if (metaName === 'description') {
      metadata.description = meta.getAttribute('content') ?? undefined;
    }
  }

  return metadata;
}

export function getFaviconUrl(pageUrl: string, size: 16 | 32 | 64 = 64) {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
    pageUrl,
  )}&size=${size}`;
}
