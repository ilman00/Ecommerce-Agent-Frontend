import { useRef } from "react";

interface Props {
  onSubmit: (message: string) => void;
  onAttach: () => void;
  loading: boolean;
  hasImage: boolean;
}

export default function PromptInput({ onSubmit, onAttach, loading, hasImage }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  function submit() {
    const value = ref.current?.value.trim();
    if (value) {
      onSubmit(value);
      ref.current!.value = "";
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-3">
      <textarea
        ref={ref}
        rows={3}
        placeholder='e.g. "Generate a listing and ads for this product"'
        onKeyDown={handleKeyDown}
        disabled={loading}
        className="w-full resize-none text-sm text-white placeholder-white/30 outline-none bg-transparent disabled:opacity-50"
      />
      <div className="flex items-center justify-between">
        {/* Left — attach button */}
        <button
          onClick={onAttach}
          title="Attach image"
          className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
            ${hasImage
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-white/5 text-white/40 border border-white/10 hover:bg-white/10 hover:text-white/60"
            }
          `}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
          {hasImage ? "Image attached" : "Attach image"}
        </button>

        {/* Right — hint + send button */}
        <div className="flex items-center gap-3">
          <p className="text-xs text-white/20">Shift+Enter for new line</p>
          <button
            onClick={submit}
            disabled={loading}
            className="w-8 h-8 flex items-center justify-center bg-white text-black rounded-lg hover:bg-white/90 transition-colors disabled:opacity-40"
          >
            {loading ? (
              <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}