// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://italianpizzacatering.com.au/',
      lastModified: new Date(),
    },
    {
      url: 'https://www.italianpizzacatering.com.au/pages/menu',
      lastModified: new Date(),
    },
  ]
}
