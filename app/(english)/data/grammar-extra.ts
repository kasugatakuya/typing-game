import type { EnglishDeck, GrammarGenre } from "./types";

/** "English=日本語=ポイント|..." 形式の文字列から文法デッキを作る（1デッキ8文） */
const deck = (
  genre: GrammarGenre,
  id: string,
  title: string,
  description: string,
  points: string[],
  rows: string,
): EnglishDeck => ({
  id,
  section: "grammar",
  genre,
  title,
  description,
  points,
  items: rows.split("|").map((row) => {
    const [en, ja, note] = row.split("=");
    return { en, ja, note };
  }),
});

export const extraGrammarDecks: EnglishDeck[] = [
  // TOEIC Part 5・6 で問われやすい文法ポイント
  deck("toeic", "toeic-pos", "品詞の選び方", "名詞・形容詞・副詞を位置で見分ける",
    ["冠詞や形容詞の後ろは名詞、名詞の前は形容詞、動詞や形容詞を修飾するのは副詞。", "TOEIC の文法問題では、空所の前後を見て品詞を決めるのが基本。"],
    "The manager made a quick decision.=部長はすばやい決定を下した。=a + 形容詞 + 名詞|Sales increased significantly last year.=昨年、売上は大幅に伸びた。=動詞を修飾 → 副詞|We received a detailed explanation.=私たちは詳しい説明を受けた。=形容詞 + 名詞|The new system works efficiently.=新しいシステムは効率的に動く。=動詞の後ろ → 副詞|Her presentation was very impressive.=彼女の発表はとても印象的だった。=be動詞の後ろ → 形容詞|We appreciate your cooperation.=ご協力に感謝します。=所有格 + 名詞|The price is highly competitive.=その価格は非常に競争力がある。=副詞 + 形容詞|Please read the instructions carefully.=説明書を注意して読んでください。=文末で動詞を修飾 → 副詞"),
  deck("toeic", "toeic-tense", "時制の見分け方", "時を表す語句から時制を決める",
    ["yesterday / last は過去形、since / for は現在完了、next / tomorrow は未来。時を表す語句が手がかり。", "by + 未来の時点は未来完了（will have + 過去分詞）、過去のある時点より前のことは過去完了。"],
    "The shipment arrived yesterday.=荷物は昨日届いた。=yesterday → 過去形|He has worked here since 2015.=彼は2015年からここで働いている。=since → 現在完了|The store will open next month.=その店は来月開店する。=next month → 未来|We are currently hiring new staff.=現在、新しいスタッフを募集中です。=currently → 現在進行形|She has already sent the invoice.=彼女はすでに請求書を送った。=already → 現在完了|The meeting had started when I arrived.=私が着いたとき、会議は始まっていた。=過去の時点より前 → 過去完了|We will have finished by Friday.=金曜日までには終えているだろう。=by + 未来 → 未来完了|Prices have risen over the past year.=この1年で価格が上がった。=over the past → 現在完了"),
  deck("toeic", "toeic-voice", "能動態と受動態", "主語が「する側」か「される側」か",
    ["主語が「する側」なら能動態、「される側」なら受動態（be + 過去分詞）。", "空所の後ろに目的語がなければ受動態を疑う。"],
    "The report was submitted on time.=報告書は期限内に提出された。=報告書は提出される側|The company hired ten engineers.=その会社は技術者を10人雇った。=目的語あり → 能動態|All employees are required to attend.=全従業員の出席が求められている。=be required to|The package will be delivered tomorrow.=荷物は明日配達される。=will be + 過去分詞|The event has been canceled.=そのイベントは中止された。=have been + 過去分詞|The building is being renovated.=その建物は改装中だ。=be being + 過去分詞|Orders must be placed by noon.=注文は正午までにしなければならない。=助動詞 + be + 過去分詞|The manager approved the budget.=部長は予算を承認した。=目的語あり → 能動態"),
  deck("toeic", "toeic-prep-conj", "前置詞と接続詞", "despite と although、during と while の区別",
    ["後ろが名詞（句）なら前置詞、主語 + 動詞なら接続詞。", "despite / during / because of は前置詞、although / while / because は接続詞。"],
    "Despite the rain, the event was held.=雨にもかかわらず、イベントは開催された。=despite + 名詞|Although it rained, the event was held.=雨が降ったが、イベントは開催された。=although + 主語 + 動詞|Please be quiet during the meeting.=会議中は静かにしてください。=during + 名詞|She took notes while he was speaking.=彼が話している間、彼女はメモを取った。=while + 主語 + 動詞|The flight was late because of the storm.=嵐のせいで便が遅れた。=because of + 名詞|We stayed home because it was snowing.=雪が降っていたので家にいた。=because + 主語 + 動詞|Call me as soon as you arrive.=着いたらすぐ電話してください。=as soon as + 主語 + 動詞|Please reply by the end of the week.=今週末までに返信してください。=by + 期限"),
  deck("toeic", "toeic-participle", "分詞の使い分け", "ing と ed のどちらを使うか",
    ["名詞が「する側」なら現在分詞（ing）、「される側」なら過去分詞（ed）。", "感情を表す語は、人が感じるなら ed、物事が感じさせるなら ing。"],
    "Please see the attached file.=添付のファイルをご覧ください。=ファイルは添付される → ed|The man standing there is my boss.=そこに立っている男性は私の上司です。=男性が立っている → ing|I was surprised at the news.=その知らせに驚いた。=人が感じる → ed|The news was surprising.=その知らせは驚くべきものだった。=物事が感じさせる → ing|We need an experienced manager.=経験豊富な管理者が必要だ。=経験を積んだ → ed|The remaining items are on sale.=残りの商品はセール中です。=残っている → ing|All the tickets sold online are valid.=オンラインで販売されたチケットはすべて有効です。=販売される → ed|It was an exciting game.=わくわくする試合だった。=物事が感じさせる → ing"),
  deck("toeic", "toeic-pronoun", "代名詞と関係詞", "格の選択と who / which / whose / where",
    ["名詞の前は所有格（their）、動詞や前置詞の後ろは目的格（them）、「自分で」は再帰代名詞（themselves）。", "関係詞は、人なら who、物なら which / that、所有は whose、場所は where。"],
    "Please submit your report by Friday.=金曜日までに報告書を提出してください。=名詞の前 → 所有格|She finished the project by herself.=彼女は自分ひとりでその企画を終えた。=by oneself|The manager asked them to wait.=部長は彼らに待つよう頼んだ。=動詞の後ろ → 目的格|This desk is mine.=この机は私のものです。=所有代名詞|Staff who work late can take a taxi.=遅くまで働く職員はタクシーを使える。=人 + who|This is the product which sells best.=これが最もよく売れる製品です。=物 + which|She is the designer whose work won.=彼女は作品が受賞したデザイナーです。=所有 → whose|This is the hotel where we stayed.=ここが私たちが泊まったホテルです。=場所 → where"),
  deck("toeic", "toeic-verb-forms", "動詞の後ろの形", "to 不定詞をとる動詞と動名詞をとる動詞",
    ["plan / decide / agree の後ろは to 不定詞、consider / avoid / suggest の後ろは動名詞。", "look forward to や be used to の to は前置詞なので、後ろは動名詞。"],
    "We plan to open a new branch.=新しい支店を開く予定です。=plan to + 原形|Please consider joining our team.=私たちのチームへの参加をご検討ください。=consider + ing|He agreed to sign the contract.=彼は契約書に署名することに同意した。=agree to + 原形|She suggested changing the date.=彼女は日程の変更を提案した。=suggest + ing|I look forward to meeting you.=お会いできるのを楽しみにしています。=look forward to + ing|You should avoid making the same mistake.=同じ間違いは避けるべきです。=avoid + ing|They decided to postpone the launch.=彼らは発売の延期を決めた。=decide to + 原形|I am used to working at night.=夜に働くことには慣れています。=be used to + ing"),
  deck("toeic", "toeic-quantity", "数量と比較", "each / all / much の使い分けと比較の形",
    ["each / every の後ろは単数名詞、all / most / several の後ろは複数名詞、much / little は数えられない名詞。", "than があれば比較級、the と範囲（in / of）があれば最上級。"],
    "Each employee has an ID card.=各従業員はIDカードを持っている。=each + 単数名詞|All employees have ID cards.=全従業員がIDカードを持っている。=all + 複数名詞|Several customers complained.=数人の顧客が苦情を言った。=several + 複数名詞|We do not have much time.=あまり時間がありません。=much + 数えられない名詞|Most of the seats are taken.=ほとんどの席が埋まっている。=most of the + 名詞|This model is cheaper than that one.=この型はあの型より安い。=than → 比較級|It is the largest hotel in the city.=それは市内で最大のホテルだ。=the + 最上級 + in|Sales were twice as high as last year.=売上は昨年の2倍だった。=twice as 〜 as"),

  // 実際の会話で使えると表現の幅が広がる文法
  deck("conversation", "conv-polite", "ていねいに頼む・尋ねる", "Could you / Would you mind と間接疑問文",
    ["Can you より Could you、さらに Would you mind + ing のほうがていねい。", "疑問文を文の中に入れる間接疑問文は、主語 + 動詞の語順になる。"],
    "Could you tell me where the station is?=駅がどこか教えていただけますか？=間接疑問文は 主語 + 動詞|Would you mind waiting a moment?=少しお待ちいただけますか？=Would you mind + ing|Do you know what time it opens?=何時に開くかご存じですか？=間接疑問文|I was wondering if you could help me.=手伝っていただけないかと思いまして。=I was wondering if|Would it be possible to change my seat?=席を変えていただくことはできますか？=Would it be possible to|May I have your name, please?=お名前を伺ってもよろしいですか？=May I 〜?|I'd like to ask you something.=お聞きしたいことがあります。=I'd like to + 原形|Would you like something to drink?=何か飲み物はいかがですか？=Would you like 〜?"),
  deck("conversation", "conv-suggest", "提案する・助言する", "Why don't we / How about / should",
    ["Why don't we 〜? / How about 〜ing? / Let's 〜 / Shall we 〜? はどれも提案の表現。", "How about と What about の後ろは名詞か動名詞。had better は should より強い助言。"],
    "Why don't we take a break?=休憩しませんか？=Why don't we + 原形|How about going out for dinner?=夕食を食べに行くのはどう？=How about + ing|Let's not talk about it now.=今はその話はやめよう。=Let's not + 原形|Shall we begin?=始めましょうか。=Shall we + 原形|Why don't you ask your boss?=上司に聞いてみたら？=Why don't you + 原形|You should try this restaurant.=このレストランを試してみるといいよ。=should + 原形|You had better leave now.=もう出たほうがいいよ。=had better + 原形|What about meeting on Monday?=月曜日に会うのはどう？=What about + ing"),
  deck("conversation", "conv-perfect", "現在完了と過去形の使い分け", "今につながる話か、過去の一時点の話か",
    ["過去の一時点（yesterday / last week）を言うなら過去形、今につながる経験・継続・完了なら現在完了。", "今も続いている動作は現在完了進行形（have been + ing）。"],
    "I have lived here for five years.=ここに5年住んでいます。=今も住んでいる → 現在完了|I lived in Osaka when I was a child.=子どものころ大阪に住んでいた。=過去の時期 → 過去形|Have you ever been to Canada?=カナダに行ったことはありますか？=経験 → 現在完了|I went to Canada last summer.=昨年の夏カナダに行った。=last summer → 過去形|I have been waiting for an hour.=1時間ずっと待っています。=have been + ing|I have just finished lunch.=ちょうど昼食を終えたところです。=just → 現在完了|How long have you known her?=彼女と知り合ってどのくらいですか？=How long + 現在完了|I have not seen him lately.=最近彼に会っていません。=lately → 現在完了"),
  deck("conversation", "conv-used-to", "習慣と変化の表現", "used to / be used to / be about to",
    ["used to + 原形は「以前は〜していた」、be used to + ing は「〜に慣れている」、get used to は「〜に慣れる」。", "be about to + 原形は「今まさに〜するところ」。"],
    "I used to play the piano.=以前はピアノを弾いていました。=used to + 原形|I am used to getting up early.=早起きには慣れています。=be used to + ing|You will get used to it soon.=すぐに慣れますよ。=get used to|There used to be a park here.=以前ここに公園がありました。=There used to be|I am about to leave.=ちょうど出かけるところです。=be about to + 原形|I was going to call you.=電話しようと思っていたんだ。=was going to + 原形|I no longer work there.=もうそこでは働いていません。=no longer|I am getting better at cooking.=料理が上達してきています。=be getting + 比較級"),
  deck("conversation", "conv-causative", "させる・してもらう", "make / let / have / get の使い分け",
    ["make は「（強制的に）させる」、let は「（許可して）させる」、have は「（頼んで）してもらう」で、後ろは原形。", "get は get + 人 + to 原形。物を目的語にするときは have / get + 物 + 過去分詞。"],
    "Let me think about it.=少し考えさせてください。=let + 人 + 原形|My boss made me work late.=上司に遅くまで働かされた。=make + 人 + 原形|I had my hair cut yesterday.=昨日、髪を切ってもらった。=have + 物 + 過去分詞|I will have him call you back.=彼に折り返し電話させます。=have + 人 + 原形|I got my friend to help me.=友達に手伝ってもらった。=get + 人 + to 原形|I need to get my car repaired.=車を修理してもらう必要がある。=get + 物 + 過去分詞|This song makes me happy.=この曲を聞くと幸せな気分になる。=make + 人 + 形容詞|Let me know when you arrive.=着いたら知らせてください。=let + 人 + 原形"),
  deck("conversation", "conv-regret", "後悔・推量・付加疑問", "should have / must have と isn't it?",
    ["should have + 過去分詞は「〜すべきだった」、must have + 過去分詞は「〜したに違いない」、might have + 過去分詞は「〜したかもしれない」。", "付加疑問は、肯定文なら否定形、否定文なら肯定形を文末につける。"],
    "I should have left earlier.=もっと早く出るべきだった。=should have + 過去分詞|You must have been tired.=きっと疲れていたんでしょう。=must have + 過去分詞|I might have left it at home.=家に置いてきたかもしれない。=might have + 過去分詞|I could have helped you.=手伝えたのに。=could have + 過去分詞|It is a nice day, isn't it?=いい天気ですね。=肯定文 + 否定の付加疑問|You do not like coffee, do you?=コーヒーは好きじゃないんですよね？=否定文 + 肯定の付加疑問|I wish I had studied harder.=もっと勉強しておけばよかった。=I wish + 過去完了|You should not have said that.=あんなことを言うべきではなかった。=should not have + 過去分詞"),
];
