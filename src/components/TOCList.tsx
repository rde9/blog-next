import React from 'react';
import type { HeadingSlugArray } from '@/utils/markdown';
import TOCItem from './TOCItem';

type TOCListProps = {
  items: HeadingSlugArray;
  className?: string;
  onItemClick?: () => void;
  orientation: 'desktop' | 'mobile';
};

const TOCList: React.FC<TOCListProps> = ({ 
  items, 
  className = '',
  onItemClick,
  orientation
}) => {
  if (items.length === 0) return null;


  const indentationDesktop = {
    1: 'pl-0 leading-normal',
    2: 'pl-4 tracking-tight leading-snug',
    3: 'pl-10 tracking-tight leading-tight',
  };

  const indentationMobile = {
    1: 'pl-0 leading-loose',
    2: 'pl-4 tracking-tight leading-relaxed',
    3: 'pl-10 tracking-tight leading-snug',
  };

  const indentation = orientation === 'desktop' ? indentationDesktop : indentationMobile;
  
  const size = {
    1: 'text-lg font-semibold',
    2: 'text-base font-normal',
    3: 'text-md font-light',
  };

  return (
    <ul className={`toc-list w-full ${className}`}>
      {items.map((item, index) => {
        const level = item.depth as keyof typeof indentation;
        const padding = indentation[level] ?? '';
        const textSize = size[level] ?? '';
        
        return (
          <TOCItem
            key={index}
            item={item}
            indentationClass={padding}
            sizeClass={textSize}
            onClick={onItemClick}
          />
        );
      })}
    </ul>
  );
};

export default TOCList; 