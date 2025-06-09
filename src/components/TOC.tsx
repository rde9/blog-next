import 'server-only';
import React, { FC } from 'react';
import { remark } from 'remark';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import { remarkPlaceholder } from '@/plugins/remark-placeholder';
import { getHeadingSlugArray } from '@/utils/markdown';
import DesktopTOC from './DesktopTOC';
import MobileTOC from './MobileTOC';

type Props = { children: string };

const parseMarkdown = remark()
  .use(remarkFrontmatter)
  .use(
    remarkPlaceholder,
  ) /* just a placeholder, does nothing, to be replaced soon */
  .use(remarkGfm);

const TOCRenderer: FC<Props> = async ({ children }) => {
  const parsed = parseMarkdown.parse(children);
  const mdastRoot = await parseMarkdown.run(parsed);

  const headingSlugArray = getHeadingSlugArray(mdastRoot);

  if (headingSlugArray.length === 0) {
    return null;
  }

  return (
    <aside id='toc-content' className='w-full'>
      {/* Desktop TOC - Always visible on large screens */}
      <DesktopTOC headingSlugArray={headingSlugArray} />

      {/* Mobile TOC - Collapsible on small screens */}
      <MobileTOC headingSlugArray={headingSlugArray} />
    </aside>
  );
};

export default TOCRenderer;
