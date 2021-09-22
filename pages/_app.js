import 'tailwindcss/tailwind.css'
import '../styles/global.css'
import Head from 'next/head'
import Sidebar from '../components/Sidebar'

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Informasi Kampus</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet"></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="bg-[#F4F8FB] w-full p-5">
          <Component {...pageProps} />
        </main>
      </div>
    </>
  )
}

export default MyApp
