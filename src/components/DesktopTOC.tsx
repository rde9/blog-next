'use client';
import React, { useRef, useState, useEffect } from 'react';
import type { HeadingSlugArray } from '@/utils/markdown';
import TOCList from './TOCList';

type DesktopTOCProps = {
  headingSlugArray: HeadingSlugArray;
};

const DesktopTOC: React.FC<DesktopTOCProps> = ({ headingSlugArray }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showTopIndicator, setShowTopIndicator] = useState(false);
  const [showBottomIndicator, setShowBottomIndicator] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleScroll = () => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    setShowTopIndicator(scrollTop > 5);
    setShowBottomIndicator(scrollTop + clientHeight < scrollHeight - 5);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const { scrollHeight, clientHeight } = containerRef.current;
    setShowBottomIndicator(scrollHeight > clientHeight);

    const currentRef = containerRef.current;
    currentRef.addEventListener('scroll', handleScroll);

    return () => {
      currentRef.removeEventListener('scroll', handleScroll);
    };
  }, [headingSlugArray]);

  return (
    <div className='hidden w-full lg:block'>
      <div
        className='relative'
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div
          className={`pointer-events-none absolute left-0 right-0 top-0 z-10 flex justify-center transition-opacity duration-300 ${showTopIndicator && isHovering ? 'opacity-90' : 'opacity-0'}`}
          id='top-indicator'
        >
          <div className='flex space-x-1 rounded-full bg-bg-card p-2'>
            {[...Array(3)].map((_, i) => (
              <div
                key={`top-${i}`}
                className='h-1 w-1 rounded-full bg-gray-400 dark:bg-slate-100'
              />
            ))}
          </div>
        </div>

        <div
          ref={containerRef}
          className='scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent max-h-[70vh] overflow-y-auto'
        >
          <div className='py-2 opacity-65 transition-opacity duration-300 hover:opacity-100'>
            <TOCList items={headingSlugArray} orientation='desktop' />
          </div>
        </div>

        <div
          className={`pointer-events-none absolute bottom-0 left-0 right-0 z-10 flex justify-center transition-opacity duration-300 ${showBottomIndicator && isHovering ? 'opacity-90' : 'opacity-0'}`}
          id='bottom-indicator'
        >
          <div className='flex space-x-1 rounded-full bg-bg-card p-2'>
            {[...Array(3)].map((_, i) => (
              <div
                key={`bottom-${i}`}
                className='h-1 w-1 rounded-full bg-gray-400 dark:bg-slate-100'
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopTOC;
