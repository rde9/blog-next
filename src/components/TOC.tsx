import 'server-only';
import React, { FC } from 'react';
import { remark } from 'remark';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import { remarkPlaceholder } from '@/plugins/remark-placeholder';
import { getHeadingSlugArray, type HeadingSlugArray } from '@/utils/markdown';

type Props = { children: string };

let headingSlugArray: HeadingSlugArray;
let headingCount: number, headingIndex: number;

const parseMarkdown = remark()
  .use(remarkFrontmatter)
  .use(
    remarkPlaceholder,
  ) /* just a placeholder, does nothing, to be replaced soon */
  .use(remarkGfm);

const TOCRenderer: FC<Props> = async ({ children }) => {
  const parsed = parseMarkdown.parse(children);
  const mdastRoot = await parseMarkdown.run(parsed);

  headingSlugArray = getHeadingSlugArray(mdastRoot);
  headingCount = headingSlugArray.length;
  headingIndex = 0;

  const indentation = {
    1: 'pl-0',
    2: 'pl-4',
    3: 'pl-8',
  };
  const renderItems = (items: HeadingSlugArray) => {
    if (items.length === 0) return null;

    return (
      <ul>
        {items.map((item, index) => {
          const level = item.depth as keyof typeof indentation;
          const paddingLeft = indentation[level] ?? '';
          return (
            <li key={index} className={`${paddingLeft}`}>
              <a
                href={`#${item.slug}`}
                className='block py-1 hover:text-link-hover'
              >
                {item.value}
              </a>
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <aside id='toc-content'>
      <h3 className='mb-3 text-lg font-semibold'>Table of Contents</h3>
      {renderItems(headingSlugArray)}
    </aside>
  );
};

export default TOCRenderer;
