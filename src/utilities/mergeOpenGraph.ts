import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'My open-source portfolio built with Payload CMS, Next.js, and Tailwind CSS.',
  images: [
    {
      url: process.env.NEXT_PUBLIC_SERVER_URL
        ? `${process.env.NEXT_PUBLIC_SERVER_URL}/vg_dark.png`
        : '/vg_dark.png',
    },
  ],
  siteName: 'Vincent Gachet Portfolio',
  title: 'Vincent Gachet Portfolio',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
