'use client';

import React from 'react';
import { ChevronDownIcon, ChevronUpIcon, ListIcon } from 'lucide-react';
import { HeadingSlugArray } from '@/utils/markdown';

type MobileTOCProps = {
  headingSlugArray: HeadingSlugArray;
};

const MobileTOC: React.FC<MobileTOCProps> = ({ headingSlugArray }) => {
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
      <ul className="toc-list">
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
    <div className="toc-container">
      {/* 这个div将作为定位参考点 */}
      <div className="toc-position-reference"></div>
      
      {/* 整个TOC将作为一个单元固定 */}
      <div className="toc-sticky-container">
        {/* Toggle header */}
        <div className="js-toc-toggle flex cursor-pointer items-center justify-between rounded-t-lg bg-bg-card p-3 shadow-sm transition-all hover:bg-bg-card-hover">
          <div className="flex items-center gap-2">
            <ListIcon className="h-5 w-5 text-primary-500" />
            <h2 className="text-xl font-bold">目录</h2>
          </div>
          <div className="flex items-center">
            <span className="js-toc-icon-down block text-gray-500">
              <ChevronDownIcon className="h-5 w-5" />
            </span>
            <span className="js-toc-icon-up hidden text-gray-500">
              <ChevronUpIcon className="h-5 w-5" />
            </span>
          </div>
        </div>
        
        {/* Content - directly below the toggle */}
        <div className="js-toc-content hidden max-h-[60vh] overflow-y-auto rounded-b-lg bg-bg-card p-4 shadow-sm">
          {renderItems(headingSlugArray)}
        </div>
      </div>
    </div>
  );
};

export default MobileTOC; 