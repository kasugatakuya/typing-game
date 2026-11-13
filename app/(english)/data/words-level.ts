import type { EnglishDeck, WordGenre } from "./types";

/**
 * レベル別の英単語デッキ（高校・TOEIC スコア別）。
 * 1行が1デッキ（20語）で、"en=日本語|en=日本語|..." 形式。
 * 単語は独自に選定・訳出したもので、特定の単語帳の収録内容ではない。
 */
const levelDeck = (
  genre: WordGenre,
  idPrefix: string,
  label: string,
  index: number,
  pairs: string,
): EnglishDeck => {
  const items = pairs.split("|").map((pair) => {
    const [en, ja] = pair.split("=");
    return { en, ja };
  });
  const no = String(index).padStart(2, "0");
  return {
    id: `${idPrefix}-${no}`,
    section: "words",
    genre,
    title: `${label} ${no}`,
    description: `${items
      .slice(0, 3)
      .map((item) => item.en)
      .join("・")} など`,
    items,
  };
};

const HS_DECKS = [
  "abandon=見捨てる|appetite=食欲|bend=曲げる|celebrate=祝う|consequence=結果|debt=借金|discriminate=差別する|endure=耐える|external=外部の|forbid=禁じる|govern=統治する|hunger=飢え|intense=強烈な|lifetime=一生|mess=散らかった状態|obey=従う|personal=個人の|pretend=ふりをする|reality=現実|rival=競争相手",
  "sensation=感覚|solid=固体の|string=ひも|terror=恐怖|trial=裁判・試み|vital=不可欠の|ankle=足首|herd=群れ|appeal=訴える|belong=属する|cattle=牛|conscious=意識している|debate=討論|discover=発見する|enable=可能にする|express=表現する|fold=折りたたむ|glory=栄光|humor=ユーモア|intelligent=聡明な",
  "lie=うそ・横たわる|merit=長所|nutrition=栄養|persist=固執する|pressure=圧力|react=反応する|ripe=熟した|senior=年上の|soldier=兵士|strike=打つ|territory=領土|trend=傾向|vision=視力・展望|angle=角度|hatch=ふ化する|apparent=明白な|belief=信念|category=部門|congratulate=祝う|deaf=耳が聞こえない",
  "discipline=規律|employ=雇う|expose=さらす|focus=焦点|global=地球規模の|humid=湿気の多い|intellectual=知的な|liberty=自由|mere=ほんの|nuclear=核の|period=期間|press=押す・報道|ray=光線|riot=暴動|select=選ぶ|solar=太陽の|stretch=伸ばす|term=用語・期間|treaty=条約|visible=目に見える",
  "amuse=楽しませる|glow=輝く|apart=離れて|behavior=ふるまい|carbon=炭素|confuse=混乱させる|damage=損害|disaster=災害|empire=帝国|export=輸出する|fluent=流暢な|glance=ちらっと見る|human=人間|insult=侮辱する|liberal=自由主義の|mercy=慈悲|novel=小説|perform=行う・演じる|president=大統領|raw=生の",
  "ridiculous=ばかげた|seldom=めったに〜ない|soil=土|strength=力|tension=緊張|treat=扱う|virtue=美徳|ambassador=大使|fog=霧|anxious=心配して|behave=ふるまう|capture=捕らえる|confess=白状する|custom=習慣|disappoint=失望させる|emotion=感情|explore=探検する|flow=流れる|gift=贈り物|huge=巨大な",
  "instrument=楽器・器具|leisure=余暇|merchant=商人|notion=概念|perceive=知覚する|presence=存在|rather=むしろ|rid=取り除く|seize=つかむ|social=社会の|stream=小川|tend=傾向がある|treasure=宝物|violent=暴力的な|altitude=高度|flesh=肉|anxiety=不安|beg=懇願する|capital=首都・資本|concern=心配・関心",
  "curiosity=好奇心|disadvantage=不利|emergency=緊急事態|explode=爆発する|flood=洪水|giant=巨大な|household=家庭|instruct=指示する|legend=伝説|mental=精神の|normal=普通の|penalty=罰|prejudice=偏見|rare=まれな|rhythm=リズム|seem=〜のように思える|soak=浸す|stir=かき混ぜる|technique=技術|trap=わな",
  "violate=違反する|ally=同盟国|fertile=肥沃な|annoy=いらいらさせる|battle=戦い|capable=能力がある|concept=概念|cultivate=耕す|direct=直接の|emerge=現れる|expert=専門家|float=浮かぶ|gesture=身ぶり|host=主人|institution=機関|lecture=講義|melt=溶ける|noble=高貴な|peculiar=独特の|precise=正確な",
  "rapid=急速な|revolution=革命|seek=探し求める|smooth=なめらかな|stimulate=刺激する|tear=涙・引き裂く|transport=輸送する|view=眺め・見方|ache=痛み|erupt=噴火する|ancient=古代の|basis=基礎|cancer=がん|concentrate=集中する|cruel=残酷な|dinosaur=恐竜|embarrass=恥ずかしい思いをさせる|expedition=遠征|flavor=風味|genuine=本物の",
  "horror=恐怖|instinct=本能|leap=跳ぶ|medium=中間の・媒体|nevertheless=それにもかかわらず|pause=休止|precious=貴重な|race=競走・人種|reverse=逆|seed=種|smell=におい|stick=棒・くっつく|target=目標|transmit=送る|victory=勝利|zone=地帯|embassy=大使館|ancestor=祖先|barrier=障壁|bury=埋める",
  "compose=構成する|crowd=群衆|dignity=尊厳|element=要素|exist=存在する|flash=ひらめき|genius=天才|horizon=地平線|instance=例|lean=もたれる|medical=医療の|neutral=中立の|path=小道|pray=祈る|quit=やめる|revenge=復讐|section=部分|slip=滑る|steep=険しい|talent=才能",
  "translate=翻訳する|victim=犠牲者|youth=若さ|elbow=ひじ|ambulance=救急車|barely=かろうじて|burst=破裂する|complicated=込み入った|crop=作物|digest=消化する|elect=選ぶ|exhaust=疲れ果てさせる|flame=炎|generation=世代|honor=名誉|inspire=奮い立たせる|league=連盟|mechanical=機械の|nerve=神経|passive=受け身の",
  "praise=ほめる|quarter=4分の1|reveal=明らかにする|secret=秘密|slight=わずかな|steam=蒸気|tale=物語|transform=変形させる|vessel=船・容器|yell=叫ぶ|echo=こだま|ambition=野心|bare=裸の|burn=燃える|complex=複雑な|criticize=批判する|dig=掘る|elder=年上の|excuse=言い訳|fit=合う",
  "general=一般的な|holy=神聖な|insist=主張する|leaf=葉|measure=測る|neglect=怠る|passion=情熱|poverty=貧困|quarrel=口論|resource=資源|sculpture=彫刻|slave=奴隷|steal=盗む|tail=尾|trail=跡・小道|vertical=垂直の|wrap=包む|dwell=住む|amaze=驚かせる|ban=禁止する",
  "burden=重荷|complain=不平を言う|critical=批判的な・重大な|differ=異なる|educate=教育する|excess=過剰|fight=戦う|gene=遺伝子|hero=英雄|innovation=革新|lead=導く|means=手段|negative=否定的な|particular=特定の|pour=注ぐ|quantity=量|resist=抵抗する|scream=悲鳴を上げる|site=場所|steady=着実な",
  "symbol=象徴|tragedy=悲劇|version=版|wound=傷|dose=服用量|alter=変える|background=背景|broadcast=放送する|compete=競争する|critic=批評家|dialect=方言|edit=編集する|exception=例外|fierce=激しい|gender=性別|heritage=遺産|innocent=無罪の|layer=層|maximum=最大の|necessity=必要性",
  "parliament=議会|possess=所有する|puzzle=困らせる・パズル|resemble=似ている|scratch=ひっかく|sink=沈む|status=地位|swing=揺れる|track=跡・追跡する|vast=広大な|worth=価値がある|dive=飛び込む|alive=生きている|awkward=ぎこちない|broad=広い|companion=仲間|crisis=危機|devote=ささげる|edge=端|except=〜を除いて",
  "fiction=小説|gaze=見つめる|hence=それゆえに|inherit=相続する|lawn=芝生|mature=成熟した|neat=きちんとした|pardon=許す|positive=肯定的な|pursue=追求する|rescue=救助する|score=得点|sincere=誠実な|statue=像|sweep=掃く|trace=跡|vary=変わる|worship=崇拝する|ditch=溝|alike=似ている",
  "awful=ひどい|brilliant=輝かしい|communicate=意思を伝える|crew=乗組員|destroy=破壊する|ecology=生態学|excellent=優れた|female=女性の|gather=集める|hell=地獄|inhabit=住む|latter=後者の|master=習得する|navy=海軍|parallel=平行の|portrait=肖像画|pure=純粋な|republic=共和国|scope=範囲|silly=ばかな",
  "state=状態・述べる|sweat=汗|toxic=有毒な|various=さまざまな|wonder=不思議に思う|dip=浸す|alarm=警報|aware=気づいて|bow=おじぎする|commerce=商業|creature=生き物|destiny=運命|earthquake=地震|examine=調べる|fellow=仲間|gap=隔たり|height=高さ|inferior=劣った|landscape=風景|mass=大量",
  "native=出身の|panic=恐慌|portion=部分|pupil=生徒|represent=代表する|scold=叱る|silent=静かな|starve=飢える|swear=誓う|tough=困難な・丈夫な|variety=多様性|witness=目撃者|dew=露|aim=目標・狙う|awake=目が覚めて|boundary=境界|command=命令する|crash=衝突する|despite=〜にもかかわらず|dye=染める",
  "exaggerate=誇張する|feed=食べ物を与える|gain=得る|heaven=天国|infect=感染させる|lack=不足|marry=結婚する|narrow=狭い|pale=青白い|politics=政治|punish=罰する|repeat=繰り返す|scholar=学者|signal=合図|stare=じっと見る|swallow=飲み込む|tongue=舌|vanish=消える|wisdom=知恵|dense=密集した",
  "aid=援助|avoid=避ける|bother=悩ます|comfort=快適さ|cover=覆う|desperate=必死の|dust=ほこり|exact=正確な|favorite=お気に入りの|furthermore=さらに|heal=治す|infant=幼児|laboratory=実験室|mark=印|myth=神話|pace=速度|political=政治の|psychology=心理学|remarkable=注目すべき|scheme=計画",
  "sight=視力・光景|stain=しみ|sustain=維持する|tolerate=我慢する|value=価値|wipe=ふく|decay=腐る|agriculture=農業|average=平均|border=国境|combine=結合させる|court=裁判所|desire=欲望|dull=鈍い・退屈な|evolve=進化する|favor=好意|fur=毛皮|harvest=収穫|individual=個人|labor=労働",
  "manner=方法・作法|mystery=謎|oxygen=酸素|polish=磨く|proverb=ことわざ|remark=発言|scenery=景色|sigh=ため息をつく|stage=段階・舞台|suspect=疑う|tissue=組織|vain=むだな|willing=進んでする|dawn=夜明け|aggressive=攻撃的な|automatic=自動の|bond=きずな|colony=植民地|council=議会|descend=降りる",
  "due=期限の|evil=悪い|fault=欠点|funeral=葬式|harsh=厳しい|indeed=確かに|kneel=ひざまずく|mammal=哺乳類|mutual=相互の|own=自分の・所有する|poison=毒|prove=証明する|remain=残る|scene=場面|shore=岸|spot=場所・見つける|survive=生き残る|tip=先端・助言|vague=あいまいな|wild=野生の",
  "crown=王冠|afford=余裕がある|authority=権威|bomb=爆弾|collapse=崩壊する|cotton=綿|derive=由来する|drug=薬|evident=明白な|fate=運命|fundamental=基本的な|harmony=調和|incident=出来事|knee=ひざ|male=男性の|murder=殺人|owe=借りがある|poet=詩人|protest=抗議する|rely=頼る",
  "scatter=まき散らす|shoot=撃つ|spoil=だめにする|surround=囲む|tiny=とても小さい|vacant=空いている|widespread=広まった|crawl=はう|affair=事柄|author=著者|bold=大胆な|code=暗号・規則|costume=衣装|deprive=奪う|drown=おぼれる|evidence=証拠|fasten=固定する|fuel=燃料|hardly=ほとんど〜ない|impress=感銘を与える",
  "kingdom=王国|majority=大多数|motion=動き|overseas=海外へ|poem=詩|prosper=繁栄する|relieve=和らげる|scare=怖がらせる|shock=衝撃|split=割る|surgery=手術|tight=きつい|usage=使い方|wicked=邪悪な|conquer=征服する|advice=助言|attitude=態度|boast=自慢する|clue=手がかり|correspond=一致する",
  "depress=落ち込ませる|dramatic=劇的な|eventually=結局|fashion=流行|frustrate=失望させる|harbor=港|import=輸入する|keen=熱心な|major=主要な|moreover=その上|overcome=克服する|plot=筋・陰謀|prospect=見込み|relevant=関連のある|scale=規模|shine=輝く|spite=悪意|surface=表面|tidy=きちんとした|urgent=緊急の",
  "whereas=一方で|coal=石炭|adventure=冒険|attempt=試みる|blow=吹く|classify=分類する|correct=正しい・訂正する|depend=頼る|drama=劇|ethnic=民族の|fascinate=魅了する|frontier=国境・辺境|habit=習慣|impact=影響|justify=正当化する|maintain=維持する|moral=道徳の|otherwise=さもなければ|plenty=たくさん|propose=提案する",
  "relative=親戚・相対的な|satisfy=満足させる|shift=移す・交替|spirit=精神|suppose=思う|tide=潮|urge=促す|wheat=小麦|cliff=崖|admit=認める|attack=攻撃する|bloom=咲く|classic=古典の|cope=対処する|deny=否定する|drag=引きずる|essential=不可欠の|fancy=空想|frighten=怖がらせる|guilty=有罪の",
  "immigrant=移民|justice=正義|magnificent=壮大な|monument=記念碑|origin=起源|pleasant=楽しい|proper=適切な|relate=関係づける|satellite=衛星|shelter=避難所|sphere=球|superior=優れた|thus=このように|urban=都会の|welfare=福祉|canal=運河|admire=感嘆する|atom=原子|block=ふさぐ|civilization=文明",
  "convey=伝える|democracy=民主主義|dozen=1ダース|essay=随筆|famine=飢饉|fresh=新鮮な|guest=客|immediate=即座の|jury=陪審|magic=魔法|moist=湿った|organ=臓器|plant=植物・植える|proof=証拠|reject=拒絶する|sake=ため|shame=恥|spell=つづる|sum=合計|throughout=〜の至る所に",
  "upset=動揺させる|weigh=重さを量る|cabin=小屋|adapt=適応させる|atmosphere=大気・雰囲気|blind=目の見えない|civil=市民の|contrast=対照|delight=喜び|doubtful=疑わしい|error=誤り|familiar=よく知っている|frequent=頻繁な|guard=守る|imitate=まねる|judge=判断する|luxury=ぜいたく|modest=控えめな|ordinary=普通の|plain=明白な・平原",
  "pronounce=発音する|regular=規則的な|sail=航海する|shallow=浅い|specific=特定の|suit=適する|throat=のど|unless=〜でない限り|weed=雑草|bullet=弾丸|acknowledge=認める|athlete=運動選手|bless=祝福する|childhood=子ども時代|continent=大陸|delicate=繊細な|dominate=支配する|era=時代|fame=名声|freeze=凍る",
  "grief=深い悲しみ|image=像・印象|journey=旅|lung=肺|modern=現代の|optimistic=楽観的な|pity=哀れみ|prohibit=禁止する|regret=後悔する|sacrifice=犠牲|shadow=影|species=種|suffer=苦しむ|thrill=わくわくさせる|universe=宇宙|weave=織る|bride=花嫁|acid=酸|astonish=驚かせる|blank=空白の",
  "chief=主要な|context=文脈|degree=程度・学位|divide=分ける|equip=備え付ける|faith=信頼|frank=率直な|greed=貪欲|illustrate=説明する|jealous=嫉妬深い|loyal=忠実な|mobile=移動できる|opposite=反対の|pioneer=先駆者|progress=進歩|regard=みなす|sacred=神聖な|severe=厳しい|spare=余分の|sudden=突然の",
  "threaten=脅す|unite=団結する|weapon=武器|breeze=そよ風|accuse=非難する|aspect=側面|blame=責める|chemistry=化学|contest=競技会|definite=明確な|disturb=邪魔する|equal=等しい|fair=公平な|frame=枠|gravity=重力|illegal=違法の|jail=刑務所|lord=領主|mix=混ぜる|oppose=反対する",
  "pile=積み重ね|professor=教授|refugee=難民|rush=急ぐ|settle=定住する・解決する|span=期間|succeed=成功する|threat=脅威|unique=独特の|wealth=富|breed=繁殖させる|accompany=同行する|ashamed=恥じて|bitter=苦い|chemical=化学の|content=中身・満足して|define=定義する|distinct=はっきりした|envy=うらやむ|faint=かすかな",
  "found=設立する|grave=墓|ignore=無視する|isolate=孤立させる|loose=ゆるい|mission=使命|opponent=相手|physics=物理学|prize=賞|refresh=元気づける|rural=田舎の|servant=召使い|source=源|subtle=微妙な|thought=考え|ultimate=究極の|warn=警告する|betray=裏切る|accident=事故|artificial=人工の",
  "bite=かむ|cheat=だます|contemporary=現代の|defend=守る|distant=遠い|entire=全体の|fade=薄れる|fossil=化石|grateful=感謝している|ignorant=無知の|involve=巻き込む|logic=論理|miserable=みじめな|offend=怒らせる|physical=身体の・物理の|privilege=特権|reform=改革する|ruin=破滅させる|series=連続・シリーズ|sound=音・健全な",
  "substance=物質|thirsty=のどが渇いた|typical=典型的な|wage=賃金|beast=獣|academic=学問の|arrest=逮捕する|birth=誕生|chase=追いかける|consume=消費する|defeat=打ち負かす|distance=距離|enthusiasm=熱意|factor=要因|fortune=運・財産|grasp=つかむ・理解する|identity=身元・独自性|invent=発明する|literature=文学|miracle=奇跡",
  "odd=奇妙な|philosophy=哲学|prison=刑務所|reflect=反射する|rub=こする|sequence=連続|soul=魂|stupid=ばかな|thief=泥棒|trouble=困難|vote=投票する|bark=ほえる|abuse=乱用する|army=軍隊|biology=生物学|charm=魅力|constant=絶え間ない|decorate=飾る|dispute=論争|entertain=楽しませる",
  "extreme=極端な|former=以前の|grand=壮大な|ideal=理想的な|invade=侵略する|liquid=液体|minor=小さい方の|occur=起こる|phenomenon=現象|principle=原則|refer=言及する|royal=王室の|separate=分ける|sort=種類|stuff=もの|thin=薄い|tropical=熱帯の|volunteer=志願者|awe=畏敬|abstract=抽象的な",
  "arise=生じる|bind=縛る|charity=慈善|consist=成り立つ|declare=宣言する|dismiss=解雇する・退ける|enormous=巨大な|extraordinary=並外れた|forgive=許す|grain=穀物|hypothesis=仮説|interpret=解釈する|link=つながり|minister=大臣|obvious=明らかな|phase=段階|principal=主要な・校長|recognize=認識する|rough=粗い|sensitive=敏感な",
  "sorrow=悲しみ|struggle=奮闘する|thick=厚い|triumph=勝利|volume=量・音量|ash=灰|absorb=吸収する|argue=議論する|beyond=〜を越えて|challenge=挑戦|consider=よく考える|deceive=だます|dislike=嫌う|engage=従事する|extra=余分の|foreign=外国の|gradually=徐々に|hurt=傷つける|internal=内部の|limit=制限",
  "minimum=最小の|obstacle=障害|persuade=説得する|primitive=原始的な|recall=思い出す|root=根|sensible=分別のある|somewhat=いくぶん|structure=構造|theme=主題|trick=策略|vocabulary=語彙|arrow=矢|absolute=絶対的な|architecture=建築|beneath=〜の下に|cell=細胞|conservative=保守的な|decade=10年間|disgust=嫌悪",
  "enemy=敵|extinct=絶滅した|force=力・強制する|grab=つかむ|hunt=狩る|interfere=干渉する|likely=ありそうな|military=軍の|object=物体・反対する|perspective=視点|priest=聖職者|rear=後部・育てる|roar=ほえる|sense=感覚・意味|somehow=どういうわけか|strip=はぎ取る|text=本文|tribe=部族|vivid=鮮やかな|arctic=北極の",
].map((pairs, i) => levelDeck("high", "hs", "高校英単語", i + 1, pairs));

