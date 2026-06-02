import React from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'javascript', title }) => {
  return (
    <div className="rounded-lg overflow-hidden border border-slate-200">
      {title && (
        <div className="bg-slate-100 px-4 py-2 border-b border-slate-200">
          <p className="text-sm font-mono text-slate-700">{title}</p>
        </div>
      )}
      <pre className="code-block">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};
