import { createHighlighterCore, type HighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

export const SHIKI_THEME = 'github-dark' as const;

const LANG_LOADERS = {
  javascript: () => import('@shikijs/langs/javascript'),
  typescript: () => import('@shikijs/langs/typescript'),
  json: () => import('@shikijs/langs/json'),
  http: () => import('@shikijs/langs/http'),
} as const;

export type ShikiLanguage = keyof typeof LANG_LOADERS;

const LANGUAGE_ALIASES: Record<string, ShikiLanguage> = {
  js: 'javascript',
  ts: 'typescript',
};

export function resolveShikiLanguage(language: string): ShikiLanguage {
  const alias = LANGUAGE_ALIASES[language];
  if (alias) return alias;
  if (language in LANG_LOADERS) return language as ShikiLanguage;
  return 'javascript';
}

let highlighterPromise: Promise<HighlighterCore> | null = null;

function getHighlighter(): Promise<HighlighterCore> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      themes: [import('@shikijs/themes/github-dark')],
      langs: [
        import('@shikijs/langs/javascript'),
        import('@shikijs/langs/typescript'),
        import('@shikijs/langs/json'),
        import('@shikijs/langs/http'),
      ],
      engine: createJavaScriptRegexEngine(),
    });
  }
  return highlighterPromise;
}

export async function highlightCode(code: string, language: string): Promise<string> {
  const highlighter = await getHighlighter();
  const lang = resolveShikiLanguage(language);
  return highlighter.codeToHtml(code, {
    lang,
    theme: SHIKI_THEME,
  });
}

/** Guess Shiki language for short teaching snippets (HTTP, JSON, JS). */
export function inferSnippetLanguage(code: string): ShikiLanguage {
  const trimmed = code.trim();
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) return 'json';
  if (/^(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\s+\S/m.test(trimmed)) return 'http';
  if (/\bHTTP\/\d/i.test(trimmed)) return 'http';
  return 'javascript';
}
