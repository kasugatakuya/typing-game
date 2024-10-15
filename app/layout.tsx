import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'タイピングゲーム',
  description:
    'タイピングゲームは、指定された文字列を入力するゲームです。指定された文字列を入力することで、スコアが加算されます。',
  keywords: 'タイピングゲーム, タイピング, ゲーム',
  openGraph: {
    title: 'タイピングゲーム',
    description:
      'タイピングゲームは、指定された文字列を入力するゲームです。指定された文字列を入力することで、スコアが加算されます。',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja'>
      <body className={inter.className}>
        <header className='fixed top-0 w-full bg-black text-white'>
          <nav
            className='flex items-center justify-end px-6 py-2 lg:px-10 lg:py-5'
            aria-label='Global'
          >
            <div className='flex lg:gap-10 gap-3'>
              <Link href='/' className='font-bold'>
                <div className='lg:text-xl'>ホーム</div>
              </Link>
              <Link href='/game' className='font-bold'>
                <div className='lg:text-xl'>ゲーム</div>
              </Link>
              <Link href='/ranking' className='font-bold'>
                <div className='lg:text-xl'>ランキング</div>
              </Link>
              <Link href='/login' className='font-bold'>
                <div className='lg:text-xl'>ログイン</div>
              </Link>
              <Link href='/mypage' className='font-bold'>
                <div className='lg:text-xl'>マイページ</div>
              </Link>
              <Link href='/prefectures' className='font-bold'>
                <div className='lg:text-xl'>都道府県</div>
              </Link>
            </div>
          </nav>
        </header>

        {children}

        <footer className='text-md py-8 text-center bg-black text-white'>
          <p>© タイピングゲーム 2020-{new Date().getFullYear()}</p>
        </footer>
      </body>
    </html>
  )
}