const TOEIC600_DECKS = [
  "employee=従業員|equipment=設備・機器|balance=残高・つり合い|speaker=講演者|loan=ローン|promote=昇進させる・促進する|local=地元の|material=材料・資料|meal=食事|weekday=平日|hallway=廊下|survey=調査|reception=受付・歓迎会|marketing=マーケティング|sign=署名する・標識|recent=最近の|shortly=まもなく|commuter=通勤者|organization=組織|headquarters=本社",
  "attendance=出席|arrival=到着|license=免許|install=設置する|obtain=手に入れる|regularly=定期的に|neighborhood=近所|title=肩書き・題名|client=顧客・依頼人|manual=説明書|coupon=クーポン|security=警備|replace=取り替える|publish=出版する|successful=成功した|access=利用・接続|occupation=職業|receptionist=受付係|memo=メモ|stock=在庫・株",
  "renovation=改装|attend=出席する|expand=拡大する|effective=効果的な|record=記録・記録する|award=賞|employment=雇用|printer=プリンター|charge=料金・請求する|organizer=主催者|negotiation=交渉|resign=辞任する|private=個人の・民間の|description=説明|recipe=レシピ|bonus=ボーナス|storage=保管|suggestion=提案|workshop=研修会|competition=競争",
  "copy=写し・コピーする|upcoming=今度の|sales=販売・売上|transportation=交通機関|agency=代理店|division=部・課|permission=許可|baggage=手荷物|identification=身分証明|notify=知らせる|handle=扱う|carefully=注意深く|apartment=アパート|member=会員・一員|supplier=供給業者|signature=署名|subscription=定期購読|policy=方針|update=更新する|display=展示する",
  "spacious=広々とした|area=地域・区域|task=作業|consultant=コンサルタント|handout=配布資料|merchandise=商品|maintenance=保守|assist=手伝う|extend=延長する|flexible=融通のきく|chart=図表|exhibit=展示品・展示する|supervisor=監督者|laptop=ノートパソコン|bill=請求書|invitation=招待|finance=財務|qualify=資格を得る|formal=正式の|direction=道順・指示",
  "server=給仕係|anniversary=記念日|entrance=入口|purchase=購入・購入する|exhibition=展示会|income=収入|unload=荷を降ろす|permanent=常設の|choice=選択|destination=目的地|corporation=企業|cafeteria=社員食堂|inquiry=問い合わせ|terminal=ターミナル|commercial=商業の・CM|respond=返答する|serve=給仕する・勤める|nearly=ほぼ|visitor=訪問者|board=役員会・板",
  "founder=創設者|announcement=発表|admission=入場・入学|requirement=要件|approve=承認する|guarantee=保証する|recently=最近|district=地区|responsibility=責任|assistant=助手|flyer=チラシ|replacement=交換・後任|installation=設置|recommend=推薦する|upgrade=改良する|affordable=手ごろな価格の|figure=数字・人物|audience=聴衆|executive=重役|drawer=引き出し",
  "shipping=配送|extension=延長・内線|annual=年1回の|invest=投資する|experienced=経験豊富な|article=記事|event=行事|checkout=精算・チェックアウト|location=場所|deposit=預金・手付金|session=会合・集まり|investment=投資|transfer=転勤させる・移す|international=国際的な|model=型・模型|absence=欠席・不在|trade=貿易・取引|elevator=エレベーター|feedback=意見・感想|rental=賃貸・レンタル",
  "promotion=昇進・販売促進|revise=修正する|current=現在の|easily=簡単に|traveler=旅行者|association=協会|branch=支店|arrangement=手配|departure=出発|certificate=証明書|operate=操作する・営業する|conduct=実施する|frequently=頻繁に|suburb=郊外|position=職・位置|candidate=候補者|newsletter=会報|aisle=通路|safety=安全|remind=思い出させる",
  "release=発表する・発売する|profitable=もうかる|account=口座・アカウント|profession=職業|representative=代表者・担当者|stationery=文房具|inventory=在庫|opening=開店・空き|weekly=毎週の|calculate=計算する|efficient=効率的な|rating=評価|ceremony=式典|employer=雇用主|copier=コピー機|fee=料金|participant=参加者|agreement=合意・契約|retire=退職する|public=公共の",
  "sample=見本|dish=料理・皿|overtime=残業|warehouse=倉庫|complaint=苦情|seminar=セミナー|competitor=競合他社|print=印刷する|previous=以前の|service=サービス・勤務|vehicle=乗り物|institute=研究所・機関|department=部門|approval=承認|boarding=搭乗|permit=許可証・許可する|inspect=検査する|supply=供給する|directly=直接|property=不動産・財産",
  "group=集団|consumer=消費者|form=用紙・形|membership=会員資格|regulation=規制|submit=提出する|distribute=配布する|crowded=混雑した|address=住所・演説|duty=職務・義務|accountant=会計士|bulletin=掲示・公報|retail=小売り|construction=建設|announce=発表する|reduce=減らす|reliable=信頼できる|list=一覧|entertainment=娯楽|coworker=同僚",
  "projector=プロジェクター|rate=料金・割合|sponsor=後援者|accounting=会計|recruit=採用する|official=公式の|instruction=指示・説明書|ingredient=材料|paycheck=給料|garage=車庫|proposal=提案書|conference=会議|revenue=収益|load=積む・荷物|temporary=一時的な|option=選択肢|route=経路|firm=会社・堅い|workplace=職場|request=依頼・依頼する",
  "customs=税関|advertisement=広告|inform=知らせる|deal=取引・扱う|approximately=おおよそ|resident=住民|committee=委員会|owner=所有者|label=ラベル|registration=登録|procedure=手順|advertise=広告する|demonstrate=実演する|currently=現在|region=地域|assignment=割り当てられた仕事|technician=技術者|brochure=パンフレット|warranty=保証|inspection=検査",
  "contact=連絡する|renew=更新する|reasonable=手ごろな・妥当な|graph=グラフ|gallery=画廊|director=取締役・部長|cabinet=戸棚|shipment=発送・積み荷|reminder=通知・催促|financial=財務の|earn=稼ぐ|casual=普段着の・何気ない|poster=ポスター|party=一行・パーティー|booking=予約|facility=施設|payment=支払い|booth=ブース|expense=費用|locate=見つける・置く",
  "domestic=国内の|feature=特徴・特集|vacation=休暇|business=事業・商売|lobby=ロビー|response=返答|shuttle=シャトル便|campaign=キャンペーン|review=見直す・批評|additional=追加の|completely=完全に|tourist=観光客|union=組合|professional=専門家・プロの|application=申し込み・応募|timetable=時刻表|standard=基準|postpone=延期する|participate=参加する|immediately=すぐに",
  "downtown=中心街|role=役割|applicant=応募者|catalog=カタログ|cashier=レジ係|performance=業績・公演|register=登録する|launch=発売する・開始する|valuable=貴重な|attachment=添付ファイル|row=列|chairman=議長・会長|folder=フォルダー|cargo=貨物|confirmation=確認|monthly=毎月の|estimate=見積もる・見積もり|qualified=資格のある|comment=コメント|celebration=祝賀会",
].map((pairs, i) => levelDeck("toeic600", "toeic600", "TOEIC 600点レベル", i + 1, pairs));

