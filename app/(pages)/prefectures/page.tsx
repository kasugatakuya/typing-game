import Image from 'next/image'
export default function Home() {
  return (
    <div className='h-screen'>
      <main className='mt-32'></main>
      <div className='text-center md:m-20'>
        <div className='flex justify-center py-5'>
          <div className='md:text-2xl text-blue-700'>楽しくゲーム感覚で遊ぼう!</div>
          <div className='md:block hidden'>
            <Image
              width={200}
              height={200}
              src='/map-japan-10210.png'
              alt=''
            />
          </div>
        </div>
        <div className='py-5'>地図で示された都道府県が出てきます</div>
        <div className='md:text-3xl border rounded-md bg-red-300 py-5'>
          都道府県 タイピング 練習
        </div>
        <div className='my-10 border rounded-md bg-yellow-400'>
          <div>コース難易度は選べる3種類!</div>
          <div>かんたん：全5問の合計タイムを競います。</div>
          <div>ふつう：全20問の合計タイムを競います。</div>
          <div>むずかしい：全47問の合計タイムを競います。</div>
        </div>

        <div className='md:my-5 md:flex justify-center'>
          <div>
            <a
              className='border rounded-full bg-orange-300 md:px-10 md:py-3'
              href='/prefectures/game/easy'
            >
              かんたん
            </a>
          </div>
          <div>
            <a
              className='border rounded-full bg-orange-300 md:px-10 md:py-3'
              href='/game'
            >
              ふつう
            </a>
          </div>
          <div>
            <a
              className='border rounded-full bg-orange-300 md:px-10 md:py-3'
              href='/game'
            >
              むずかしい
            </a>
          </div>
        </div>

        <div className='border rounded-md bg-blue-300 pb-10'>
          <div className='my-3'>ユーザー登録する事でゲームの記録をつける事が出来ます。</div>
          <div className='md:flex justify-center'>
            <div>
              <a
                className='border rounded-full bg-white md:px-10 md:py-3'
                href='/game'
              >
                新規ユーザー登録
              </a>
            </div>
            <div>
              <a
                className='border rounded-full bg-white md:px-10 md:py-3'
                href='/game'
              >
                Googleでユーザー登録
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
