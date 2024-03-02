type LangAlias = {
  [key: string]: string;
};

const langAliases: LangAlias = {
  js: 'javascript',
  ts: 'typescript',
  md: 'markdown',
  py: 'python',
  yml: 'yaml',
  'c++': 'cpp',
  sh: 'shell',
  bash: 'shell',
  zsh: 'shell',
  txt: 'plain text',
  plain: 'plain text',
};

export const langMapping = (lang: string | null | undefined) => {
  if (!lang) return 'plain text';
  const normalized = lang.toLowerCase();
  const res = langAliases[normalized] ? langAliases[normalized] : normalized;
  return res;
};