const TOEIC730_DECKS = [
  "accommodate=収容する・対応する|beverage=飲み物|convention=大会|eager=熱心な|fulfill=果たす|manufacture=製造する|patent=特許|questionnaire=アンケート|spokesperson=広報担当者|via=経由で|attract=引きつける|consequently=その結果|distinguish=区別する|fluctuate=変動する|legal=法律の|outstanding=優れた・未払いの|proportion=割合|shareholder=株主|unveil=発表する|assemble=組み立てる・集まる",
  "comply=従う|devise=考案する|expire=期限が切れる|interact=交流する|operational=稼働中の|productivity=生産性|revision=修正|transaction=取引|analyze=分析する|commitment=約束・献身|delegate=委任する・代表|evaluate=評価する|initiative=新構想・主導権|objective=目的|prescription=処方せん|reschedule=予定を変更する|surplus=余剰|adopt=採用する|certify=証明する|cuisine=料理",
  "enhance=高める|implement=実行する|monitor=監視する|portfolio=作品集・資産構成|reimburse=払い戻す|subsidiary=子会社|accomplish=達成する|billing=請求|convince=納得させる|eligible=資格のある|fund=資金|margin=利ざや・余白|pedestrian=歩行者|rebate=払い戻し|statement=明細書・声明|wholesale=卸売り|audit=監査|considerable=かなりの|donate=寄付する|forward=転送する・前へ",
  "limited=限られた|overdue=期限を過ぎた|prosperity=繁栄|significant=重要な・かなりの|utilize=利用する|assess=評価する|comprehensive=包括的な|diminish=減少する|fabric=布地|investigate=調査する|optimal=最適な|projection=予測|routine=日課・定例の|transition=移行|apparel=衣料品|compensate=補償する|demonstration=実演|exceed=超える|inquire=問い合わせる|observe=観察する・順守する",
  "prestigious=名声のある|restore=修復する|tenant=賃借人|affect=影響する|circumstance=状況|customize=特注する|ensure=確実にする|impose=課す|motivate=意欲を起こさせる|precaution=予防措置|relocate=移転する|substitute=代わり・代用する|acquire=取得する|brief=手短な|coordinate=調整する|emphasize=強調する|generate=生み出す|merger=合併|pension=年金|recipient=受取人",
  "strategic=戦略的な|workforce=労働力|automate=自動化する|construct=建設する|draft=草案|fragile=壊れやすい|luncheon=昼食会|oversee=監督する|publicity=宣伝|sophisticated=洗練された|valid=有効な|associate=同僚・関連づける|conflict=対立・予定の重なり|dispatch=発送する|faculty=教員・能力|itinerary=旅程|outlet=直販店・コンセント|prompt=迅速な|scenic=景色のよい|turnover=離職率・売上高",
  "appoint=任命する|competent=有能な|designate=指定する|exclude=除外する|inspector=検査官|occupy=占める|priority=優先事項|retain=保持する|terminate=終了させる|allocate=割り当てる|clarify=明確にする|dedicate=ささげる|entitle=権利を与える|indicate=示す|nominate=指名する|preliminary=予備の|remote=遠隔の|summarize=要約する|adequate=十分な|capacity=収容能力",
  "courier=宅配業者|encourage=奨励する|hazard=危険|maximize=最大化する|personnel=人事・職員|reference=推薦状・参照|submission=提出|yield=収益・産出する|benefit=手当・利益|contribute=貢献する|duration=期間|freight=貨物輸送|mandatory=義務的な|partial=部分的な|quarterly=四半期ごとの|specification=仕様書|versatile=多用途の|assure=保証する|consent=同意|disrupt=混乱させる",
  "flaw=欠陥|lease=賃貸借契約|output=生産高|proofread=校正する|secure=確保する・安全な|undertake=引き受ける|appropriate=適切な|complimentary=無料の|determine=決定する|expertise=専門知識|insurance=保険|ongoing=進行中の|proceeds=収益|retrieve=取り戻す|thorough=徹底的な|analysis=分析|commit=約束する・専念する|defect=欠陥|establish=設立する|initial=最初の",
  "numerous=多数の|premium=保険料・高級な|reputation=評判|supervise=監督する|administration=管理・運営|caution=注意|crucial=極めて重要な|enforce=施行する|identify=特定する|modify=修正する|plumber=配管工|refurbish=改装する|subsequent=その後の|accommodation=宿泊施設|bid=入札|convert=変換する|economical=経済的な|function=機能・式典|manufacturer=製造業者|patron=常連客",
  "quote=見積もり・引用する|stable=安定した|voucher=引換券|auction=競売|conserve=保存する・節約する|diverse=多様な|forecast=予測|liability=法的責任|overall=全体の|prospective=見込みのある|shortage=不足|utility=公共料金・実用性|assembly=組み立て・集会|component=部品|diagnose=診断する|extensive=広範囲の|interrupt=中断する|opportunity=機会|proficiency=熟達|reward=報酬",
  "transit=輸送・通過|anticipate=予想する|commute=通勤する|demand=需要・要求|evaluation=評価|innovative=革新的な|obligation=義務|preserve=保存する|resolve=解決する|suspend=一時停止する|advance=前進・前もっての|circulate=回覧する|currency=通貨|enroll=登録する|imply=ほのめかす|mortgage=住宅ローン|potential=潜在的な|reimbursement=払い戻し|substantial=かなりの|accurate=正確な",
  "boost=押し上げる|cooperate=協力する|eliminate=取り除く|fundraiser=資金集めの催し|merge=合併する|pending=未決定の|recession=不況|statistics=統計|withdraw=引き出す|authorize=許可する|consistent=一貫した|donation=寄付|foster=育成する|logistics=物流|overlook=見落とす|provision=条項・供給|simultaneously=同時に|vacancy=空き|asset=資産|confidential=機密の",
  "disclose=公開する|facilitate=促進する|issue=発行する・問題|outcome=結果|prominent=著名な|satisfaction=満足|tuition=授業料|appliance=電化製品|compensation=補償・報酬|deserve=値する|exceptional=並外れた|insight=洞察|occupancy=占有|primary=主要な|resume=履歴書・再開する|tentative=仮の|agenda=議題|claim=請求・主張する|decline=減少する・断る|enterprise=企業・事業",
  "incentive=報奨金・動機|negotiate=交渉する|predict=予測する|remainder=残り|sufficient=十分な|acquisition=買収・取得|bulk=大量|correspondence=通信文|enclose=同封する|guideline=指針|minimize=最小限にする|periodic=定期的な|recognition=表彰・認識|streamline=合理化する|workload=仕事量|banquet=宴会|consult=相談する|durable=耐久性のある|franchise=フランチャイズ|machinery=機械類",
  "overview=概観|qualification=資格|specialize=専門とする|venue=会場|assume=引き受ける・仮定する|consecutive=連続した|dispose=処分する|feasible=実現可能な|landlord=家主|outline=概要|promptly=迅速に|sector=部門・分野|undergo=経験する・受ける|appreciate=感謝する|compile=まとめる|detect=検出する|exclusive=独占的な|instructor=講師|offset=相殺する|proceed=進む",
  "retailer=小売業者|testimonial=推薦文|alternative=代わりの|collaborate=協力する|deduct=差し引く|entrepreneur=起業家|inevitable=避けられない|notable=注目すべき|premises=敷地|renowned=有名な|summary=要約|adjust=調整する|carrier=運送業者|criteria=基準|endorse=支持する・裏書きする|hesitate=ためらう|moderate=適度な|pharmacy=薬局|refreshment=軽食|subordinate=部下",
].map((pairs, i) => levelDeck("toeic730", "toeic730", "TOEIC 730点レベル", i + 1, pairs));

