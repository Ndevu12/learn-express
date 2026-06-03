import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { CodeBlock } from './CodeBlock';

interface LayerCardProps {
  name: string;
  index: number;
  description: string;
  examples: string[];
  color: 'blue' | 'slate';
  codeExample?: string;
  isClickable?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

export const LayerCard: React.FC<LayerCardProps> = ({
  name,
  index,
  description,
  examples,
  color,
  codeExample,
  isClickable = false,
  isActive = false,
  onClick,
}) => {
  const [showCode, setShowCode] = useState(false);

  return (
    <div
      className={cn(
        'rounded-xl border bg-white p-5 shadow-sm transition-all',
        isClickable && 'cursor-pointer hover:border-slate-300 hover:shadow',
        isActive ? 'border-slate-900 ring-1 ring-slate-900/10' : 'border-slate-200/80',
        color === 'blue' && !isActive && 'bg-slate-50/30'
      )}
      onClick={onClick}
      role={isClickable ? 'button' : 'article'}
      tabIndex={isClickable ? 0 : -1}
    >
      <div className="mb-4 flex items-start gap-3">
        <span className={cn('layer-index', isActive && 'layer-index-active')}>{index + 1}</span>
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-slate-900">{name}</h3>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Examples</p>
        <ul className="space-y-1.5">
          {examples.map((example) => (
            <li key={example} className="flex gap-2 text-sm text-slate-700">
              <span className="text-slate-300" aria-hidden="true">
                —
              </span>
              <span>{example}</span>
            </li>
          ))}
        </ul>
      </div>

      {codeExample && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowCode(!showCode);
            }}
            className="mt-4 text-sm font-medium text-slate-700 underline-offset-2 hover:text-slate-900 hover:underline"
          >
            {showCode ? 'Hide code' : 'Show code'}
          </button>
          {showCode && (
            <div className="mt-3">
              <CodeBlock code={codeExample} language="javascript" />
            </div>
          )}
        </>
      )}
    </div>
  );
};
