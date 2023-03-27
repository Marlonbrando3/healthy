import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import MainView from '@/components/MainView'
import Header from '@/components/Header'
import MainSection from '@/components/MainSection'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Head>
        <title>Healthy Living</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <MainView />
        <MainSection />
      </main>
    </div>
  )
}
