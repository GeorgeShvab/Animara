import { Metadata } from 'next'
import { FC } from 'react'

const NotFound: FC = () => {
  return (
    <main className="bg-black min-h-screen flex justify-center items-center">
      <div>
        <div className="flex justify-center h-64 md:h-80 mb-10">
          <img src="/not-found.png" height="100%" width="auto" alt="Not Found" />
        </div>
        <p className="text-white text-center text-6xl font-bold mb-10">404</p>
        <p className="text-neutral-300 text-center">Page was not found</p>
      </div>
    </main>
  )
}

export const metadata: Metadata = {
  title: 'Not Found',
  description: 'Page was not found.',
  themeColor: '#0c0c0c',
  openGraph: {
    images: ['/og.png'],
    title: 'Not Found',
    description: 'Page was not found.',
    type: 'website',
    url: '/',
  },
  twitter: {
    images: ['/og.png'],
    title: 'Not Found',
    description: 'Page was not found.',
    card: 'summary_large_image',
    site: '@Zhorrrro',
  },
}

export default NotFound
