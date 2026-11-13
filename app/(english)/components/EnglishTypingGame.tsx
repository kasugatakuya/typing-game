"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { GameProgress } from "@/app/components/game/GameProgress";
import { BackLink } from "@/app/components/game/BackLink";
import { MobileNotice } from "@/app/components/game/MobileNotice";
import { SoundToggle } from "@/app/components/game/SoundToggle";
import { ImeNotice } from "@/app/components/game/ImeNotice";
import { PersonalBestBadge } from "@/app/components/game/PersonalBestBadge";
import { ScoreSubmitButton } from "@/app/components/score/ScoreSubmitButton";
import { deckListPath, rankingModeId } from "@/app/(english)/data";
import { formatTime } from "@/app/utils/timeUtils";
import { TypingText } from "@/app/(english)/components/TypingText";
import {
  AUTO_REVEAL_MISTAKES,
  isRecallMode,
  useEnglishTyping,
  type EnglishTypingMode,
  type ItemResult,
} from "@/app/(english)/hooks/useEnglishTyping";
import {
  countMastered,
  itemKey,
  recordTestResult,
  useEnglishProgress,
} from "@/app/(english)/lib/progress";
import { speech } from "@/app/(english)/lib/speech";
import {
  SECTION_LABELS,
  type EnglishDeck,
  type EnglishItem,
} from "@/app/(english)/data/types";

const MODES: { id: EnglishTypingMode; label: string; description: string }[] = [
  {
    id: "learn",
    label: "見て覚える",
    description: "日本語の意味と英語を見ながらタイピングします。",
  },
  {
    id: "test",
    label: "覚えたか確認",
    description: `日本語の意味だけを見て、英語を思い出してタイピングします。Enterキーか${AUTO_REVEAL_MISTAKES}回のミスで答えを表示します。`,
  },
  {
    id: "listen",
    label: "聞いて打つ",
    description: `音声だけを聞いて、聞き取った英語をタイピングします。Tabキーでもう一度再生、Enterキーか${AUTO_REVEAL_MISTAKES}回のミスで答えを表示します。`,
  },
];

const ALL_MODES: EnglishTypingMode[] = ["learn", "test", "listen"];

const getText = (item: EnglishItem) => item.en;
const subscribeNothing = () => () => {};

interface EnglishTypingGameProps {
  deck: EnglishDeck;
  /** 選べるモード。先頭が初期モード。復習では確認モードだけにする */
  modes?: EnglishTypingMode[];
  /** false のときランキング登録と自己ベストを出さない（復習など） */
  rankable?: boolean;
  /** 見出し。省略時は「デッキ名（全n語）」 */
  heading?: string;
  /** 問題の数え方。省略時は単語なら「語」、それ以外は「文」 */
  unit?: string;
  /** 戻るリンクの行き先。省略時はデッキの一覧ページ */
  backHref?: string;
  /** 出題できる問題が無いときに表示する文言 */
  emptyMessage?: string;
}

