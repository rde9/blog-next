import type { Highlighter } from 'shiki';
import { createHighlighter } from 'shiki';
import { langMapping } from '@/utils/lang';

// 使用全局缓存，确保在服务器端只创建一个实例
const globalCache: {
  highlighter: Highlighter | null;
  initPromise: Promise<Highlighter> | null;
  instanceCount: number;
} = {
  highlighter: null,
  initPromise: null,
  instanceCount: 0,
};

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

// 初始化 highlighter 的函数，使用缓存避免重复创建
async function getHighlighter(): Promise<Highlighter> {
  // 如果已经有实例，直接返回
  if (globalCache.highlighter) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Shiki] Using cached highlighter instance');
    }
    return globalCache.highlighter;
  }

  // 如果正在初始化，等待初始化完成
  if (globalCache.initPromise) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Shiki] Waiting for highlighter initialization');
    }
    return globalCache.initPromise;
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('[Shiki] Creating new highlighter instance');
  }

  // 创建新的初始化 Promise
  globalCache.initPromise = createHighlighter({
    themes: ['one-light', 'one-dark-pro'],
    langs: supportedLangs,
  });

  try {
    // 等待初始化完成并缓存结果
    globalCache.highlighter = await globalCache.initPromise;
    globalCache.instanceCount++;

    if (process.env.NODE_ENV === 'development') {
      console.log(
        `[Shiki] Highlighter instance created (total: ${globalCache.instanceCount})`,
      );
    }

    return globalCache.highlighter;
  } catch (error) {
    // 初始化失败，清除 Promise
    globalCache.initPromise = null;

    if (process.env.NODE_ENV === 'development') {
      console.error('[Shiki] Failed to create highlighter instance:', error);
    }

    throw error;
  }
}

export async function remarkShiki(
  code: string,
  lang: string,
  theme: 'one-light' | 'one-dark-pro' = 'one-light',
): Promise<string> {
  // 获取或创建 highlighter 实例
  const highlighter = await getHighlighter();

  // 使用 highlighter 高亮代码
  return highlighter.codeToHtml(code, {
    lang,
    theme,
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

// 这个函数可以在需要时手动调用，例如在测试环境中
export function disposeHighlighter(): void {
  if (globalCache.highlighter) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Shiki] Disposing highlighter instance');
    }

    globalCache.highlighter.dispose();
    globalCache.highlighter = null;
    globalCache.instanceCount--;
  }
  globalCache.initPromise = null;
}
