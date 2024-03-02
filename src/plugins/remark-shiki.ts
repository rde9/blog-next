import type { Highlighter } from 'shiki';
import { getHighlighter } from 'shiki';
import { langMapping } from '@/utils/lang';

let highlighter: Highlighter;
const supportedLangs = [
  'json',
  'yaml',
  'javascript',
  'typescript',
  'css',
  'html',
  'markdown',
  'python',
  'jsx',
  'tsx',
  'cpp',
  'c',
  'shellscript',
  'solidity',
  'sql',
];

export async function remarkShiki(code: string, lang: string): Promise<string> {
  highlighter ??= await getHighlighter({
    themes: ['one-dark-pro'],
    langs: supportedLangs,
  });
  return highlighter.codeToHtml(code, {
    lang,
    theme: 'one-dark-pro',
    transformers: [
      {
        pre(node) {
          node.properties['style'] = '';
          node.properties['data-language'] = langMapping(lang);
        },
      },
    ],
  });
}
