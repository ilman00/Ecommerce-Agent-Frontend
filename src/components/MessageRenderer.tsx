import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  content: string;
}

export default function MessageRenderer({ content }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => (
          <p className="text-sm text-white/50 leading-relaxed mb-2 last:mb-0">{children}</p>
        ),
        strong: ({ children }) => (
          <span className="text-white font-semibold">{children}</span>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto my-3">
            <table className="w-full text-sm border-collapse">{children}</table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="border-b border-white/10">{children}</thead>
        ),
        th: ({ children }) => (
          <th className="text-left text-xs font-medium text-white/40 uppercase tracking-wide px-3 py-2">{children}</th>
        ),
        td: ({ children }) => (
          <td className="text-sm text-white/50 px-3 py-2 border-b border-white/5 align-top">{children}</td>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside text-sm text-white/50 space-y-1 my-2">{children}</ul>
        ),
        li: ({ children }) => <li>{children}</li>,
        pre: ({ children }) => (
          <pre className="bg-white/5 border border-white/10 rounded-xl p-3 overflow-x-auto my-2 whitespace-pre-wrap break-words">
            {children}
          </pre>
        ),
        code: ({ children }) => (
          <code className="text-xs bg-white/10 text-white/70 px-1.5 py-0.5 rounded whitespace-pre-wrap break-words">{children}</code>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}