'use client';

import React, { FC, useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  html: string;
  code: string;
}

export const CodeBlock: FC<CodeBlockProps> = ({ html, code }) => {
  const [copied, setCopied] = useState(false);

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
    <div className="codeblock-container">
      <div dangerouslySetInnerHTML={{ __html: html }} />
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