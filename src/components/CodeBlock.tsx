'use client';

import React, { FC, useState, useEffect } from 'react';
import { Check, Copy } from 'lucide-react';
import { useTheme } from 'next-themes';
import { remarkShiki } from '@/plugins/remark-shiki';

interface CodeBlockProps {
  code: string;
  lang: string;
}

export const CodeBlock: FC<CodeBlockProps> = ({ code, lang }) => {
  const [copied, setCopied] = useState(false);
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(true);
  const { theme, resolvedTheme } = useTheme();

  // 主题映射
  const getShikiTheme = (currentTheme: string | undefined) => {
    if (currentTheme === 'dark') return 'one-dark-pro';
    return 'one-light';
  };

  // 处理代码高亮
  useEffect(() => {
    const highlightCode = async () => {
      try {
        setLoading(true);
        const currentTheme = resolvedTheme || theme || 'light';
        const shikiTheme = getShikiTheme(currentTheme);
        const highlightedHtml = await remarkShiki(code, lang, shikiTheme);
        setHtml(highlightedHtml);
      } catch (error) {
        console.error('Failed to highlight code:', error);
        // 降级处理：显示原始代码
        setHtml(`<pre><code>${code}</code></pre>`);
      } finally {
        setLoading(false);
      }
    };

    highlightCode();
  }, [code, lang, theme, resolvedTheme]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className='codeblock-container'>
      {loading ? (
        <pre className='code-loading'>
          <code>{code}</code>
        </pre>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      )}
      <button
        onClick={copyToClipboard}
        className={`copy-button ${copied ? 'copied' : ''}`}
        aria-label='Copy code to clipboard'
      >
        {copied ? (
          <Check className='inline-block' />
        ) : (
          <Copy className='inline-block' />
        )}
      </button>
    </div>
  );
};