const TOEIC860_DECKS = [
  "abide=従う|autonomy=自主性|conspicuous=目立つ|distinctive=独特の|fraud=詐欺|judicious=賢明な|pertinent=関連のある|replenish=補充する|tariff=関税|adverse=不利な|cease=やめる|curtail=削減する|encompass=含む|impede=妨げる|mentor=指導者|prevail=普及する・勝つ|shortfall=不足額|viable=実行可能な|appraisal=評価・査定|compulsory=義務的な",
  "deregulate=規制緩和する|exemplary=模範的な|inherent=本来備わっている|onset=始まり|rectify=是正する|subsidy=補助金|abridge=要約する|backlog=未処理の仕事|contaminate=汚染する|dividend=配当|garment=衣服|lavish=豪華な|pivotal=極めて重要な|respective=それぞれの|testify=証言する|affiliate=関連会社・提携する|coherent=首尾一貫した|debit=引き落とし|endow=寄付する・授ける|implication=影響・含意",
  "milestone=節目|proficient=熟達した|skeptical=懐疑的な|void=無効の|archive=保管文書|concise=簡潔な|deter=思いとどまらせる|expenditure=支出|integral=不可欠の|outsource=外部委託する|redundant=余分な|successor=後任者|accelerate=加速する|benchmark=基準|contingency=不測の事態|downturn=景気後退|generic=一般的な|leverage=活用する・影響力|ponder=熟考する|retention=保持・定着",
  "transparent=透明な|alleviate=軽減する|collateral=担保|default=債務不履行・初期設定|envision=思い描く|incidental=付随的な|momentum=勢い|prolong=延長する|solvent=支払い能力のある|vulnerable=脆弱な|articulate=明確に述べる|condense=凝縮する|diligent=勤勉な|exquisite=極めて美しい|intermittent=断続的な|overhead=間接費|reiterate=繰り返し言う|surcharge=追加料金|accountable=責任がある|bilateral=二者間の",
  "cordial=心からの|drawback=欠点|groundbreaking=画期的な|liaison=連絡係|pragmatic=実用的な|revamp=刷新する|unanimous=満場一致の|allowance=手当・許容量|commence=開始する|deficit=赤字|eradicate=根絶する|incur=負う・被る|morale=士気|provisional=暫定的な|speculate=推測する・投機する|warrant=正当化する・保証|attain=達成する|conform=従う|discrepancy=食い違い|fiscal=会計の",
  "intricate=複雑な|paramount=最も重要な|remedy=改善策|surpass=上回る|accumulate=蓄積する|breach=違反|courteous=礼儀正しい|elaborate=詳しく述べる・精巧な|hinder=妨げる|litigation=訴訟|precedent=前例|rigorous=厳格な|uphold=支持する|amend=修正する|commodity=商品|demolish=取り壊す|escalate=段階的に拡大する|induce=誘発する|nominal=名目上の|prudent=慎重な",
  "stakeholder=利害関係者|withhold=差し控える|audible=聞き取れる|conglomerate=複合企業|disperse=分散させる|forge=築く・偽造する|invaluable=非常に貴重な|perishable=傷みやすい|remuneration=報酬|synthesize=統合する|adhere=順守する|bureaucracy=官僚制度|culminate=最高潮に達する|embrace=受け入れる|impair=損なう|mandate=命令・権限|predecessor=前任者|scrutinize=綿密に調べる|vendor=販売業者|ample=十分な",
  "compel=強いる|depict=描く|evict=立ち退かせる|influx=流入|obsolete=時代遅れの|rationale=論理的根拠|stringent=厳しい|zeal=熱意|authentic=本物の|consolidate=統合する|disseminate=広める|forthcoming=来たるべき|jeopardize=危険にさらす|persistent=粘り強い|repeal=廃止する|tangible=有形の|adjourn=休会する|candid=率直な|curb=抑制する|empower=権限を与える",
  "impeccable=完ぺきな|mediate=仲裁する|prerequisite=前提条件|seasoned=経験豊富な|verdict=評決|apprentice=見習い|compliance=法令順守|depreciation=減価償却|exert=行使する|infringe=侵害する|omit=省く|reconcile=調和させる・照合する|subsidize=補助金を出す|abolish=廃止する|avert=避ける|constraint=制約|diversify=多様化する|frugal=倹約的な|lapse=失効する・過失|petition=嘆願書",
  "resilient=回復力のある|tenure=在職期間|advocate=提唱する|clause=条項|customary=慣例の|endeavor=努力する|imperative=必須の|meticulous=細心の|procure=調達する|simulate=模擬実験する|vigilant=警戒している|arbitrary=恣意的な|concede=認める|deteriorate=悪化する|expedite=迅速に処理する|insolvent=支払い不能の|optimize=最適化する|redeem=引き換える|succession=連続・継承|abundant=豊富な",
  "bankrupt=破産した|contemplate=熟考する|dormant=休止状態の|gauge=測る・基準|legislation=法律|plummet=急落する|restructure=再編する|thrive=繁栄する|aggregate=総計|coincide=同時に起こる|deem=みなす|entail=伴う|inaugurate=就任させる・開始する|mitigate=緩和する|proliferate=急増する|solicit=求める|volatile=不安定な|array=勢ぞろい・配列|concurrent=同時の|deviate=逸脱する",
  "exploit=活用する|integrity=誠実さ|overhaul=全面的に見直す|reinforce=強化する|supersede=取って代わる|acclaim=称賛|beneficiary=受益者|contractor=請負業者|drastic=思い切った|grievance=苦情|liable=責任がある|postage=郵便料金|retrospect=回顧|trivial=ささいな|allot=割り当てる|commemorate=記念する|defer=延期する|equity=株式・公平|incorporate=組み入れる・法人化する|monopoly=独占",
  "proprietor=所有者|sparse=まばらな|waive=放棄する|aspire=熱望する|confiscate=没収する|discard=捨てる|feasibility=実現可能性|intervene=介入する|oversight=監督・見落とし|relinquish=手放す|surge=急増|accrue=生じる・蓄積する|bolster=強化する|counterpart=対応する相手|dwindle=次第に減る|hamper=妨げる|liquidate=清算する|precede=先行する|revoke=取り消す|unprecedented=前例のない",
  "ambiguous=あいまいな|commend=称賛する|delinquent=滞納の|erroneous=誤った|indispensable=不可欠の|negligence=過失|proximity=近いこと|stagnant=停滞した|wary=用心深い|attribute=特性・〜のせいにする|congestion=混雑|discretion=裁量|forfeit=没収される|intuitive=直感的な|penetrate=浸透する|remit=送金する|susceptible=影響を受けやすい|accustomed=慣れた|brisk=活発な|credential=資格・証明書",
  "embark=乗り出す|imminent=差し迫った|lucrative=もうかる|preclude=妨げる|robust=強固な|validate=検証する|amenity=設備・快適さ|compatible=互換性のある|denote=示す|evacuate=避難する|inflation=インフレ|novice=初心者|ratify=批准する|stipulate=規定する|withstand=耐える|augment=増やす|consensus=合意|disregard=無視する|formidable=手ごわい|irrelevant=無関係の",
  "perk=特典|render=与える・〜にする|tactic=戦術|adjacent=隣接した|bypass=迂回する|cumulative=累積の|eminent=著名な|impartial=公平な|markedly=著しく|premise=前提|scrutiny=精査|venture=ベンチャー事業|anonymous=匿名の|complement=補完する|deplete=使い果たす|exempt=免除された|infrastructure=社会基盤|obstruct=妨害する|rebound=回復する|subcontract=下請けに出す",
].map((pairs, i) => levelDeck("toeic860", "toeic860", "TOEIC 860点レベル", i + 1, pairs));

export const levelWordDecks: EnglishDeck[] = [
  ...HS_DECKS,
  ...TOEIC600_DECKS,
  ...TOEIC730_DECKS,
  ...TOEIC860_DECKS,
];
