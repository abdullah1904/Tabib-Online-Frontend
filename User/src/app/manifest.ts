import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tabib Online',
    short_name: 'Tabib Online',
    description: 'AI Enabled Healthcare Platform',
    start_url: '/doctors',
    display: 'standalone',
    background_color: '#E5E4E2',
    theme_color: '#3A5A40',
    icons: [
      {
        src: '/icon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}