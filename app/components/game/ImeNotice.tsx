interface ImeNoticeProps {
  visible: boolean;
}

/**
 * 日本語入力（IME）がオンのままキーを押したときに表示する案内。
 * IME がオンだと keydown の key が "Process" になり、入力もミス判定も
 * 行われず「何も起きない」状態になるため、原因をユーザーに伝える。
 */
export function ImeNotice({ visible }: ImeNoticeProps) {
  if (!visible) return null;

  return (
    <div
      role="alert"
      className="fixed top-16 inset-x-0 z-40 flex justify-center px-4 pointer-events-none"
    >
      <div className="bg-red-50 border border-red-300 text-red-700 text-sm px-4 py-2 rounded-lg shadow-md">
        ⌨️ 日本語入力（IME）がオンになっています。半角英数モードに切り替えてください。
      </div>
    </div>
  );
}
