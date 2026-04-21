import Link from "next/link";
import Header from "@/app/components/Header";

export const metadata = {
  title: "利用規約・プライバシーポリシー | 地理タイピング",
  description: "地理タイピングの利用規約とプライバシーポリシーについて",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 to-slate-800">
      <Header />
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-white text-center mb-8">
            利用規約・プライバシーポリシー
          </h1>

          <div className="bg-slate-800 rounded-xl p-6 md:p-8 space-y-8">
            {/* 利用規約 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 pb-2 border-b border-slate-700">
                利用規約
              </h2>

              <div className="space-y-4 text-slate-300">
                <div>
                  <h3 className="font-semibold text-white mb-2">第1条（適用）</h3>
                  <p className="text-sm leading-relaxed">
                    本規約は、地理タイピング（以下「本サービス」）の利用に関する条件を定めるものです。
                    ユーザーは本規約に同意の上、本サービスを利用するものとします。
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">第2条（利用登録）</h3>
                  <p className="text-sm leading-relaxed">
                    ユーザーは、Googleアカウントまたはメールアドレスによる認証を通じて利用登録を行うことができます。
                    登録情報に虚偽があった場合、サービスの利用を制限することがあります。
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">第3条（禁止事項）</h3>
                  <p className="text-sm leading-relaxed mb-2">
                    ユーザーは、以下の行為を行ってはなりません。
                  </p>
                  <ul className="text-sm list-disc list-inside space-y-1 text-slate-400">
                    <li>不正な方法によるスコアの改ざん・送信</li>
                    <li>自動化ツールやスクリプトを使用したプレイ</li>
                    <li>他のユーザーへの迷惑行為</li>
                    <li>サーバーに過度な負荷をかける行為</li>
                    <li>その他、運営が不適切と判断する行為</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">第4条（ランキング）</h3>
                  <p className="text-sm leading-relaxed">
                    本サービスのランキングは、不正検知システムにより検証されたスコアのみが登録されます。
                    不正が検出された場合、該当スコアは無効となり、アカウントの利用制限を行う場合があります。
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">第5条（免責事項）</h3>
                  <p className="text-sm leading-relaxed">
                    本サービスは現状有姿で提供され、完全性・正確性・可用性を保証するものではありません。
                    本サービスの利用により生じた損害について、運営は一切の責任を負いません。
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">第6条（サービスの変更・終了）</h3>
                  <p className="text-sm leading-relaxed">
                    運営は、事前の通知なく本サービスの内容を変更、または終了することがあります。
                  </p>
                </div>
              </div>
            </section>

            {/* プライバシーポリシー */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 pb-2 border-b border-slate-700">
                プライバシーポリシー
              </h2>

              <div className="space-y-4 text-slate-300">
                <div>
                  <h3 className="font-semibold text-white mb-2">収集する情報</h3>
                  <p className="text-sm leading-relaxed mb-2">
                    本サービスでは、以下の情報を収集します。
                  </p>
                  <ul className="text-sm list-disc list-inside space-y-1 text-slate-400">
                    <li>メールアドレス（認証用）</li>
                    <li>表示名（ランキング表示用）</li>
                    <li>プロフィール画像（Googleログインの場合）</li>
                    <li>ゲームのスコア・プレイ履歴</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">情報の利用目的</h3>
                  <p className="text-sm leading-relaxed mb-2">
                    収集した情報は、以下の目的で利用します。
                  </p>
                  <ul className="text-sm list-disc list-inside space-y-1 text-slate-400">
                    <li>ユーザー認証およびアカウント管理</li>
                    <li>ランキング機能の提供</li>
                    <li>サービスの改善・不正検知</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">情報の第三者提供</h3>
                  <p className="text-sm leading-relaxed">
                    法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">データの保管</h3>
                  <p className="text-sm leading-relaxed">
                    ユーザーデータは Supabase（データベースサービス）に安全に保管されます。
                    アカウントを削除した場合、関連するデータは削除されます。
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">Cookieの使用</h3>
                  <p className="text-sm leading-relaxed">
                    本サービスでは、認証状態の維持のためにCookieを使用します。
                  </p>
                </div>
              </div>
            </section>

            {/* お問い合わせ */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 pb-2 border-b border-slate-700">
                お問い合わせ
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                本サービスに関するお問い合わせは、運営までご連絡ください。
              </p>
            </section>

            {/* 更新日 */}
            <div className="text-center pt-4 border-t border-slate-700">
              <p className="text-sm text-slate-500">
                最終更新日: 2024年1月
              </p>
            </div>
          </div>

          {/* 戻るリンク */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-block px-6 py-2 text-slate-400 hover:text-white transition-colors"
            >
              トップに戻る
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
