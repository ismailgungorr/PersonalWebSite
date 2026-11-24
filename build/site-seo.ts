import { isIP } from 'node:net'
import type { HtmlTagDescriptor, Plugin } from 'vite'
import { socialPlatforms } from '../src/data/contact.ts'
import { profile } from '../src/data/profile.ts'
import tr from '../src/locales/tr.json' with { type: 'json' }

const imagePath = 'images/og-image.png'

function publicSiteUrl(value: string | undefined) {
  if (!value?.trim()) return undefined
  const url = new URL(value)
  if (
    url.protocol !== 'https:' ||
    !/^[a-z0-9-]+(?:\.[a-z0-9-]+)+$/i.test(url.hostname) ||
    url.hostname.endsWith('.localhost') ||
    isIP(url.hostname) ||
    url.username ||
    url.password ||
    url.port ||
    url.pathname !== '/' ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      'VITE_SITE_URL must be the public HTTPS origin of the portfolio.',
    )
  }
  return url
}

export function siteSeo(env: Record<string, string>, isBuild: boolean): Plugin {
  const url = publicSiteUrl(env.VITE_SITE_URL)
  const indexable = Boolean(
    isBuild && url && env.VITE_SITE_INDEXABLE === 'true',
  )
  const metadata = tr.meta
  const meta = (
    type: 'name' | 'property',
    key: string,
    content: string,
  ): HtmlTagDescriptor => ({
    tag: 'meta',
    attrs: { [type]: key, content },
    injectTo: 'head',
  })

  return {
    name: 'portfolio-seo',
    transformIndexHtml(html) {
      const tags = [
        meta('property', 'og:type', 'website'),
        meta('property', 'og:site_name', profile.name),
        meta('property', 'og:title', metadata.title),
        meta('property', 'og:description', metadata.description),
        meta('property', 'og:locale', 'tr_TR'),
        meta('name', 'twitter:card', 'summary_large_image'),
        meta('name', 'twitter:title', metadata.title),
        meta('name', 'twitter:description', metadata.description),
      ]

      if (url) {
        const imageUrl = new URL(imagePath, url).href
        tags.push(
          {
            tag: 'link',
            attrs: { rel: 'canonical', href: url.href },
            injectTo: 'head',
          },
          meta('property', 'og:url', url.href),
          meta('property', 'og:image', imageUrl),
          meta('property', 'og:image:width', '1200'),
          meta('property', 'og:image:height', '630'),
          meta('property', 'og:image:alt', metadata.imageAlt),
          meta('name', 'twitter:image', imageUrl),
          meta('name', 'twitter:image:alt', metadata.imageAlt),
        )
      }

      const person = {
        '@type': 'Person',
        ...(url && { '@id': new URL('#person', url).href, url: url.href }),
        name: profile.name,
        description: metadata.description,
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: tr.profile.education.university,
        },
        sameAs: socialPlatforms
          .filter(({ enabled }) => enabled)
          .map(({ url }) => url),
      }
      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        ...(url && { url: url.href }),
        inLanguage: 'tr',
        mainEntity: person,
      }
      tags.push({
        tag: 'script',
        attrs: { type: 'application/ld+json' },
        children: JSON.stringify(structuredData).replaceAll('<', '\\u003c'),
        injectTo: 'head',
      })

      return {
        html: html.replace(
          'content="noindex, follow"',
          indexable ? 'content="index, follow"' : 'content="noindex, follow"',
        ),
        tags,
      }
    },
    generateBundle() {
      const sitemap =
        indexable && url ? new URL('sitemap.xml', url).href : undefined
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n${sitemap ? `Sitemap: ${sitemap}\n` : ''}`,
      })
      if (sitemap && url) {
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${url.href}</loc></url></urlset>\n`,
        })
      }
    },
  }
}