export function EnglishTypingGame({
  deck,
  modes = ALL_MODES,
  rankable = true,
  heading,
  unit = deck.section === "words" ? "語" : "文",
  backHref = deckListPath(deck),
  emptyMessage = "出題できる問題がありません。",
}: EnglishTypingGameProps) {
  const [mode, setMode] = useState<EnglishTypingMode>(modes[0]);
  const progress = useEnglishProgress();
  const speechEnabled = useSyncExternalStore(
    speech.subscribe,
    speech.getSnapshot,
    speech.getServerSnapshot,
  );
  // 音声合成が使えないブラウザでは「聞いて打つ」を選べないようにする
  const speechSupported = useSyncExternalStore(
    subscribeNothing,
    () => speech.supported,
    () => true,
  );

  const isTest = mode === "test";
  const isListen = mode === "listen";
  const isRecall = isRecallMode(mode);

  const handleItemComplete = useCallback(
    (result: ItemResult<EnglishItem>) => {
      // 「聞いて打つ」では次の問題の音声と重なるため、打ち終わりの読み上げはしない
      if (mode !== "listen") speech.speak(result.item.en);
      if (mode === "test") {
        recordTestResult(itemKey(deck, result.item), !result.revealed);
      }
    },
    [deck, mode],
  );

  const {
    gameState,
    currentItem,
    position,
    revealed,
    results,
    missedItems,
    completedCount,
    itemCount,
    currentTime,
    clearTimeMs,
    mistakeCount,
    totalKeystrokes,
    questionTimestamps,
    isFullRound,
    accuracy,
    isVisible,
    showMistakeEffect,
    imeDetected,
    startGame,
    revealAnswer,
  } = useEnglishTyping({
    items: deck.items,
    getText,
    mode,
    onItemComplete: handleItemComplete,
  });

  // 「聞いて打つ」: 問題が切り替わるたびに音声を流す（読み上げ設定が OFF でも鳴らす）
  const listenText =
    isListen && gameState === "playing" ? (currentItem?.en ?? null) : null;
  useEffect(() => {
    if (listenText === null) return;
    speech.speak(listenText, { force: true });
    // Tab キーでもう一度再生する
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      e.preventDefault();
      speech.speak(listenText, { force: true });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [listenText]);

  const isEmpty = deck.items.length === 0;
  const masteredCount = countMastered(deck, progress);
  const rememberedCount = results.filter((r) => !r.revealed).length;
  const hasMissed = missedItems.length > 0;
  const itemNoun = unit === "語" ? "単語" : unit === "文" ? "文" : "問題";
  // ランキングは「見て覚える」と「覚えたか確認」だけが対象
  const isRankedMode = rankable && !isListen;
  const gameMode = rankingModeId(deck, isTest);
  // 確認モードは、答えを一度も表示しなかったときだけランキングに登録できる
  const canSubmitScore = isRankedMode && isFullRound && (!isTest || !hasMissed);
  const notRankedReason = !rankable
    ? null
    : isListen
      ? "「聞いて打つ」はランキングの対象外です"
      : !isFullRound
        ? "復習はランキングの対象外です"
        : "確認モードは、答えを見ずに全問打てたときだけランキングに登録できます";

  const selectableModes = MODES.filter((m) => modes.includes(m.id));

  const modeSelector = selectableModes.length > 1 && (
    <div>
      <div className="inline-flex rounded-full bg-gray-100 p-1">
        {selectableModes.map((m) => {
          const unavailable = m.id === "listen" && !speechSupported;
          return (
            <button
              key={m.id}
              type="button"
              aria-pressed={mode === m.id}
              disabled={unavailable}
              title={
                unavailable ? "このブラウザは音声の再生に対応していません" : undefined
              }
              onClick={(e) => {
                setMode(m.id);
                // フォーカスが残るとスペースキーでボタンが再度押されるため外す
                e.currentTarget.blur();
              }}
              className={`px-4 sm:px-5 py-2 text-sm font-medium rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                mode === m.id
                  ? "bg-indigo-600 text-white shadow"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
            >
              {m.label}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-indigo-50 to-slate-100 pb-8 pt-20 mt-4">
      <MobileNotice />
      <SoundToggle />
      <ImeNotice visible={imeDetected} />
      <div
        className={`container mx-auto px-4 ${
          gameState === "finished" && hasMissed ? "max-w-5xl" : "max-w-2xl"
        }`}
      >
        <div className="text-center mb-6">
          <p className="text-sm font-medium text-indigo-600 mb-1">
            {heading ? "英語タイピング" : SECTION_LABELS[deck.section]}
          </p>
          <h1 className="text-2xl font-bold text-gray-800">
            {heading ?? `${deck.title}（全${deck.items.length}${unit}）`}
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          {gameState === "idle" && (
            <div className="text-center py-6">
              {modeSelector}
              <p className="text-sm text-gray-600 mt-3">
                {MODES.find((m) => m.id === mode)?.description}
              </p>

              {deck.points && (
                <div className="mt-6 text-left bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                  <p className="text-sm font-bold text-indigo-700 mb-2">
                    文法のポイント
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                    {deck.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}

              {isEmpty ? (
                <p className="text-lg font-semibold text-gray-700 mt-8">
                  {emptyMessage}
                </p>
              ) : (
                <>
                  <p
                    className={`text-xl font-semibold text-indigo-600 mt-8 transition-opacity duration-500 ${
                      isVisible ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    スペースキーを押してスタート
                    {heading && `（${deck.items.length}${unit}）`}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    ※大文字・小文字は区別しません。ESCキーで中断できます
                  </p>
                </>
              )}

              {rankable && (
                <p className="text-sm text-gray-600 mt-6">
                  覚えた数:{" "}
                  <span className="font-bold text-indigo-600">
                    {masteredCount}
                  </span>{" "}
                  / {deck.items.length}
                  <span className="block text-xs text-gray-400 mt-1">
                    「覚えたか確認」で答えを見ずに打てると記録されます
                  </span>
                </p>
              )}
              {isRankedMode && (
                <PersonalBestBadge gameCategory="english" gameMode={gameMode} />
              )}
            </div>
          )}

          {gameState === "playing" && currentItem && (
            <div>
              <div className="text-center mb-6">
                {isListen && !revealed ? (
                  <p className="text-xl font-bold text-gray-500 mb-2">
                    音声を聞いて入力しましょう
                  </p>
                ) : (
                  <p className="text-2xl font-bold text-gray-800 mb-2">
                    {currentItem.ja}
                  </p>
                )}
                <p className="text-sm text-indigo-600 mb-4 min-h-5">
                  {(!isRecall || revealed) && currentItem.note}
                </p>
                <TypingText
                  text={currentItem.en}
                  position={position}
                  masked={isRecall && !revealed}
                  showMistake={showMistakeEffect}
                />
                {isRecall && (
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4 min-h-7">
                    {isListen && (
                      <button
                        type="button"
                        onClick={(e) => {
                          speech.speak(currentItem.en, { force: true });
                          e.currentTarget.blur();
                        }}
                        className="px-3 py-1 rounded-full border border-indigo-300 text-indigo-600 hover:bg-indigo-50 transition-colors"
                      >
                        もう一度聞く（Tab）
                      </button>
                    )}
                    {revealed ? (
                      <span>答えを表示しました。もう一度打って覚えましょう</span>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          revealAnswer();
                          e.currentTarget.blur();
                        }}
                        className="px-3 py-1 rounded-full border border-gray-300 text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
                      >
                        答えを見る（Enter）
                      </button>
                    )}
                  </div>
                )}
              </div>

              <GameProgress
                currentTime={currentTime}
                mistakeCount={mistakeCount}
                completedCount={completedCount}
                itemCount={itemCount}
                barColorClass="bg-indigo-500"
              />
            </div>
          )}

          {gameState === "finished" && (
            <div
              className={`text-center ${
                hasMissed ? "md:grid md:grid-cols-2 md:gap-8 md:items-center" : ""
              }`}
            >
              {/* 左: スタッツ・ランキング登録・次の操作 */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  {isRecall && !hasMissed ? "全問正解！" : "おつかれさまでした！"}
                </h2>
                <div className="flex justify-center gap-6">
                  {isRecall && (
                    <div>
                      <p className="text-xs text-gray-500">
                        {isListen ? "聞き取れた" : "覚えていた"}
                      </p>
                      <p className="text-lg font-bold text-indigo-600">
                        {rememberedCount} / {itemCount}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-gray-500">タイム</p>
                    <p className="text-lg font-bold text-gray-800">
                      {formatTime(clearTimeMs)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">ミス</p>
                    <p className="text-lg font-bold text-gray-800">
                      {mistakeCount}回
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">正確率</p>
                    <p className="text-lg font-bold text-gray-800">
                      {accuracy}%
                    </p>
                  </div>
                </div>

                {canSubmitScore ? (
                  <ScoreSubmitButton
                    gameCategory="english"
                    gameMode={gameMode}
                    clearTimeMs={clearTimeMs}
                    mistakeCount={mistakeCount}
                    keystrokeCount={totalKeystrokes}
                    questionCount={itemCount}
                    questionTimestamps={questionTimestamps}
                  />
                ) : (
                  notRankedReason && (
                    <p className="text-xs text-gray-500 mt-4">
                      {notRankedReason}
                    </p>
                  )
                )}

                <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                  {isEmpty ? (
                    <p className="text-sm font-semibold text-gray-700">
                      {emptyMessage}
                    </p>
                  ) : (
                    <p
                      className={`text-sm font-semibold text-indigo-600 transition-opacity duration-500 ${
                        isVisible ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {heading
                        ? `スペースキーで次の${deck.items.length}${unit}へ`
                        : "スペースキーでもう一度"}
                    </p>
                  )}
                  {selectableModes
                    .filter(
                      (m) =>
                        m.id !== mode &&
                        !(m.id === "listen" && !speechSupported),
                    )
                    .map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setMode(m.id);
                          startGame();
                        }}
                        className="px-4 py-1.5 rounded-full border border-indigo-200 text-indigo-600 text-sm font-medium hover:bg-indigo-50 transition-colors"
                      >
                        「{m.label}」でプレイ
                      </button>
                    ))}
                </div>
              </div>

              {/* 右: 間違えた問題（PCでは横に並べて縦に伸びないようにする） */}
              {hasMissed && (
                <div className="mt-6 md:mt-0 text-left bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <p className="text-sm font-bold text-amber-800">
                      {isListen
                        ? "聞き取れなかった"
                        : isTest
                          ? "覚えていなかった"
                          : "ミスがあった"}
                      {itemNoun}（{missedItems.length}）
                    </p>
                    <button
                      type="button"
                      onClick={() => startGame(missedItems)}
                      className="px-4 py-1.5 rounded-full bg-amber-500 text-white text-xs font-medium hover:bg-amber-600 transition-colors"
                    >
                      この{missedItems.length}
                      {unit}だけ復習（Rキー）
                    </button>
                  </div>
                  <ul
                    className={`max-h-60 overflow-y-auto text-sm leading-5 grid gap-x-4 ${
                      unit === "語" ? "grid-cols-2" : "grid-cols-1"
                    }`}
                  >
                    {missedItems.map((item) => (
                      <li
                        key={item.progressKey ?? item.en}
                        title={`${item.en}　${item.ja}`}
                        className="truncate"
                      >
                        <span className="font-mono font-semibold text-gray-800">
                          {item.en}
                        </span>
                        <span className="text-gray-600 ml-2">{item.ja}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-4">
          <BackLink href={backHref} hoverColorClass="hover:text-indigo-600" />
          <button
            type="button"
            aria-pressed={speechEnabled}
            onClick={(e) => {
              speech.toggle();
              e.currentTarget.blur();
            }}
            className="inline-flex items-center px-6 py-2 text-sm rounded-full bg-white text-gray-600 font-medium shadow-md hover:shadow-lg hover:text-indigo-600 transition-all"
          >
            発音の読み上げ: {speechEnabled ? "ON" : "OFF"}
          </button>
        </div>
      </div>
    </div>
  );
}
