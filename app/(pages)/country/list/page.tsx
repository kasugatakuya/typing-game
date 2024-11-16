import data from '@/app/country.json'
import Image from 'next/image'
export default function Country() {
  // const data = ['りんご', 2, 3, 4, 5]
  const obj = {
    id: '1',
    name: '北海道',
    romaji: 'hokkaidou',
    subName: '札幌市',
    subRomaji: 'sapporoshi',
    birdName: '丹頂鶴(たんちょう)',
    birdRomaji: 'tanchou',
    flowerName: 'ハマナス(はまなす)',
    flowerRomaji: 'hamanasu',
    treeName: 'エゾマツ(えぞまつ)',
    treeRomaji: 'ezomatsu',
  }
  // const data = [
  //   {
  //     id: '1',
  //     name: '北海道',
  //     romaji: 'hokkaidou',
  //     subName: '札幌市',
  //     subRomaji: 'sapporoshi',
  //     birdName: '丹頂鶴(たんちょう)',
  //     birdRomaji: 'tanchou',
  //     flowerName: 'ハマナス(はまなす)',
  //     flowerRomaji: 'hamanasu',
  //     treeName: 'エゾマツ(えぞまつ)',
  //     treeRomaji: 'ezomatsu',
  //   },
  //   {
  //     id: '2',
  //     name: '青森県',
  //     romaji: 'aomoriken',
  //     subName: '青森市',
  //     subRomaji: 'aomorishi',
  //     birdName: '白鳥(はくちょう)',
  //     birdRomaji: 'hakuchou',
  //     flowerName: 'りんごの花(りんごのはな)',
  //     flowerRomaji: 'ringonohana',
  //     treeName: 'ヒバ(ひば)',
  //     treeRomaji: 'hiba',
  //   },
  //   {
  //     id: '3',
  //     name: '岩手県',
  //     romaji: 'iwateken',
  //     subName: '盛岡市',
  //     subRomaji: 'moriokashi',
  //     birdName: '雉(きじ)',
  //     birdRomaji: 'kiji',
  //     flowerName: 'キリ(きり)',
  //     flowerRomaji: 'kiri',
  //     treeName: 'ナンブアカマツ(なんぶあかまつ)',
  //     treeRomaji: 'nanbuakamatsu',
  //   },
  //   {
  //     id: '4',
  //     name: '岩手県',
  //     romaji: 'iwateken',
  //     subName: '盛岡市',
  //     subRomaji: 'moriokashi',
  //     birdName: '雉(きじ)',
  //     birdRomaji: 'kiji',
  //     flowerName: 'キリ(きり)',
  //     flowerRomaji: 'kiri',
  //     treeName: 'ナンブアカマツ(なんぶあかまつ)',
  //     treeRomaji: 'nanbuakamatsu',
  //   },
  // ]
  return (
    <div className='h-screen'>
      <main className='mt-32'>
        <div className='text-center'>ホーム</div>
      </main>
      {obj.id}
      {obj.name}
      <ul>
        {data.map((item) => (
          <div key={item.id}>
            <span key={item.id}>{item.romaji}</span>
            <Image
              src={`/country/${item.romaji}.png`}
              alt={item.name}
              width={150}
              height={150}
            />
          </div>
        ))}
      </ul>
    </div>
  )
}
