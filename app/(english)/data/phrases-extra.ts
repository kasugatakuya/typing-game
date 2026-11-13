import type { EnglishDeck, PhraseGenre } from "./types";

/** "English=日本語|English=日本語|..." 形式の文字列から会話デッキを作る（1デッキ12文） */
const deck = (
  genre: PhraseGenre,
  id: string,
  title: string,
  description: string,
  pairs: string,
): EnglishDeck => ({
  id,
  section: "phrases",
  genre,
  title,
  description,
  items: pairs.split("|").map((pair) => {
    const [en, ja] = pair.split("=");
    return { en, ja };
  }),
});

export const extraPhraseDecks: EnglishDeck[] = [
  // ネイティブとの日常会話でそのまま使える表現
  deck("native", "native-smalltalk", "雑談・近況", "久しぶりに会ったときや世間話の定番",
    "What have you been up to?=最近どうしてた？|How's it going?=調子はどう？|Not much, just the usual.=特に何も、いつも通りだよ。|I've been pretty busy lately.=最近かなり忙しいんだ。|It's been a while.=久しぶりだね。|How's work treating you?=仕事の調子はどう？|Can't complain.=まあまあだよ。|What are you up to this weekend?=今週末は何をするの？|Nothing special.=特に何もないよ。|That reminds me.=それで思い出した。|By the way, how's your family?=ところで、ご家族は元気？|Let's catch up soon.=近いうちに会って話そう。"),
  deck("native", "native-reactions", "リアクション・相づち", "会話を自然に続けるひとこと",
    "That makes sense.=なるほど、納得です。|No way!=まさか！|You're kidding.=冗談でしょ。|That's a good point.=いい指摘ですね。|I know what you mean.=言いたいことはわかるよ。|Good for you.=よかったね。|That's a shame.=それは残念だね。|Fair enough.=まあ、それもそうだね。|I guess so.=そうだと思う。|Sounds like a plan.=それでいこう。|Tell me about it.=本当にそうだよね。|You never know.=どうなるかわからないよ。"),
  deck("native", "native-invite", "誘う・断る・予定", "予定を決めるときのやりとり",
    "Do you want to grab lunch?=お昼を食べに行かない？|Are you free tomorrow night?=明日の夜は空いてる？|I'd love to.=ぜひ。|I'm afraid I can't make it.=残念だけど行けないんだ。|Can I take a rain check?=また今度にしてもいい？|Maybe some other time.=また別の機会にね。|Let's meet at the station at six.=6時に駅で会おう。|Does Friday work for you?=金曜日は都合どう？|I'm running a little late.=少し遅れそう。|Something came up.=急用ができたんだ。|Let me know if anything changes.=何か変わったら教えて。|I'm looking forward to it.=楽しみにしてるよ。"),
  deck("native", "native-requests", "頼む・申し出る", "お願いや手助けの自然な言い方",
    "Could you do me a favor?=お願いがあるんだけど。|Would you mind opening the window?=窓を開けてもらえますか？|Can you give me a hand?=手伝ってくれる？|Do you mind if I sit here?=ここに座ってもいいですか？|Go ahead.=どうぞ。|Let me help you with that.=それ、手伝うよ。|Take your time.=ゆっくりでいいよ。|Is it okay if I call you later?=あとで電話してもいい？|I'd appreciate it.=そうしてもらえると助かります。|Don't worry about it.=気にしないで。|Thanks, I owe you one.=ありがとう、恩に着るよ。|Anytime.=いつでもどうぞ。"),
  deck("native", "native-opinions", "意見・気持ちを伝える", "好みや考えをやわらかく言う表現",
    "To be honest, I'm not a big fan.=正直、あまり好きじゃないんだ。|I couldn't agree more.=まったく同感です。|I see it a little differently.=私は少し違う見方をしています。|It's up to you.=あなた次第だよ。|I'm on the fence.=まだ迷っているんだ。|If I were you, I'd take it.=私だったら受けるよ。|I'd rather stay home.=どちらかというと家にいたい。|It's not my thing.=私の好みじゃないな。|I'm really into cooking these days.=最近、料理にはまってるんだ。|That's exactly what I was thinking.=まさにそう思ってたところ。|I didn't mean it that way.=そういう意味じゃなかったんだ。|I have mixed feelings about it.=それについては複雑な気持ちです。"),
  deck("native", "native-phrasal", "よく使う句動詞", "pick up / run out of など会話に欠かせない句動詞",
    "I'll pick you up at seven.=7時に迎えに行くよ。|We ran out of milk.=牛乳を切らしちゃった。|I need to figure out what to do.=どうするか考えないと。|Let's put off the trip.=旅行は延期しよう。|Can you turn down the music?=音楽の音を下げてくれる？|I came across an old photo.=古い写真を偶然見つけたんだ。|She takes after her mother.=彼女は母親に似ている。|I gave up sugar last month.=先月、砂糖をやめたんだ。|Hang on a second.=ちょっと待って。|I'll look into it.=調べてみます。|We get along really well.=私たちはとても気が合うんだ。|Don't let me down.=がっかりさせないでね。"),
  deck("native", "native-idioms", "会話でよく出る慣用表現", "直訳では通じない定番のイディオム",
    "It's a piece of cake.=朝飯前だよ。|I'm feeling under the weather.=体調がすぐれないんだ。|Let's call it a day.=今日はここまでにしよう。|It costs an arm and a leg.=ものすごく高いんだ。|You hit the nail on the head.=まさにその通り。|Break a leg!=がんばって！|Better late than never.=遅れてもやらないよりはまし。|It's not a big deal.=大したことじゃないよ。|Keep me posted.=何かあったら知らせて。|I'm all ears.=ちゃんと聞いてるよ。|Let's play it by ear.=成り行きで決めよう。|Long story short, we missed the flight.=手短に言うと、飛行機に乗り遅れたんだ。"),
  deck("native", "native-trouble", "困ったとき・聞き返す", "聞き取れないときやトラブルのとき",
    "Sorry, I didn't catch that.=すみません、聞き取れませんでした。|What do you mean by that?=それはどういう意味ですか？|How do you spell that?=それはどうつづりますか？|Could you say that in other words?=別の言い方で言ってもらえますか？|I think there's been a misunderstanding.=誤解があったようです。|My phone is about to die.=携帯の充電が切れそう。|I'm locked out of my room.=部屋に入れなくなってしまいました。|This isn't what I ordered.=これは注文したものと違います。|I think I'm lost.=道に迷ったようです。|Is there a pharmacy nearby?=近くに薬局はありますか？|Can you help me out?=助けてもらえますか？|I'll sort it out.=私が何とかします。"),

  // TOEIC のリスニング・リーディングで頻出の場面と、実際の仕事で使う表現
  deck("business", "biz-phone", "電話応対", "取り次ぎ・伝言・折り返しの定型表現",
    "May I ask who's calling?=どちら様でしょうか？|I'd like to speak to Mr. Tanaka.=田中さんをお願いします。|I'll put you through.=おつなぎします。|He's in a meeting right now.=彼はただいま会議中です。|Would you like to leave a message?=伝言を残されますか？|Could you ask her to call me back?=折り返し電話するよう伝えていただけますか？|I'm returning your call.=折り返しお電話しています。|I'm calling about my order.=注文の件でお電話しました。|Could you hold for a moment?=少々お待ちいただけますか？|The line is busy.=話し中です。|I'll get back to you by Friday.=金曜日までにご連絡します。|Thank you for calling.=お電話ありがとうございました。"),
  deck("business", "biz-email", "メールの定型文", "書き出しから結びまでのビジネスメール",
    "I'm writing to ask about your service.=御社のサービスについて伺いたくご連絡しました。|Thank you for your quick reply.=迅速なご返信ありがとうございます。|Please find the attached file.=添付ファイルをご確認ください。|I apologize for the late reply.=返信が遅くなり申し訳ありません。|Could you send me the details?=詳細を送っていただけますか？|Please let me know if you have any questions.=ご質問があればお知らせください。|I look forward to hearing from you.=ご連絡をお待ちしております。|This is a quick reminder about the meeting.=会議についてのリマインドです。|Please confirm your attendance.=出欠をご確認ください。|I'll be out of the office until Monday.=月曜日まで不在にしております。|Thank you for your cooperation.=ご協力ありがとうございます。|Best regards,=よろしくお願いいたします。"),
  deck("business", "biz-meeting", "会議の進行", "始める・確認する・まとめるときの表現",
    "Shall we get started?=始めましょうか。|Let's go over the agenda.=議題を確認しましょう。|Could you walk us through the plan?=計画を順に説明していただけますか？|Let me share my screen.=画面を共有します。|Are we all on the same page?=全員、認識は合っていますか？|Could you elaborate on that?=その点を詳しく説明していただけますか？|I'd like to add one thing.=一点付け加えたいのですが。|Let's move on to the next item.=次の議題に移りましょう。|We're running out of time.=時間がなくなってきました。|Let's take this offline.=これは別途話しましょう。|Who will take care of this?=誰がこれを担当しますか？|Let's wrap up.=まとめに入りましょう。"),
  deck("business", "biz-schedule", "日程調整・予約", "予約・変更・延期のやりとり",
    "I'd like to make an appointment.=予約を取りたいのですが。|When would be convenient for you?=ご都合はいつがよろしいですか？|How about Tuesday at ten?=火曜日の10時はいかがですか？|I'm available any time after three.=3時以降ならいつでも空いています。|Could we move the meeting to Thursday?=会議を木曜日に変更できますか？|I need to cancel my reservation.=予約をキャンセルしたいのですが。|The deadline has been extended.=締め切りが延長されました。|The meeting has been postponed.=会議は延期されました。|I'm fully booked this week.=今週は予定がいっぱいです。|Let me check my schedule.=予定を確認させてください。|I'll send you a calendar invite.=カレンダーの招待を送ります。|See you then.=ではそのときに。"),
  deck("business", "biz-customer", "接客・クレーム対応", "注文・返品・おわびの表現",
    "How may I help you?=ご用件を伺います。|I'm sorry for the inconvenience.=ご不便をおかけして申し訳ありません。|I'll look into it right away.=すぐにお調べします。|Could I have your order number?=注文番号を教えていただけますか？|The item is out of stock.=その商品は在庫切れです。|We'll send a replacement.=交換品をお送りします。|You'll receive a full refund.=全額返金いたします。|It should arrive within three days.=3日以内に届く予定です。|Is there anything else I can do for you?=ほかにお手伝いできることはありますか？|Thank you for your patience.=お待ちいただきありがとうございます。|I'd like to return this item.=この商品を返品したいのですが。|It was damaged when it arrived.=届いたときに壊れていました。"),
  deck("business", "biz-office", "オフィスの会話", "同僚との日常的なやりとり",
    "The copier is out of order.=コピー機が故障しています。|Have you finished the report yet?=報告書はもう終わりましたか？|I'm still working on it.=まだ作業中です。|Can you cover my shift tomorrow?=明日のシフトを代わってくれますか？|I'm taking a day off on Friday.=金曜日は休みを取ります。|Who is in charge of this project?=このプロジェクトの担当は誰ですか？|I'll hand in the form today.=今日その用紙を提出します。|Could you review my draft?=下書きを見ていただけますか？|We're short on staff this week.=今週は人手が足りません。|The new hire starts next Monday.=新入社員は来週の月曜日から来ます。|I'll keep you updated.=随時ご報告します。|Let's take a short break.=少し休憩しましょう。"),
  deck("business", "biz-travel", "出張・空港・ホテル", "移動と宿泊で必要になる表現",
    "I'm here on business.=仕事で来ています。|I'd like an aisle seat, please.=通路側の席をお願いします。|My flight has been delayed.=私の便が遅れています。|Where is the baggage claim?=手荷物受取所はどこですか？|I'd like to check out, please.=チェックアウトをお願いします。|Could I have a receipt?=領収書をいただけますか？|Is breakfast included?=朝食は含まれていますか？|Can I leave my luggage here?=ここに荷物を預けられますか？|Could you call a taxi for me?=タクシーを呼んでいただけますか？|How long does it take to get there?=そこまでどのくらいかかりますか？|I missed my connecting flight.=乗り継ぎ便に乗り遅れました。|Is there a shuttle to the airport?=空港までのシャトルはありますか？"),
  deck("business", "biz-announce", "アナウンス・案内", "駅・空港・店内放送でよく聞く言い回し",
    "Attention, all passengers.=乗客の皆様にお知らせします。|The store will close in ten minutes.=当店はあと10分で閉店します。|Please have your tickets ready.=チケットをご用意ください。|We apologize for the delay.=遅れが出ておりますことをおわびします。|The flight is now boarding at gate five.=その便はただいま5番ゲートで搭乗中です。|Please proceed to the front desk.=フロントまでお越しください。|The office will be closed on Monday.=事務所は月曜日は休業します。|For more information, visit our website.=詳しくはウェブサイトをご覧ください。|Please turn off your mobile phones.=携帯電話の電源をお切りください。|Thank you for shopping with us.=当店をご利用いただきありがとうございます。|Registration begins at nine.=受付は9時に始まります。|Lunch will be served at noon.=昼食は正午に提供されます。"),
];
