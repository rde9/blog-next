import React from 'react';
import type { HeadingSlugArray } from '@/utils/markdown';
import TOCList from './TOCList';

type DesktopTOCProps = {
  headingSlugArray: HeadingSlugArray;
};

const DesktopTOC: React.FC<DesktopTOCProps> = ({ headingSlugArray }) => {
  return (
    <div className='hidden lg:block w-full opacity-65 hover:opacity-100 transition-opacity duration-300'>
      <TOCList items={headingSlugArray} orientation='desktop' />
    </div>
  );
};

export default DesktopTOC; 