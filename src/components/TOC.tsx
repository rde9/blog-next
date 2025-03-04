import 'server-only';
import React, { FC } from 'react';
import { remark } from 'remark';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import { remarkPlaceholder } from '@/plugins/remark-placeholder';
import { getHeadingSlugArray, type HeadingSlugArray } from '@/utils/markdown';
import MobileTOC from './MobileTOC';

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
    1: 'pl-0 leading-loose',
    2: 'pl-4 tracking-tight leading-relaxed',
    3: 'pl-8 tracking-tight leading-snug',
  };
  const size = {
    1: 'text-lg font-semibold',
    2: 'text-base font-normal',
    3: 'text-md font-light',
  };
  const renderItems = (items: HeadingSlugArray) => {
    if (items.length === 0) return null;

    return (
      <ul className="toc-list w-full">
        {items.map((item, index) => {
          const level = item.depth as keyof typeof indentation;
          const padding = indentation[level] ?? '';
          const textSize = size[level] ?? '';
          return (
            <li key={index} className={`${padding} ${textSize}`}>
              <a
                href={`#${item.slug}`}
                className="hover:text-primary-500"
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
    <aside id='toc-content' className="w-full">
      {/* Desktop TOC - Always visible on large screens */}
      <div className='hidden lg:block w-full opacity-65 hover:opacity-100 transition-opacity duration-300'>
        {renderItems(headingSlugArray)}
      </div>
      
      {/* Mobile TOC - Collapsible on small screens */}
      <div className='lg:hidden'>
        <MobileTOC headingSlugArray={headingSlugArray} />
      </div>
    </aside>
  );
};

export default TOCRenderer;
