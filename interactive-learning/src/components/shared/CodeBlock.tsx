import React, { useEffect, useState } from 'react';
import { highlightCode } from '@/lib/shiki-highlighter';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'javascript', title }) => {
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setHighlightedHtml(null);

    highlightCode(code, language)
      .then((html) => {
        if (!cancelled) setHighlightedHtml(html);
      })
      .catch(() => {
        if (!cancelled) setHighlightedHtml(null);
      });

    return () => {
      cancelled = true;
    };
  }, [code, language]);

  return (
    <div className="rounded-lg overflow-hidden border border-slate-200">
      {title && (
        <div className="bg-slate-100 px-4 py-2 border-b border-slate-200">
          <p className="text-sm font-mono text-slate-700">{title}</p>
        </div>
      )}
      <div className="shiki-wrapper">
        {highlightedHtml ? (
          <div dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
        ) : (
          <pre className="m-0 bg-transparent">
            <code className="font-mono text-sm whitespace-pre">{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
};
